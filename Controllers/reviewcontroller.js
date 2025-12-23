import Review from "../models/reviewModel.js";

// ✅ ADD NEW REVIEW
export const addReview = async (req, res) => {
  try {
    const { firstName, lastName, email, subject, message } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Combine first + last name
    const userName = `${firstName} ${lastName}`;

    const review = await Review.create({
      userName,
      email,
      subject,
      comment: message, // message → comment (DB field)
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    console.error("Review error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ GET ALL REVIEWS
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
