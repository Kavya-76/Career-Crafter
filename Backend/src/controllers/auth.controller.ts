import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import User, { IUser } from "../models/User.js";
import Company, { ICompany } from "../models/Company.js";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";
import { sendPasswordResetEmail } from "../utils/sendPasswordResetEmail.js";
import axios from "axios";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists in respective collection
    const existing =
      role === "employee"
        ? await User.findOne({ email })
        : await Company.findOne({ email });

    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new record
    const newUser =
      role === "employee"
        ? await User.create({ name, email, password: hashedPassword })
        : await Company.create({ name, email, password: hashedPassword });

    await sendVerificationEmail(newUser);
    return res.status(201).json({
      message: "Signup successful",
    });
  } catch (error: any) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Fetch from correct collection
    const existing =
      role === "employee"
        ? await User.findOne({ email })
        : await Company.findOne({ email });

    if (!existing) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (existing.password === null) {
      return res.status(400).json({ message: "Reset your credentials" });
    }

    const isMatch = await bcrypt.compare(password, existing.password!);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if user is verified
    if (!existing.isVerified) {
      await sendVerificationEmail(existing); // resend verification email
      return res
        .status(403)
        .json({ message: "Email not verified. Verification email sent." });
    }

    const token = generateToken(
      (existing._id as { toString(): string }).toString(),
      role
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      role,
      user: { id: existing._id, name: existing.name, email: existing.email },
    });
  } catch (error: any) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const token = req.query.token;

  // Ensure token exists and is a string
  if (!token || typeof token !== "string") {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    // Decode the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      role: "employee" | "employer";
    };

    let user;
    if (decoded.role === "employee") {
      user = await User.findById(decoded.userId);
    } else if (decoded.role === "employer") {
      user = await Company.findById(decoded.userId);
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid user or role" });
    }

    // Mark user as verified
    user.isVerified = true;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("Error verifying email:", err);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    let user: any = await User.findOne({ email });
    let role = "employee";

    if (!user) {
      user = await Company.findOne({ email });
      role = "employer";
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send password reset email
    const emailResponse = await sendPasswordResetEmail(user);

    if (emailResponse.success) {
      return res
        .status(200)
        .json({ message: "Password reset email sent successfully" });
    } else {
      return res.status(500).json({ message: "Failed to send email" });
    }
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword)
    return res.status(400).json({ message: "Token and password are required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      role: "employee" | "employer";
    };

    let user;
    if (decoded.role === "employee") {
      user = await User.findById(decoded.userId);
    } else if (decoded.role === "employer") {
      user = await Company.findById(decoded.userId);
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Password reset error:", err);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

export const googleOAuth = async (req: Request, res: Response) => {
  try {
    const { accessToken, role } = req.body;
    if (!accessToken || !role) {
      return res
        .status(400)
        .json({ message: "Access token and role required" });
    }

    // ✅ Get user info from Google
    const { data } = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const { email, name, sub: googleId, picture } = data;

    if (!email)
      return res
        .status(400)
        .json({ message: "No email found in Google token" });

    // 🔹 Find or create user
    let user;
    if (role === "employer") {
      user = await Company.findOne({ email });
      if (!user) {
        user = await Company.create({
          name,
          email,
          googleId,
          isVerified: true,
        });
      } else if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    } else {
      user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          name,
          email,
          googleId,
          password: null,
          isVerified: true,
        });
      } else if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    }

    // 🔹 Generate JWT
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email, role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Google login successful",
      token: jwtToken,
      user,
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ message: "Google authentication failed" });
  }
};
