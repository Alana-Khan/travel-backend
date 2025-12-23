import express from "express";
import { submitContact, getAllContacts } from "../Controllers/contactController.js";

const router = express.Router();

router.post("/", submitContact);

// Optional: admin route to view all
router.get("/", getAllContacts);

export default router;
