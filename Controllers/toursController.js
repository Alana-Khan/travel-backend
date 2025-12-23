import toursModel from "../Models/toursModel.js";

// CREATE (Admin)
export const addTour = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const image = req.file ? req.file.path : null; // image path from multer

    if (!title || !description || !price || !image) {
      return res.status(400).json({ message: "All fields including image are required" });
    }

    const tour = new toursModel({ title, description, price, image });
    await tour.save();

    res.status(201).json({
      message: "Tour added successfully",
      tour
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding tour", error });
  }
};


// READ ALL (User)
export const getAllTours = async (req, res) => {
  try {
    const tours = await toursModel.find();
    res.status(200).json({ tours });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tours", error });
  }
};

// READ ONE
export const getTourById = async (req, res) => {
  try {
    const tour = await toursModel.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.status(200).json({ tour });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tour", error });
  }
};

// UPDATE (Admin)
export const updateTour = async (req, res) => {
  try {
    const updated = await toursModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Tour not found" });
    res.status(200).json({
      message: "Tour updated",
      tour: updated
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating tour", error });
  }
};

// DELETE (Admin)
export const deleteTour = async (req, res) => {
  try {
    const deleted = await toursModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Tour not found" });
    res.status(200).json({ message: "Tour deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting tour", error });
  }
};
