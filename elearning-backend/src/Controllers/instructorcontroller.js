import { query } from "../config/db.js";

// =======================
// Courses APIs
// =======================

// Get all courses by instructor
export const getCourses = async (req, res) => {
    try {
        const instructorId = req.userId;
        const result = await query(
            "SELECT * FROM Courses WHERE instructor_id=@param0", 
            [instructorId]
        );
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create course
export const createCourse = async (req, res) => {
    try {
        const { title, description, price, thumbnail, preview_video } = req.body;
        const instructorId = req.userId;

        await query(
            `INSERT INTO Courses (title, description, price, thumbnail, preview_video, instructor_id)
             VALUES (@param0,@param1,@param2,@param3,@param4,@param5)`,
            [title, description, price, thumbnail, preview_video, instructorId]
        );
        res.json({ message: "Course created successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update course
export const updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, description, price, thumbnail, preview_video } = req.body;

        await query(
            `UPDATE Courses SET title=@param0, description=@param1, price=@param2, thumbnail=@param3, preview_video=@param4, updated_at=GETDATE()
             WHERE id=@param5`,
            [title, description, price, thumbnail, preview_video, courseId]
        );
        res.json({ message: "Course updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete course
export const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        await query(`DELETE FROM Courses WHERE id=@param0`, [courseId]);
        res.json({ message: "Course deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// =======================
// Lessons APIs
// =======================

// Get lessons of a course
export const getLessons = async (req, res) => {
    try {
        const { courseId } = req.params;
        const lessons = await query(
            "SELECT * FROM Lessons WHERE course_id=@param0 ORDER BY position",
            [courseId]
        );
        res.json(lessons.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create lesson
export const createLesson = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, video, description, is_preview, position } = req.body;

        await query(
            `INSERT INTO Lessons (course_id, title, video, description, is_preview, position)
             VALUES (@param0,@param1,@param2,@param3,@param4,@param5)`,
            [courseId, title, video, description, is_preview ? 1 : 0, position]
        );
        res.json({ message: "Lesson created successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update lesson
export const updateLesson = async (req, res) => {
    try {
        const { lessonId } = req.params;
        const { title, video, description, is_preview, position } = req.body;

        await query(
            `UPDATE Lessons SET title=@param0, video=@param1, description=@param2, is_preview=@param3, position=@param4, updated_at=GETDATE()
             WHERE id=@param5`,
            [title, video, description, is_preview ? 1 : 0, position, lessonId]
        );
        res.json({ message: "Lesson updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete lesson
export const deleteLesson = async (req, res) => {
    try {
        const { lessonId } = req.params;
        await query(`DELETE FROM Lessons WHERE id=@param0`, [lessonId]);
        res.json({ message: "Lesson deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// =======================
// Quizzes APIs
// =======================

// Get quizzes for lesson
export const getQuizzes = async (req, res) => {
    try {
        const { lessonId } = req.params;
        const quizzes = await query("SELECT * FROM Quizzes WHERE lesson_id=@param0", [lessonId]);
        res.json(quizzes.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create quiz
export const createQuiz = async (req, res) => {
    try {
        const { lessonId } = req.params;
        const { question, options, correct_answer } = req.body;

        await query(
            `INSERT INTO Quizzes (lesson_id, question, options, correct_answer)
             VALUES (@param0,@param1,@param2,@param3)`,
            [lessonId, question, JSON.stringify(options), correct_answer]
        );
        res.json({ message: "Quiz created successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update quiz
export const updateQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const { question, options, correct_answer } = req.body;

        await query(
            `UPDATE Quizzes SET question=@param0, options=@param1, correct_answer=@param2, updated_at=GETDATE() 
             WHERE id=@param3`,
            [question, JSON.stringify(options), correct_answer, quizId]
        );
        res.json({ message: "Quiz updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete quiz
export const deleteQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        await query(`DELETE FROM Quizzes WHERE id=@param0`, [quizId]);
        res.json({ message: "Quiz deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// =======================
// Instructor Revenue & Logout
// =======================

export const getCourseRevenue = async (req, res) => {
    try {
        const instructorId = req.userId;
        const result = await query(
            `SELECT c.id, c.title, SUM(e.progress * c.price / 100) AS revenue
             FROM Courses c
             LEFT JOIN Enrollments e ON c.id = e.course_id
             WHERE c.instructor_id=@param0
             GROUP BY c.id, c.title`,
            [instructorId]
        );
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get instructor profile
export const getProfile = async (req, res) => {
    try {
        const instructorId = req.userId;
        const result = await query(
            "SELECT id, name, email, bio, profile_picture FROM Users WHERE id=@param0 AND role='instructor'",
            [instructorId]
        );
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Instructor not found" });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update profile (name, bio)
export const updateProfile = async (req, res) => {
    try {
        const instructorId = req.userId;
        const { name, bio } = req.body;

        await query(
            "UPDATE Users SET name=@param0, bio=@param1, updated_at=GETDATE() WHERE id=@param2 AND role='instructor'",
            [name, bio, instructorId]
        );
        res.json({ message: "Profile updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update profile picture
export const updateProfilePicture = async (req, res) => {
    try {
        const instructorId = req.userId;
        const profilePicturePath = req.file ? req.file.path : null;

        if (!profilePicturePath) {
            return res.status(400).json({ message: "No profile picture uploaded" });
        }

        await query(
            "UPDATE Users SET profile_picture=@param0, updated_at=GETDATE() WHERE id=@param1 AND role='instructor'",
            [profilePicturePath, instructorId]
        );
        res.json({ message: "Profile picture updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const logout = async (req, res) => {
    // Invalidate token on frontend
    res.json({ message: "Instructor logged out successfully" });
};
