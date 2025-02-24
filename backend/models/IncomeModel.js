const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true,
        min: 0 // Prevents negative income amounts
    },
    type: {
        type: String,
        default: 'income',
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
        enum: ['salary', 'freelancing', 'investments', 'stocks', 'bitcoin', 'bank', 'other'] // Updated to match Form options
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100 // Allows slightly longer descriptions
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Income', IncomeSchema);
