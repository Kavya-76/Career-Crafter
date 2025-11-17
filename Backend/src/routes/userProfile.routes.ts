// src/routes/userProfile.routes.ts
import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userProfile.controller";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// GET → fetch profile
router.get("/", protect, getUserProfile);

// POST → create/update profile
router.post("/", protect, updateUserProfile);

export default router;
