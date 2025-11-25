const express = require ("express");
const authMiddleware = require ("../middleware/auth.js");
const { createPaymentIntent, handlePaymentWebhook, getInstructorRevenue, getAdminRevenue } = require("../Controllers/paymentController.js");


const router = express.Router();

router.post("/create-payment-intent", authMiddleware, createPaymentIntent);
router.post("/webhook", express.raw({ type: "application/json" }), handlePaymentWebhook);

// Instructor revenue
router.get("/instructor", authMiddleware, getInstructorRevenue);

// Admin revenue
router.get("/admin", authMiddleware, getAdminRevenue);

module.exports = router;
