import React, { useEffect } from 'react';
import * as XLSX from 'xlsx';
import { motion } from 'framer-motion';
import { useGlobalContext } from '../../Context/globalContext';
import Chart from '../Chart/Chart';
import { dateFormat } from '../../Utils/dateFormat';

function Dashboard() {
    const { totalExpenses, totalIncome, totalBalance, getIncomes, getExpenses, transactionHistory } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, [getIncomes, getExpenses]);

    const history = transactionHistory();

    // Function to export data to Excel
    const exportToExcel = () => {
        const formattedData = history.map(item => ({
            Date: dateFormat(item.date),
            Title: item.title,
            Type: item.type === 'expense' ? 'Expense' : 'Income',
            Amount: `₹${item.amount}`
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

        XLSX.writeFile(workbook, "User_Transactions.xlsx");
    };

    return (
        <div className="w-full min-h-screen bg-[#111111] pt-24 px-4 pb-4 md:pt-28 md:px-8 md:pb-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <h1 className="text-3xl font-bold text-white">My Money</h1>
                    <div className="bg-[#1A1A1A] px-4 py-2 rounded-lg">
                        <span className="text-gray-400">{dateFormat(new Date())}</span>
                    </div>
                </div>

                {/* Download Button */}
                <div className="flex justify-end mb-4">
                    <button
                        onClick={exportToExcel}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
                    >
                        📥 Download Excel
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#1A1A1A] p-6 rounded-xl border border-gray-800"
                    >
                        <h3 className="text-indigo-500 text-lg mb-2">Total Income</h3>
                        <p className="text-2xl font-bold text-white">₹{totalIncome()}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-[#1A1A1A] p-6 rounded-xl border border-gray-800"
                    >
                        <h3 className="text-red-500 text-lg mb-2">Total Expense</h3>
                        <p className="text-2xl font-bold text-white">₹{totalExpenses()}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#1A1A1A] p-6 rounded-xl border border-gray-800"
                    >
                        <h3 className="text-green-500 text-lg mb-2">Balance</h3>
                        <p className="text-2xl font-bold text-white">₹{totalBalance()}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-[#1A1A1A] p-6 rounded-xl border border-gray-800"
                    >
                        <h3 className="text-purple-500 text-lg mb-2">Recent Activity</h3>
                        <p className="text-2xl font-bold text-white">{history.length} transactions</p>
                    </motion.div>
                </div>

                {/* Chart and Transactions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-[#1A1A1A] p-6 rounded-xl border border-gray-800">
                        <h3 className="text-xl font-bold text-white mb-6">Overview</h3>
                        <div className="h-[400px] w-full">
                            <Chart />
                        </div>
                    </div>

                    <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gray-800">
                        <h3 className="text-xl font-bold text-white mb-6">Recent Transactions</h3>
                        <div className="space-y-4">
                            {history.map((item) => (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center justify-between p-4 bg-[#222222] rounded-lg hover:bg-[#2A2A2A] transition-all duration-300"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                            item.type === 'expense' ? 'bg-red-500/10' : 'bg-green-500/10'
                                        }`}>
                                            {item.type === 'expense' ? (
                                                <i className="fa-solid fa-arrow-up text-red-500"></i>
                                            ) : (
                                                <i className="fa-solid fa-arrow-down text-green-500"></i>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">{item.title}</h4>
                                            <p className="text-gray-400 text-sm">{dateFormat(item.date)}</p>
                                        </div>
                                    </div>
                                    <span className={`font-semibold ${
                                        item.type === 'expense' ? 'text-red-500' : 'text-green-500'
                                    }`}>
                                        {item.type === 'expense' ? '-' : '+'}₹{item.amount}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
