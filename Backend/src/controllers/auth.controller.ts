import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import User from "../models/User.js";
import Company from "../models/Company.js";

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

    const token = generateToken((newUser._id as { toString(): string }).toString(), role);

    return res.status(201).json({
      message: "Signup successful",
      token,
      role,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
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

    const token = generateToken((existing._id as { toString(): string }).toString(), role);

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
