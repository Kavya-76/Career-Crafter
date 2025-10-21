var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import User from "../models/User.js";
import Company from "../models/Company.js";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";
export const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Check if user already exists in respective collection
        const existing = role === "employee"
            ? yield User.findOne({ email })
            : yield Company.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash password
        const hashedPassword = yield bcrypt.hash(password, 10);
        // Create new record
        const newUser = role === "employee"
            ? yield User.create({ name, email, password: hashedPassword })
            : yield Company.create({ name, email, password: hashedPassword });
        yield sendVerificationEmail(newUser);
        return res.status(201).json({
            message: "Signup successful",
        });
    }
    catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
});
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Fetch from correct collection
        const existing = role === "employee"
            ? yield User.findOne({ email })
            : yield Company.findOne({ email });
        if (!existing) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = yield bcrypt.compare(password, existing.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Check if user is verified
        if (!existing.isVerified) {
            yield sendVerificationEmail(existing); // resend verification email
            return res.status(403).json({ message: "Email not verified. Verification email sent." });
        }
        const token = generateToken(existing._id.toString(), role);
        return res.status(200).json({
            message: "Login successful",
            token,
            role,
            user: { id: existing._id, name: existing.name, email: existing.email },
        });
    }
    catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
});
export const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.token;
    console.log("Verifying the email...");
    // Ensure token exists and is a string
    if (!token || typeof token !== "string") {
        return res.status(400).json({ message: "Token is required" });
    }
    try {
        // Decode the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Determine which model to search
        console.log(decoded.role);
        let user;
        if (decoded.role === "employee") {
            user = yield User.findById(decoded.userId);
        }
        else if (decoded.role === "employer") {
            user = yield Company.findById(decoded.userId);
        }
        if (!user) {
            return res.status(400).json({ message: "Invalid user or role" });
        }
        // Mark user as verified
        user.isVerified = true;
        yield user.save();
        res.json({ message: "Email verified successfully" });
    }
    catch (err) {
        console.error("Error verifying email:", err);
        res.status(400).json({ message: "Invalid or expired token" });
    }
});
