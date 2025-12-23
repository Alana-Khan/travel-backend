import bookingModel from "../Models/bookingModel.js";
import Admin from "../Models/AdminModel.js";

// CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const admin = await Admin.findOne();

    if (admin?.isBusy) {
      return res.status(403).json({
        message: "Admin busy hai, booking allowed nahi"
      });
    }

    const booking = new bookingModel(req.body);
    await booking.save();

    res.status(201).json({
      message: "Booking successful",
      booking
    });
  } catch (error) {
    res.status(500).json({ message: "Booking failed", error });
  }
};

// GET ALL BOOKINGS
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find();
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

// UPDATE BOOKING
export const updateBooking = async (req, res) => {
  try {
    const updated = await bookingModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({
      message: "Booking updated",
      booking: updated
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating booking" });
  }
};

// DELETE BOOKING
export const deleteBooking = async (req, res) => {
  try {
    await bookingModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking" });
  }
};
