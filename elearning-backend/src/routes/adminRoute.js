const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.js");

// Import admin controller functions
const adminController = require("../Controllers/adminController.js");

// Admin login / create
router.post("/create", adminController.createAdmin);
router.post("/login", adminController.adminLogin);

// Students routes
router.get("/students", authMiddleware, adminController.getAllStudents);
router.delete("/students/:studentId", authMiddleware, adminController.deleteStudent);

// Instructors routes
router.get("/instructors", authMiddleware, adminController.getAllInstructors);
router.patch("/instructors/approve/:instructorId", authMiddleware, adminController.approveInstructor);
router.patch("/instructors/reject/:instructorId", authMiddleware, adminController.rejectInstructor);

// Courses routes
router.get("/courses", authMiddleware, adminController.getAllCourses);
router.delete("/courses/:courseId", authMiddleware, adminController.deleteCourse);

// System stats
router.get("/stats", authMiddleware, adminController.systemStats);

// Revenue
router.get("/revenue", authMiddleware, adminController.revenueByTime);

module.exports = router;
