import express from "express";
import multer from "multer";
import { addTour, getAllTours, updateTour, deleteTour } from "../Controllers/toursController.js";

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder where images will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Admin - Add Tour (with image)
router.post("/add", upload.single("image"), addTour);

// User - Get all tours
router.get("/", getAllTours);

// Admin - Update Tour (with optional image)
router.put("/update/:id", upload.single("image"), updateTour);

// Admin - Delete Tour
router.delete("/delete/:id", deleteTour);

export default router;
