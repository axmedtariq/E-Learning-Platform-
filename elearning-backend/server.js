const dotenv = require("dotenv");  // IMPORT dotenv first
dotenv.config();                   // LOAD .env before any other import

const express = require("express");
const cors = require("cors");
const userRoutes = require("./src/routes/authRoute.js");
const instructorRoutes = require("./src/routes/instructorRoute.js");
const adminRoutes = require("./src/routes/adminRoute.js");
const paymentRoutes = require("./src/routes/paymentRoute.js");

const app = express();

// Stripe webhook route needs raw body
app.post(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }),
  require("./src/Controllers/paymentController.js").handlePaymentWebhook
);

// Normal JSON parser for all other routes
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/uploads/profile-images", express.static("uploads/profile-images"));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 5731;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));