const express = require("express");
const {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  updateProfilePicture,
  getPurchasedCourses,
  updateCourseProgress
} = require("../Controllers/authController.js");
const authMiddleware = require("../middleware/auth.js");
const multer = require("multer");

const router = express.Router();

// Multer config for profile pictures
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profile-images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// -------------------- AUTH --------------------
router.post("/register", register); // ✅ REGISTER
router.post("/login", login);
router.post("/logout", authMiddleware, logout);

// -------------------- PROFILE --------------------
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.put("/profile-picture", authMiddleware, upload.single("profile_picture"), updateProfilePicture);

// -------------------- COURSES --------------------
router.get("/purchased-courses", authMiddleware, getPurchasedCourses);
router.put("/update-progress", authMiddleware, updateCourseProgress);

// Export the router, NOT functions
module.exports = router;