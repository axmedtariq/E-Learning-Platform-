import express from "express";
import authMiddleware from "../middleware/auth.js";
import multer from "multer";
import { 
    registerInstructor,
    createCourse,
    createLesson,
    createQuiz,
    getInstructorCourses,
    updateProfile,
    updateProfilePicture,
    logout
} from "../instructorcontroller.js";

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
router.post("/register", authMiddleware, registerInstructor);
router.post("/create-course", authMiddleware, upload.single("thumbnail"), createCourse);
router.post("/create-lesson", authMiddleware, upload.single("video"), createLesson);
router.post("/create-quiz", authMiddleware, createQuiz);
router.get("/courses", authMiddleware, getInstructorCourses);
router.put("/profile", authMiddleware, updateProfile);
router.put("/profile-picture", authMiddleware, upload.single("profile_picture"), updateProfilePicture);
router.post("/logout", authMiddleware, logout);

export default router;
