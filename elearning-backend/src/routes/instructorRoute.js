const express = require("express");
const authMiddleware = require ("../middleware/auth.js");
const multer = require("multer");
const { 
    createCourse,
    createLesson,
    createQuiz,
    updateProfile,
    updateProfilePicture,
    logout
} = require ("../Controllers/instructorController.js");

const router = express.Router();

// Multer for course thumbnails and lesson videos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

// Routes
router.post("/create-course", authMiddleware, upload.single("thumbnail"), createCourse);
router.post("/create-lesson", authMiddleware, upload.single("video"), createLesson);
router.post("/create-quiz", authMiddleware, createQuiz);
router.put("/profile", authMiddleware, updateProfile);
router.put("/profile-picture", authMiddleware, upload.single("profile_picture"), updateProfilePicture);
router.post("/logout", authMiddleware, logout);

module.exports = router;
