const jwt = require ("jsonwebtoken");
const dotenv = require ("dotenv");
dotenv.config();
// Define the middleware function
const authMiddleware = (req, res, next) => {
    // 1. Check for Authorization header
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
    
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        // 2. Verify the token using the secret key from environment variables
        // NOTE: The process.env.JWT_SECRET must be defined
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Attach user ID and role to the request object
        req.userId = decoded.id;
        req.role = decoded.role;
        
        // 4. Proceed to the next middleware or route handler
        next();
    } catch (err) {
        // Handle invalid or expired token
        res.status(401).json({ message: "Token is not valid" });
    }
};

// Export the middleware function using CommonJS module.exports
module.exports = authMiddleware;