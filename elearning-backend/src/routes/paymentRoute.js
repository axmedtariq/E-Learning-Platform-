const express = require("express");
const authMiddleware = require("../middleware/auth.js");
const {
  createPaymentIntent,
  handlePaymentWebhook,
  getInstructorRevenue,
  getAdminRevenue,
} = require("../Controllers/paymentController.js");

const router = express.Router();

// Create Stripe Payment Intent
router.post("/create-payment-intent", authMiddleware, createPaymentIntent);

// Stripe Webhook
// Note: raw body parsing is done in server.js, so just call the handler
router.post("/webhook", handlePaymentWebhook);

// Instructor revenue
router.get("/instructor", authMiddleware, getInstructorRevenue);

// Admin revenue
router.get("/admin", authMiddleware, getAdminRevenue);

module.exports = router;
