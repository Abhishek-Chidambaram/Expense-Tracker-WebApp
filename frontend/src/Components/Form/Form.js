import React, { useState } from 'react';
import { plus } from '../../Utils/Icons';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { useGlobalContext } from "../../Context/globalContext";

const Form = () => {
    const { addIncome, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        category: '',
        description: '',
    });
    const [selected, setSelected] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!inputState.title || !inputState.amount || !selected || !inputState.category) {
            setError('Please fill in all required fields');
            return;
        }

        try {
            const formattedAmount = parseFloat(inputState.amount);
            if (isNaN(formattedAmount) || formattedAmount <= 0) {
                setError('Amount must be a positive number');
                return;
            }

            const income = {
                ...inputState,
                amount: formattedAmount,
                date: format(selected, 'yyyy-MM-dd')
            };

            await addIncome(income);
            setInputState({
                title: '',
                amount: '',
                category: '',
                description: '',
            });
            setSelected(null);
            setShowCalendar(false);
            setError('');
        } catch (err) {
            console.error('Error adding income:', err);
            setError(err.message || 'Failed to add income');
        }
    };

    const handleInput = (name) => (e) => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
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
                    value={inputState.title}
                    name={'title'}
                    placeholder="Income Title"
                    onChange={handleInput('title')}
                    className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                />

                <input 
                    type="number"
                    value={inputState.amount}
                    name={'amount'}
                    placeholder="Income Amount"
                    onChange={handleInput('amount')}
                    step="0.01"
                    min="0"
                    className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                />

                <div className="relative">
                    <input 
                        type="text"
                        value={selected ? format(selected, 'dd/MM/yyyy') : ''}
                        placeholder="Select a date"
                        onClick={() => setShowCalendar(!showCalendar)}
                        readOnly
                        className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 cursor-pointer"
                    />
                    {showCalendar && (
                        <div className="absolute top-full left-0 mt-2 z-50 bg-dark-100 border border-gray-700 rounded-lg shadow-xl">
                            <DayPicker
                                mode="single"
                                selected={selected}
                                onSelect={(date) => {
                                    setSelected(date);
                                    setShowCalendar(false);
                                }}
                                className="dark-calendar"
                            />
                        </div>
                    )}
                </div>

                <select 
                    required 
                    value={inputState.category} 
                    name="category" 
                    onChange={handleInput('category')}
                    className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                    <option value="" disabled>Select Option</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Crypto</option>
                    <option value="bank">Bank Transfer</option>  
                    <option value="other">Other</option>
                </select>

                <textarea
                    value={inputState.description}
                    name="description"
                    placeholder="Add A Description"
                    onChange={handleInput('description')}
                    className="w-full bg-dark-200 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors resize-none h-32"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
                <span>{plus}</span>
                Add Income
            </button>
        </form>
    );
};

export default Form;