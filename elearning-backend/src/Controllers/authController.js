const  query = require ("../config/db.js");
const fs = require ("fs");
const path = require ("path");

// VIEW PROFILE
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

// UPDATE PROFILE (name, bio)
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

// UPDATE PROFILE PICTURE
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

// VIEW PURCHASED COURSES (with thumbnails)
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

// UPDATE COURSE PROGRESS
const updateCourseProgress = async (req, res) => {
    try {
        const { enrollmentId, progress } = req.body; // progress in %
        await query(`UPDATE Enrollments SET progress=@param0 WHERE id=@param1`, [progress, enrollmentId]);
        res.json({ message: "Progress updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// LOGOUT (frontend deletes token)
const logout = async (req, res) => {
    res.json({ message: "Logout successful. Delete token on frontend" });
};


module.exports = {
    getProfile,
    updateProfile,
    updateProfilePicture,
    getPurchasedCourses,
    updateCourseProgress,
    logout
};