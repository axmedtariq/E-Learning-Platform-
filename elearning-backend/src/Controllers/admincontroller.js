import { query } from "../config/db.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import fs from "fs";
import path from "path";

// ====================== ADMIN LOGIN ======================
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await query(`SELECT * FROM Admins WHERE email=@param0`, [email]);
        if (!result.recordset.length) return res.status(400).json({ message: "Invalid email" });

        const admin = result.recordset[0];
        const match = await bcrypt.compare(password, admin.password);
        if (!match) return res.status(400).json({ message: "Invalid password" });

        const token = generateToken(admin.id, "admin");
        res.json({ token, admin: { id: admin.id, name: admin.name, email: admin.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ====================== CREATE ADMIN (ONE TIME) ======================
export const createAdmin = async (req, res) => {
    try {
        const existing = await query(`SELECT * FROM Admins`);
        if (existing.recordset.length) return res.status(400).json({ message: "Admin already exists" });

        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        await query(`INSERT INTO Admins (name, email, password) VALUES (@param0,@param1,@param2)`, [name, email, hashedPassword]);
        res.json({ message: "Admin created successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ====================== CRUD FOR STUDENTS ======================
export const getAllStudents = async (req, res) => {
    try {
        const result = await query(`SELECT id, name, email, role, bio, profile_picture FROM Users WHERE role='student'`);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        await query(`DELETE FROM Users WHERE id=@param0 AND role='student'`, [studentId]);
        res.json({ message: "Student deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ====================== CRUD FOR INSTRUCTORS ======================
export const getAllInstructors = async (req, res) => {
    try {
        const result = await query(`SELECT u.id, u.name, u.email, u.bio, u.profile_picture, iv.status 
                                    FROM Users u
                                    LEFT JOIN InstructorVerifications iv ON u.id = iv.instructor_id
                                    WHERE u.role='instructor'`);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const approveInstructor = async (req, res) => {
    try {
        const { instructorId } = req.params;
        await query(`UPDATE InstructorVerifications SET status='approved', verified_at=GETDATE() WHERE instructor_id=@param0`, [instructorId]);
        res.json({ message: "Instructor approved" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const rejectInstructor = async (req, res) => {
    try {
        const { instructorId } = req.params;
        await query(`UPDATE InstructorVerifications SET status='rejected', verified_at=GETDATE() WHERE instructor_id=@param0`, [instructorId]);
        res.json({ message: "Instructor rejected" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ====================== CRUD FOR COURSES ======================
export const getAllCourses = async (req, res) => {
    try {
        const result = await query(`SELECT c.id, c.title, c.price, c.thumbnail, u.name as instructor
                                    FROM Courses c
                                    JOIN Users u ON c.instructor_id = u.id`);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        await query(`DELETE FROM Courses WHERE id=@param0`, [courseId]);
        res.json({ message: "Course deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ====================== SYSTEM REPORTS ======================
export const systemStats = async (req, res) => {
    try {
        const totalStudents = await query(`SELECT COUNT(*) AS total FROM Users WHERE role='student'`);
        const totalInstructors = await query(`SELECT COUNT(*) AS total FROM Users WHERE role='instructor'`);
        const totalCourses = await query(`SELECT COUNT(*) AS total FROM Courses`);
        const totalRevenue = await query(`SELECT ISNULL(SUM(amount),0) AS total FROM Payments`);

        res.json({
            totalStudents: totalStudents.recordset[0].total,
            totalInstructors: totalInstructors.recordset[0].total,
            totalCourses: totalCourses.recordset[0].total,
            totalRevenue: totalRevenue.recordset[0].total
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ====================== REPORTS BY TIME ======================
export const revenueByTime = async (req, res) => {
    try {
        const { period } = req.query; // daily, weekly, monthly, yearly
        let queryStr = "";

        if (period === "daily") {
            queryStr = `SELECT CONVERT(date, created_at) AS date, ISNULL(SUM(amount),0) AS revenue
                        FROM Payments
                        GROUP BY CONVERT(date, created_at)
                        ORDER BY date ASC`;
        } else if (period === "weekly") {
            queryStr = `SELECT DATEPART(week, created_at) AS week, DATEPART(year, created_at) AS year, ISNULL(SUM(amount),0) AS revenue
                        FROM Payments
                        GROUP BY DATEPART(week, created_at), DATEPART(year, created_at)
                        ORDER BY year, week`;
        } else if (period === "monthly") {
            queryStr = `SELECT DATEPART(month, created_at) AS month, DATEPART(year, created_at) AS year, ISNULL(SUM(amount),0) AS revenue
                        FROM Payments
                        GROUP BY DATEPART(month, created_at), DATEPART(year, created_at)
                        ORDER BY year, month`;
        } else if (period === "yearly") {
            queryStr = `SELECT DATEPART(year, created_at) AS year, ISNULL(SUM(amount),0) AS revenue
                        FROM Payments
                        GROUP BY DATEPART(year, created_at)
                        ORDER BY year`;
        } else {
            return res.status(400).json({ message: "Invalid period" });
        }

        const result = await query(queryStr);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
