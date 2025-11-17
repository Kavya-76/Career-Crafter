// src/models/Job.ts
import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    location: String,
    description: String,
    skillsRequired: [String],
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    postedAt: { type: Date, default: Date.now },
}, { timestamps: true });
export default mongoose.models.Job || mongoose.model("Job", jobSchema);
