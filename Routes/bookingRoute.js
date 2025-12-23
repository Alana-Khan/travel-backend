import express from "express";

import { createBooking, updateBooking,getAllBookings, deleteBooking} from "../Controllers/bookingController.js";
const router = express.Router();

router.post("/create", createBooking);
router.put("/update/:id", updateBooking);
router.get("/all", getAllBookings);
router.delete("/delete/:id", deleteBooking);
export default router;