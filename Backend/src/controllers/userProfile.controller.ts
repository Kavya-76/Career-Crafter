// src/controllers/userProfile.controller.ts
import { Request, Response } from "express";
import UserProfile from "../models/UserProfile";

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const profile = await UserProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const profileData = req.body;

    const profile = await UserProfile.findOneAndUpdate(
      { userId },
      profileData,
      { new: true, upsert: true } // create if not exists
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
