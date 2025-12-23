import mongoose from "mongoose";
import Admin from "./Models/AdminModel.js";

const MONGO_URI = "mongodb+srv://ifarkhaalanagul10_db_user:PQRIB9agQWGAv2R2@cluster0.avhtad8.mongodb.net/travel-app?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("DB connected");
    const admin = await Admin.findOne({ email: "admin@example.com" });
    console.log("Admin found:", admin);
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
