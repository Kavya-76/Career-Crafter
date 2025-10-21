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
        const token = generateToken(newUser._id.toString(), role);
        return res.status(201).json({
            message: "Signup successful",
            token,
            role,
            user: { id: newUser._id, name: newUser.name, email: newUser.email },
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
