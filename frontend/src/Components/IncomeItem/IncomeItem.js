import React from 'react';
import { dateFormat } from '../../Utils/dateFormat';
import { bitcoin, book, calender, card, circle, clothing, comment,food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt, rupee } from '../../Utils/Icons';

function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type
}) {
    const categoryIcon = () => {
        switch(category) {
            case 'salary': return money;
            case 'freelancing': return freelance;
            case 'investments': return stocks;
            case 'stocks': return users;
            case 'bitcoin': return bitcoin;
            case 'bank': return card;
            case 'youtube': return yt;
            case 'other': return piggy;
            default: return circle;
        }
    };

    const expenseCatIcon = () => {
        switch (category) {
            case 'education': return book;
            case 'groceries': return food;
            case 'health': return medical;
            case 'subscriptions': return tv;
            case 'takeaways': return takeaway;
            case 'clothing': return clothing;
            case 'travelling': return freelance;
            case 'other': return circle;
            default: return circle;
        }
    };

    return (
        <div className="flex items-center gap-4 bg-dark-200 p-4 rounded-xl border border-gray-800 hover:bg-dark-300 transition-colors">
            <div className="w-12 h-12 rounded-full bg-dark-100 flex items-center justify-center text-2xl border border-gray-700">
                {type === 'expense' ? expenseCatIcon() : categoryIcon()}
            </div>
            
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full`} style={{backgroundColor: indicatorColor}}></div>
                    <h4 className="text-white font-medium">{title}</h4>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-4 text-gray-400">
                        <span className="flex items-center gap-1">{rupee} {amount}</span>
                        <span className="flex items-center gap-1">{calender} {dateFormat(date)}</span>
                        <span className="flex items-center gap-1">{comment} {description}</span>
                    </div>
                    
                    <button
                        onClick={() => deleteItem(id)}
                        className="p-2 rounded-full hover:bg-red-500/10 text-red-500 transition-colors"
                    >
                        {trash}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default IncomeItem;
