import asyncHandler from "express-async-handler";
import Contact from "../Models/contactModel.js";

// @desc    Submit a contact message
// @route   POST /api/contact
// @access  Public
export const submitContact = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error("Name, email and message are required");
  }

  const newContact = await Contact.create({
    name,
    email,
    phone,
    message,
  });

  res.status(201).json({ success: true, contact: newContact });
});

// @desc    Get all contact messages (optional admin route)
// @route   GET /api/contact
// @access  Private/Admin (optional)
export const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json({ success: true, contacts });
});
 