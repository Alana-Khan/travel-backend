import express from "express";
import cors from "cors";
import morgan from "morgan";
import serverless from "serverless-http";
import { connectToDatabase } from "./connection/db.js";
import logger from "./utils/logger.js";
import { config } from "dotenv";

const app = express();

// env config
config();

const PORT = process.env.PORT || 5000;

// database connection
connectToDatabase();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173"
      
    ],
  })
);

app.use(morgan("dev")); // 🔥 HTTP request logger
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
import userRoute from "./Routes/userRoute.js";
import adminRoute from "./Routes/AdminRoute.js";
import toursRoute from "./Routes/toursRoute.js";
import galleryRoute from "./Routes/contactRoute.js";
import bookingRoute from "./Routes/bookingRoute.js";
import reviewRoute from "./Routes/reviewRoute.js";
import checkoutRoute from "./Routes/checkoutRoute.js";
app.use("/uploads", express.static("uploads"));
app.use("/api/checkout", checkoutRoute);
app.use("/api/users", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/tours", toursRoute);
app.use("/api/contact", galleryRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/reviews", reviewRoute);

// server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
