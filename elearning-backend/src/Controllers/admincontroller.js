const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { query } = require("../config/db.js");
require("dotenv").config();

// ---------------- CREATE ADMIN ----------------
const createAdmin = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    email = email.trim().toLowerCase();

    // Check if admin exists
    const existing = await query(
      "SELECT * FROM Admins WHERE email=@param0",
      [email]
    );
    if (existing.recordset.length > 0) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert admin
    await query(
      "INSERT INTO Admins (name, email, password) VALUES (@param0, @param1, @param2)",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    console.error("Create admin error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ---------------- ADMIN LOGIN ----------------
const adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim().toLowerCase();

    // Find admin by email
    const result = await query(
      "SELECT * FROM Admins WHERE LOWER(email)=@param0",
      [email]
    );

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const admin = result.recordset[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: admin.id, email: admin.email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", admin, token });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ---------------- STUDENTS ----------------
const getAllStudents = async (req, res) => {
  try {
    const result = await query("SELECT * FROM Students");
    res.json(result.recordset);
  } catch (err) {
    console.error("Get all students error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    await query("DELETE FROM Students WHERE id=@param0", [studentId]);
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error("Delete student error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ---------------- INSTRUCTORS ----------------
const getAllInstructors = async (req, res) => {
  try {
    const result = await query("SELECT * FROM Instructors");
    res.json(result.recordset);
  } catch (err) {
    console.error("Get all instructors error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const approveInstructor = async (req, res) => {
  try {
    const { instructorId } = req.params;
    await query(
      "UPDATE Instructors SET status='Approved' WHERE id=@param0",
      [instructorId]
    );
    res.json({ message: "Instructor approved" });
  } catch (err) {
    console.error("Approve instructor error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const rejectInstructor = async (req, res) => {
  try {
    const { instructorId } = req.params;
    await query(
      "UPDATE Instructors SET status='Rejected' WHERE id=@param0",
      [instructorId]
    );
    res.json({ message: "Instructor rejected" });
  } catch (err) {
    console.error("Reject instructor error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ---------------- COURSES ----------------
const getAllCourses = async (req, res) => {
  try {
    const result = await query("SELECT * FROM Courses");
    res.json(result.recordset);
  } catch (err) {
    console.error("Get all courses error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    await query("DELETE FROM Courses WHERE id=@param0", [courseId]);
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error("Delete course error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ---------------- SYSTEM STATS ----------------
const systemStats = async (req, res) => {
  try {
    // Add your logic to calculate stats
    res.json({ students: 1200, instructors: 45, courses: 78 });
  } catch (err) {
    console.error("System stats error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ---------------- REVENUE ----------------
const revenueByTime = async (req, res) => {
  try {
    // Add your logic to calculate revenue
    res.json([
      { month: "Jan", revenue: 1200 },
      { month: "Feb", revenue: 1500 },
    ]);
  } catch (err) {
    console.error("Revenue error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ---------------- EXPORT ----------------
module.exports = {
  createAdmin,
  adminLogin,
  getAllStudents,
  deleteStudent,
  getAllInstructors,
  approveInstructor,
  rejectInstructor,
  getAllCourses,
  deleteCourse,
  systemStats,
  revenueByTime,
};
