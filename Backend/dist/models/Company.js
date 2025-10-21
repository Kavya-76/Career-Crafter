import mongoose, { Schema } from "mongoose";
const companySchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, default: "employer" },
    googleId: { type: String },
}, { timestamps: true });
const Company = mongoose.model("Company", companySchema);
export default Company;
