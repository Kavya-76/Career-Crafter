import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  startDate: Date,
  endDate: Date,
  description: String,
});

const educationSchema = new mongoose.Schema({
  school: String,
  degree: String,
  field: String,
  startYear: Date,
  endYear: Date,
  description: String
});

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  techStack: [String],
  link: String,
});

const achievementSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Number,
});

const userProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    headline: String,
    bio: String,
    location: String,
    phone: String,
    skills: [String],
    experience: [experienceSchema],
    education: [educationSchema],
    projects: [projectSchema],
    achievements: [achievementSchema],
    profileCompletion: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.UserProfile || mongoose.model("UserProfile", userProfileSchema);
