import express from "express";
import { 
  adminLogin, 
  createAdmin, 
  toggleAdminBusyStatus, 
  getAdminStatus,

} from "../Controllers/adminController.js";
import { getAllContacts } from "../Controllers/contactController.js";
const router = express.Router();

router.post("/create", createAdmin);
router.post("/login", adminLogin);

// Get current isBusy status
router.get("/status/:email", getAdminStatus);
router.put("/toggle-busy/:email", toggleAdminBusyStatus);

// ✅ New routes for contact messages
router.get("/contact", getAllContacts);        // Fetch all messages
// Delete a message by ID

export default router;
