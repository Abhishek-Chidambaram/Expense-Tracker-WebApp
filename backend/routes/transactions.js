const express = require("express");
const { addIncome, getIncome, deleteIncome } = require("../controllers/income");
const { addExpense, getExpense, deleteExpense } = require("../controllers/expense");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// ✅ Income Routes
router.post('/add-income', authMiddleware, addIncome);
router.get('/get-incomes', authMiddleware, getIncome);
router.delete('/delete-income/:id', authMiddleware, async (req, res, next) => {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid income ID format" });
    }
    next();
}, deleteIncome);

// ✅ Expense Routes
router.post('/add-expense', authMiddleware, addExpense);
router.get('/get-expenses', authMiddleware, getExpense);
router.delete('/delete-expense/:id', authMiddleware, async (req, res, next) => {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid expense ID format" });
    }
    next();
}, deleteExpense);

module.exports = router;
