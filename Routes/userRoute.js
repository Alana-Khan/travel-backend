import express from "express";
import { registerUser, loginUser,getAllUsers } from "../Controllers/userController.js";
const router = express.Router();

router.post("/register", registerUser);
console.log("REGISTER ROUTE HIT");
router.post("/login", loginUser);
router.get("/all", getAllUsers);
export default router;