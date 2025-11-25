const jwt = require ("jsonwebtoken");
const dotenv = require ("dotenv");
const router = require("../routes/instructorRoute");
dotenv.config();

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = router;
