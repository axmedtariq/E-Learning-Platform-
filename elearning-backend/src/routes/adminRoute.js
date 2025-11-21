import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
    adminLogin,
    createAdmin,
    getAllStudents,
    deleteStudent,
    getAllInstructors,
    approveInstructor,
    rejectInstructor,
    getAllCourses,
    deleteCourse,
    systemStats,
    revenueByTime
} from "../admincontroller.js";

const router = express.Router();

// Admin login / create (one-time)
router.post("/create", createAdmin);
router.post("/login", adminLogin);

// Students CRUD
router.get("/students", authMiddleware, getAllStudents);
router.delete("/students/:studentId", authMiddleware, deleteStudent);

// Instructors CRUD
router.get("/instructors", authMiddleware, getAllInstructors);
router.put("/instructors/approve/:instructorId", authMiddleware, approveInstructor);
router.put("/instructors/reject/:instructorId", authMiddleware, rejectInstructor);

// Courses CRUD
router.get("/courses", authMiddleware, getAllCourses);
router.delete("/courses/:courseId", authMiddleware, deleteCourse);

// Reports
router.get("/stats", authMiddleware, systemStats);
router.get("/revenue", authMiddleware, revenueByTime);

export default router;
