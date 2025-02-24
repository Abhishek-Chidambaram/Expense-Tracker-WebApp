const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const authMiddleware = require("../middleware/auth");
const { loginUser, signupUser } = require("../controllers/authController");
require("dotenv").config();

const router = express.Router();

// ✅ Secure Signup Route (Sends Token in Cookie)
router.post("/signup", signupUser);

// ✅ Secure Login Route (Sends Token in Cookie)
router.post("/login", loginUser);

// ✅ Logout Route (Clears Token)
router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
});

// ✅ Get Logged-in User Details
router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
