const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const query = require("../config/db.js");
const fs = require("fs");
const path = require("path");

// -------------------- REGISTER --------------------
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existing = await query(
      `SELECT id FROM Users WHERE email=@param0`,
      [email]
    );
    if (existing.recordset.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await query(
      `INSERT INTO Users (name, email, password, role, created_at)
       VALUES (@param0, @param1, @param2, 'student', GETDATE())`,
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------- LOGIN --------------------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const result = await query(`SELECT * FROM Users WHERE email=@param0`, [email]);
    if (!result.recordset.length)
      return res.status(400).json({ message: "Invalid email or password" });

    const user = result.recordset[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid email or password" });

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile_picture: user.profile_picture,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------- LOGOUT --------------------
const logout = async (req, res) => {
  res.json({ message: "Logout successful. Delete token on frontend" });
};

// -------------------- PROFILE --------------------
const getProfile = async (req, res) => {
  try {
    const { userId } = req; // From auth middleware
    const result = await query(
      `SELECT id, name, email, role, bio, profile_picture
       FROM Users
       WHERE id=@param0`,
      [userId]
    );

    if (!result.recordset.length)
      return res.status(404).json({ message: "User not found" });

    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId } = req;
    const { name, bio } = req.body;

    await query(
      `UPDATE Users
       SET name=@param0, bio=@param1, updated_at=GETDATE()
       WHERE id=@param2`,
      [name, bio, userId]
    );

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -------------------- PROFILE PICTURE --------------------
const updateProfilePicture = async (req, res) => {
  try {
    const { userId } = req;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const filePath = req.file.filename;

    // Delete old profile picture if exists
    const oldPic = await query(`SELECT profile_picture FROM Users WHERE id=@param0`, [userId]);
    if (oldPic.recordset[0].profile_picture) {
      const oldFilePath = path.join("uploads/profile-images", oldPic.recordset[0].profile_picture);
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
    }

    await query(
      `UPDATE Users
       SET profile_picture=@param0, updated_at=GETDATE()
       WHERE id=@param1`,
      [filePath, userId]
    );

    res.json({ message: "Profile picture updated", profile_picture: filePath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -------------------- PURCHASED COURSES --------------------
const getPurchasedCourses = async (req, res) => {
  try {
    const { userId } = req;

    const result = await query(
      `SELECT 
          c.id,
          c.title,
          c.description,
          c.price,
          c.thumbnail,
          e.progress,
          e.purchased_at
       FROM Enrollments e
       JOIN Courses c ON e.course_id = c.id
       WHERE e.user_id=@param0`,
      [userId]
    );

    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -------------------- UPDATE COURSE PROGRESS --------------------
const updateCourseProgress = async (req, res) => {
  try {
    const { enrollmentId, progress } = req.body; // progress in %
    await query(
      `UPDATE Enrollments SET progress=@param0 WHERE id=@param1`,
      [progress, enrollmentId]
    );
    res.json({ message: "Progress updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  updateProfilePicture,
  getPurchasedCourses,
  updateCourseProgress,
};
