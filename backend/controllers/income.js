const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const userId = req.user.id;

    try {
        // Validate required fields
        if (!title?.trim()) {
            return res.status(400).json({ message: "Title is required" });
        }
        if (!category?.trim()) {
            return res.status(400).json({ message: "Category is required" });
        }
        if (!description?.trim()) {
            return res.status(400).json({ message: "Description is required" });
        }
        if (!date) {
            return res.status(400).json({ message: "Date is required" });
        }

        // Validate amount
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            return res.status(400).json({ message: "Amount must be a positive number" });
        }

        // Validate date format
        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        // Create and save income
        const income = new IncomeSchema({
            title: title.trim(),
            amount: parsedAmount,
            category: category.trim(),
            description: description.trim(),
            date: dateObj,
            user: userId
        });

        const savedIncome = await income.save();
        res.status(200).json(savedIncome);
    } catch (error) {
        console.error('Error adding income:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: "Validation Error", 
                errors: Object.values(error.errors).map(err => err.message) 
            });
        }
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.getIncome = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        const income = await IncomeSchema.findOne({ _id: id, user: req.user.id });

        if (!income) {
            return res.status(404).json({ message: "Income not found or unauthorized" });
        }

        await IncomeSchema.findByIdAndDelete(id);
        res.status(200).json({ message: "Income Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
