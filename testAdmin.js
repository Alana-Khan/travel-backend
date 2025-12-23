import mongoose from "mongoose";
import Admin from "./Models/AdminModel.js";

const MONGO_URI = "mongodb+srv://ahadsalalk_db_user:jak123@cluster0.wsartcd.mongodb.net/myDatabase?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("DB connected");
    const admin = await Admin.findOne({ email: "admin@example.com" });
    console.log("Admin found:", admin);
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
