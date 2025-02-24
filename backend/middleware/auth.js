const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
    const authHeader = req.header("Authorization");

    // Check if Authorization header is present and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Extract token after "Bearer "
    const token = authHeader.split(" ")[1];

    try {
        // Verify token using JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded user ID to request object
        req.user = { id: decoded.id };

        // Proceed to the next middleware
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }
        res.status(401).json({ message: "Token is not valid" });
    }
};
