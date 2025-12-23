import mongoose from "mongoose";
import Admin from "../Models/AdminModel.js";

const MONGO_URI = "mongodb+srv://ifarkhaalanagul10_db_user:PQRIB9agQWGAv2R2@cluster0.avhtad8.mongodb.net/?appName=Cluster0";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const createAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("Admin already exists!");
      return;
    }

    const admin = new Admin({
      email: "admin@example.com",
      password: "Admin@123" // will be hashed automatically
    });

    await admin.save();
    console.log("Admin created successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
};

createAdmin();
