const { query } = require("../config/db.js");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// CREATE STRIPE PAYMENT INTENT
const createPaymentIntent = async (req, res) => {
    try {
        const studentId = req.userId; // from auth middleware
        const { courseId } = req.body;

        // Fetch course
        const courseResult = await query(
            "SELECT price, instructor_id FROM Courses WHERE id=@param0",
            [courseId]
        );
        if (!courseResult.recordset.length) {
            return res.status(404).json({ message: "Course not found" });
        }

        const course = courseResult.recordset[0];
        const amount = course.price * 100; // Stripe expects cents

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount),
            currency: "usd",
            metadata: {
                courseId,
                studentId,
                instructorId: course.instructor_id
            }
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// HANDLE STRIPE WEBHOOK
const handlePaymentWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.rawBody, process.env.STRIPE_WEBHOOK_SECRET, sig);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object;
        const courseId = paymentIntent.metadata.courseId;
        const studentId = paymentIntent.metadata.studentId;
        const instructorId = paymentIntent.metadata.instructorId;
        const totalAmount = paymentIntent.amount_received / 100;

        const systemCut = totalAmount * 0.18;
        const instructorEarnings = totalAmount - systemCut;

        // Insert payment record
        await query(
            `INSERT INTO Payments (course_id, student_id, instructor_id, amount, system_cut, instructor_earnings, payment_status, stripe_payment_intent)
             VALUES (@param0,@param1,@param2,@param3,@param4,@param5,'succeeded',@param6)`,
            [courseId, studentId, instructorId, totalAmount, systemCut, instructorEarnings, paymentIntent.id]
        );

        // Enroll student
        await query(
            `INSERT INTO Enrollments (user_id, course_id, progress, purchased_at)
             VALUES (@param0,@param1,0,GETDATE())`,
            [studentId, courseId]
        );
    }

    res.json({ received: true });
};

// GET INSTRUCTOR REVENUE
const getInstructorRevenue = async (req, res) => {
    try {
        const userId = req.userId;
        const result = await query(
            `SELECT c.title, p.amount, p.system_cut, p.instructor_earnings, p.created_at
             FROM Payments p
             JOIN Courses c ON p.course_id = c.id
             WHERE p.instructor_id=@param0`,
            [userId]
        );
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET ADMIN REVENUE
const getAdminRevenue = async (req, res) => {
    try {
        const result = await query(`SELECT ISNULL(SUM(system_cut),0) AS systemRevenue FROM Payments`);
        res.json({ systemRevenue: result.recordset[0].systemRevenue });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Export all functions
module.exports = {
    createPaymentIntent,
    handlePaymentWebhook,
    getInstructorRevenue,
    getAdminRevenue
};
