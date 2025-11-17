// src/models/JobApplication.ts
import mongoose from "mongoose";
const jobApplicationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    status: {
        type: String,
        enum: ["applied", "shortlisted", "interview", "rejected", "hired"],
        default: "applied",
    },
    appliedAt: { type: Date, default: Date.now },
}, { timestamps: true });
export default mongoose.models.JobApplication ||
    mongoose.model("JobApplication", jobApplicationSchema);
