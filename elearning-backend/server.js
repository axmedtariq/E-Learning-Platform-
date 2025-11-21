import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";
import instructorRoutes from "./src/routes/instructorRoutes.js";
import adminRoutes from "./src/routes/adminRoute.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Serve profile images
app.use("/uploads/profile-images", express.static("uploads/profile-images"));

// Student routes
app.use("/api/user", userRoutes);

// instructor routes
app.use("/api/instructor", instructorRoutes);

// Admin routes
app.use("/api/admin", adminRoutes);

// Payment Route
app.use("/api/payment", paymentRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
