import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../Context/globalContext';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import { motion } from 'framer-motion';

function Income() {
    const { incomes = [], getIncomes, deleteIncome, totalIncome, user } = useGlobalContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            getIncomes().then(() => setLoading(false));
        }
    }, [user, getIncomes]);

    return (
        <div className="w-full min-h-screen bg-[#111111] pt-24 px-4 pb-4 md:pt-28 md:px-8 md:pb-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">Incomes</h1>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#1A1A1A] p-6 rounded-xl border border-gray-800 mb-8"
                >
                    <h2 className="text-2xl font-bold text-green-500">
                        Total Income: <span className="text-white">₹{totalIncome()}</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="order-2 lg:order-1">
                        {loading ? (
                            <div className="text-gray-400">Loading incomes...</div>
                        ) : incomes?.length > 0 ? (
                            <div className="space-y-4">
                                {incomes.map((income) => (
                                    <motion.div
                                        key={income._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        <IncomeItem
                                            {...income}
                                            indicatorColor="var(--color-green)"
                                            deleteItem={deleteIncome}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-gray-400">No incomes found.</div>
                        )}
                    </div>
                    
                    <div className="order-1 lg:order-2">
                        <Form />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Income;
