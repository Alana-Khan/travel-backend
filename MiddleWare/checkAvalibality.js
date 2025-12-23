import Admin from "../Models/AdminModel.js";

const checkAvailability = async (req, res, next) => {
  try {
    const admin = await Admin.findOne(); // assuming single admin

    if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });

    const bookingDate = new Date(req.body.bookingDate).toISOString().slice(0,10);

    // Check if date is in admin's availableDates
    const isAvailable = admin.availableDates.some(date =>
      date.toISOString().slice(0,10) === bookingDate
    );

    if (!isAvailable) {
      return res.status(409).json({
        success: false,
        message: "Oops! Admin is not free on this date. You cannot book.",
      });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error while checking availability" });
  }
};

export default checkAvailability;
