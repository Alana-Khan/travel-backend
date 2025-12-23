import Review from "../models/reviewModel.js";

// reviewcontroller.js
// make sure your model is correct

// Add new review
export const addReview = async (req, res) => {
  try {
    const { firstName, lastName, email, subject, message } = req.body;

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
    });
  } catch (error) {
    console.error("Review error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
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
