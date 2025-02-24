const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const userId = req.user.id;

    if (!title || !category || !description || !date || amount === undefined) {
        return res.status(400).json({ message: "All Fields are Required!!" });
    }

    if (amount <= 0 || isNaN(amount)) {
        return res.status(400).json({ message: "Amount must be a positive number!" });
    }

    try {
        const expense = new ExpenseSchema({
            title,
            amount,
            category,
            description,
            date,
            user: userId
        });

        await expense.save();
        res.status(200).json({ message: "Expense Added Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.getExpense = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await ExpenseSchema.findOne({ _id: id, user: req.user.id });

        if (!expense) {
            return res.status(404).json({ message: "Expense not found or unauthorized" });
        }

        await ExpenseSchema.findByIdAndDelete(id);
        res.status(200).json({ message: "Expense Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};