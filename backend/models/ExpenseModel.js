const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true,
        min: 0, // Ensures amount is never negative
    },
    type: {
        type: String,
        default: 'expense',
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
        enum: ['education', 'groceries', 'health', 'subscriptions', 'takeaways', 'clothing', 'travelling', 'other'] // Restricts categories
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100 // Increased for better description length
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);
