import mongoose from "mongoose";

const checkOutSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tourName: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    travelerInfo: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },

    tripDetails: {
      travelDate: { type: Date, required: true },
      numberOfTravelers: { type: Number, required: true },
      specialRequests: { type: String },
    },

    paymentMethod: {
      type: String,
      enum: ["PayPal", "Easypaisa", "JazzCash", "Bank Transfer"],
      required: true,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: Date,

    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("CheckOut", checkOutSchema);
