import React, { useState } from 'react';
import { useGlobalContext } from '../../Context/globalContext';
import { plus } from '../../Utils/Icons';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

function ExpenseForm() {
    const { addExpense, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: null,
        category: '',
        description: '',
    });
    const [showDatePicker, setShowDatePicker] = useState(false);

    const { title, amount, date, category, description } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    };

    const handleSubmit = e => {
        e.preventDefault();

        // ✅ Form Validation Before Submission
        if (!title || !amount || !date || !category) {
            setError("All fields are required!");
            return;
        }

        if (isNaN(amount) || amount <= 0) {
            setError("Amount must be a positive number!");
            return;
        }

        addExpense(inputState);
        setInputState({
            title: '',
            amount: '',
            date: null,
            category: '',
            description: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-dark-100 p-8 rounded-2xl border border-gray-800">
            {error && (
                <p className="text-red-500 text-sm flex items-center gap-2 bg-red-500/10 p-3 rounded-lg">
                    ⚠️ {error}
                </p>
            )}
            
            <div className="space-y-4">
                <input
                    type="text"
                    value={title}
                    name="title"
                    placeholder="Expense Title"
                    onChange={handleInput('title')}
                    required
                    className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                />
                
                <input
                    value={amount}
                    type="number"
                    name="amount"
                    placeholder="Expense Amount"
                    onChange={handleInput('amount')}
                    required
                    className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                />
                
                <div className="relative">
                    <input
                        type="text"
                        value={date ? format(date, 'dd/MM/yyyy') : ''}
                        placeholder="Select Date"
                        onClick={() => setShowDatePicker(!showDatePicker)}
                        readOnly
                        className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 cursor-pointer"
                    />
                    {showDatePicker && (
                        <div className="absolute top-full left-0 mt-2 z-50 bg-dark-100 border border-gray-700 rounded-lg shadow-xl">
                            <DayPicker
                                mode="single"
                                selected={date}
                                onSelect={(selectedDate) => {
                                    setInputState({ ...inputState, date: selectedDate });
                                    setShowDatePicker(false);
                                }}
                                className="dark-calendar"
                            />
                        </div>
                    )}
                </div>

                <select 
                    required 
                    value={category} 
                    name="category" 
                    onChange={handleInput('category')}
                    className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                    <option value="" disabled>Select Category</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>
                    <option value="travelling">Travelling</option>
                    <option value="other">Other</option>
                </select>

                <textarea
                    name="description"
                    value={description}
                    placeholder="Add A Reference"
                    onChange={handleInput('description')}
                    className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors resize-none h-32"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
                <span>{plus}</span>
                Add Expense
            </button>
        </form>
    );
}

export default ExpenseForm;
