import express from "express";
import { addReview, getAllReviews, deleteReview } from "../Controllers/reviewcontroller.js";
const router = express.Router();

router.post("/add", addReview);      // frontend feedback form
router.get("/", getAllReviews);      // admin
router.delete("/:id", deleteReview); // admin
export default router;