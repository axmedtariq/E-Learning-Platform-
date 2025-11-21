import express from "express";
import authMiddleware from "../middleware/auth.js";
import { createPaymentIntent, handlePaymentWebhook, getInstructorRevenue, getAdminRevenue } from "../paymentcontroller.js";

const router = express.Router();

router.post("/create-payment-intent", authMiddleware, createPaymentIntent);
router.post("/webhook", express.raw({ type: "application/json" }), handlePaymentWebhook);

// Instructor revenue
router.get("/instructor", authMiddleware, getInstructorRevenue);

// Admin revenue
router.get("/admin", authMiddleware, getAdminRevenue);

export default router;
