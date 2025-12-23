import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // MUST be top

import Admin from "../Models/AdminModel.js";

const seedAdmin = async () => {
  try {
    console.log("Connecting to database...", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully ✅");

    const adminExists = await Admin.findOne({ email: "admin@example.com" });
    if (!adminExists) {
      const admin = new Admin({
        name: "Super Admin",
        email: "admin@example.com",
        password: "password123",
      });
      await admin.save();
      console.log("Admin seeded ✅");
    } else {
      console.log("Admin already exists");
    }

    process.exit(0);
  } catch (err) {
    console.error("Error seeding admin:", err);
    process.exit(1);
  }
};

seedAdmin();
