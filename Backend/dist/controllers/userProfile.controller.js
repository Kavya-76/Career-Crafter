var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import UserProfile from "../models/UserProfile.js";
export const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        // console.log("User id: ",userId) 
        const profile = yield UserProfile.findOne({ userId });
        // console.log("profile found", profile);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json({ success: true, profile });
    }
    catch (error) {
        console.error("Get Profile Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
export const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const profileData = req.body;
        const profile = yield UserProfile.findOneAndUpdate({ userId }, profileData, { new: true, upsert: true } // create if not exists
        );
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profile,
        });
    }
    catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
