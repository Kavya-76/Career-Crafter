import mongoose, { Document, Schema } from "mongoose";

export interface ICompany extends Document {
  name: string;
  email: string;
  password?: string;
  role: "employer";
  googleId?: string;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const companySchema = new Schema<ICompany>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, default: "employer" },
    googleId: { type: String },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Company = mongoose.model<ICompany>("Company", companySchema);
export default Company;
