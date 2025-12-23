import Admin from "../Models/AdminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import asyncHandler from "express-async-handler";

// ✅ Create Admin
export const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = new Admin({ email, password });
    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating admin", error });
  }
};



// ==============================
// ✅ Admin Login
// ==============================
export const adminLogin = asyncHandler(async (req, res) => {
  console.log("Request body:", req.body); // <--- important
  const { email, password } = req.body;
  console.log("Login attempt with email:", email);

  const admin = await Admin.findOne({ email });
  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }

  const isPasswordValid = await admin.comparePassword(password);
  if (!isPasswordValid) {
    res.status(401);
    throw new Error("Invalid password");
  }

  const accessToken = generateAccessToken(admin);
  const refreshToken = generateRefreshToken(admin);

  res.status(200).json({
    message: "Login successful",
    admin: {
      _id: admin._id,
      email: admin.email,
      role: "admin",
      isBusy: admin.isBusy || false,
    },
    accessToken,
    refreshToken,
  });
});

// ✅ Toggle Admin Busy Status
// Note: Abhi simple boolean add kar rahe hain
export const toggleAdminBusyStatus = async (req, res) => {
  try {
    console.log("Email param:", req.params.email);

    const admin = await Admin.findOne({ email: req.params.email });
    console.log("Admin found:", admin);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    admin.isBusy = !admin.isBusy;
    await admin.save();

    res.status(200).json({
      message: `Admin isBusy status toggled to ${admin.isBusy}`,
      isBusy: admin.isBusy
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error toggling isBusy status", error });
  }
};


// ✅ Get Admin Status
export const getAdminStatus = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.params.email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Add isBusy default if missing
    if (admin.isBusy === undefined) admin.isBusy = false;

    res.status(200).json({ isBusy: admin.isBusy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching admin status", error });
  }
};
