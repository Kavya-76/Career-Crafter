import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import User from "../models/User.js";
import Company from "../models/Company.js";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";

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

    const isMatch = await bcrypt.compare(password, existing.password!);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if user is verified
    if (!existing.isVerified) {
      await sendVerificationEmail(existing); // resend verification email
      return res.status(403).json({ message: "Email not verified. Verification email sent." });
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

  console.log("Verifying the email...");

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

    // Determine which model to search
    console.log(decoded.role);
    
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