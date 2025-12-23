<<<<<<< HEAD
import Review from "../models/reviewModel.js";

// reviewcontroller.js
// make sure your model is correct

=======
import review from "../Models/reviewModel.js"
// reviewcontroller.js
// make sure your model is correct

>>>>>>> 1002db3 (Updated seedAdmin script + added new routes)
// Add new review
export const addReview = async (req, res) => {
  try {
    const { firstName, lastName, email, subject, message } = req.body;
<<<<<<< HEAD

    const review = new Review({
      firstName,
      lastName,
      email,
      subject,
      message,
    });

    await review.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
=======

    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Combine first and last name into userName
    const userName = `${firstName} ${lastName}`;

    const review = await Review.create({
      userName,
      email,
      subject,
      comment: message, // map message to comment in the DB
>>>>>>> 1002db3 (Updated seedAdmin script + added new routes)
    });

    res.status(201).json({ review });
  } catch (error) {
<<<<<<< HEAD
    console.error("Review error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
=======
    console.error(error); // this helps debug 500 errors
    res.status(500).json({ message: "Internal Server Error" });
>>>>>>> 1002db3 (Updated seedAdmin script + added new routes)
  }
};

// Other controllers (getAllReviews, deleteReview) remain the same


// ✅ GET ALL REVIEWS (Admin / later use)
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

// ✅ DELETE REVIEW
export const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review" });
  }
};
