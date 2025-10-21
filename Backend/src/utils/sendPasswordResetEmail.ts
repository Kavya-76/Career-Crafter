import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { IUser } from "../models/User";
import dotenv from "dotenv";
import { ICompany } from "../models/Company";
dotenv.config();

const domain = process.env.FRONTEND_URL;
const send_email = process.env.SEND_EMAIL;
const email_pass = process.env.EMAIL_PASS;

export const sendPasswordResetEmail = async (user:IUser|ICompany) => {
  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  const resetLink = `${domain}/reset-password?token=${token}`;
  const resetPassHtml = `<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        color: #333;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background-color: #ffffff;
        border-radius: 8px;
        padding: 30px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        background-color: #0077cc;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
      }
      .footer {
        font-size: 12px;
        color: #777;
        margin-top: 30px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Password Reset Request</h2>
      <p>Hi there,</p>
      <p>We received a request to reset your password for your <strong>Career Crafter</strong> account. If you didn’t make this request, you can safely ignore this email.</p>
      <p>Otherwise, click the button below to reset your password:</p>
      <a href="${resetLink}" class="button">Reset Password</a>
      <p>If the button doesn’t work, copy and paste this link into your browser:</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
      <div class="footer">
        Sent by Kavya Bansal on behalf of Career Crafter<br>
        © Career Crafter 2025
      </div>
    </div>
  </body>
</html>`;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: send_email,
        pass: email_pass, // Use an App Password for Gmail
      },
    });

    const mailOptions = {
      from: `"Career Crafter" ${send_email}`,
      to: user.email,
      subject: "Reset your password",
      html: resetPassHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return { success: true, response: info.response };
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error sending email:", error);
    return { success: false, error: err.message };
  }
};
