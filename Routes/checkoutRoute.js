// routes/checkout.js
import express from "express";
import { createCheckOut} from "../Controllers/checkOut.js";
import { protect } from "../MiddleWare/protect.js";

const router = express.Router();

router.post("/", protect, createCheckOut); // create checkout (protected)

export default router;
