import CheckOut from "../Models/checkOutModel.js";
import asyncHandler from "express-async-handler";

// Create a new checkout (tour booking)
export const createCheckOut = asyncHandler(async (req, res) => {
  const {
    tourName,
    price,
    duration,
    travelerInfo,
    tripDetails,
    paymentMethod,
  } = req.body;

  // Basic validation
  if (!tourName || !price || !duration) {
    res.status(400);
    throw new Error("Tour information is required");
  }

  if (
    !travelerInfo ||
    !travelerInfo.fullName ||
    !travelerInfo.email ||
    !travelerInfo.phone
  ) {
    res.status(400);
    throw new Error("Traveler information is required");
  }

  if (
    !tripDetails ||
    !tripDetails.travelDate ||
    !tripDetails.numberOfTravelers
  ) {
    res.status(400);
    throw new Error("Trip details are required");
  }

  if (!paymentMethod) {
    res.status(400);
    throw new Error("Payment method is required");
  }

  const checkOut = new CheckOut({
    user: req.user._id, // logged in user
    tourName,
    price,
    duration,
    travelerInfo,
    tripDetails,
    paymentMethod,
  });

  const createdBooking = await checkOut.save();
  res.status(201).json(createdBooking);
});
