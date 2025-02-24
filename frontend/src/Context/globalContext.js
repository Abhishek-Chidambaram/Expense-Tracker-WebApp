import React, { useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from '../Authentication/AuthContext';

const BASE_URL = "https://expense-tracker-webapp-anva.onrender.com";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);
    const { isAuthenticated, user } = useAuth();
    
    const getAuthHeaders = useCallback(() => {
        const currentToken = localStorage.getItem('token');
        if (!currentToken) {
            console.log("No token found");
            return null;
        }

        return { 
            headers: { 
                Authorization: `Bearer ${currentToken}`,
                'Content-Type': 'application/json'
            } 
        };  
    }, []);

    const getIncomes = useCallback(async () => {
        try {
            const headers = getAuthHeaders();
            if (!headers) return;
            
            const response = await axios.get(
                `${BASE_URL}get-incomes`,
                headers
            );
            setIncomes(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Error fetching incomes");
        }
    }, [getAuthHeaders]);

    const getExpenses = useCallback(async () => {
        try {
            const headers = getAuthHeaders();
            if (!headers) return;
            
            const response = await axios.get(
                `${BASE_URL}get-expenses`,
                headers
            );
            setExpenses(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Error fetching expenses");
        }
    }, [getAuthHeaders]);

    const addIncome = useCallback(async (income) => {
        try {
            const headers = getAuthHeaders();
            if (!headers) throw new Error("No authentication token found");
            
            const response = await axios.post(
                `${BASE_URL}add-income`,
                income,
                headers
            );
            
            setIncomes([...incomes, response.data]);
            getIncomes(); // Refresh the list
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Error adding income";
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    }, [getAuthHeaders, incomes, getIncomes]);

    const deleteIncome = useCallback(async (id) => {
        try {
            const headers = getAuthHeaders();
            if (!headers) return;
            
            await axios.delete(
                `${BASE_URL}delete-income/${id}`,
                headers
            );
            await getIncomes();
        } catch (err) {
            setError(err.response?.data?.message || "Error deleting income");
        }
    }, [getAuthHeaders, getIncomes]);

    const addExpense = useCallback(async (expense) => {
        try {
            const headers = getAuthHeaders();
            if (!headers) return;
            
            await axios.post(
                `${BASE_URL}add-expense`,
                expense,
                headers
            );
            await getExpenses();
        } catch (err) {
            setError(err.response?.data?.message || "Error adding expense");
        }
    }, [getAuthHeaders, getExpenses]);

    const deleteExpense = useCallback(async (id) => {
        try {
            const headers = getAuthHeaders();
            if (!headers) return;
            
            await axios.delete(
                `${BASE_URL}delete-expense/${id}`,
                headers
            );
            await getExpenses();
        } catch (err) {
            setError(err.response?.data?.message || "Error deleting expense");
        }
    }, [getAuthHeaders, getExpenses]);

    useEffect(() => {
        if (isAuthenticated) {
            getIncomes();
            getExpenses();
        }
    }, [isAuthenticated, getIncomes, getExpenses]);

    const totalIncome = useCallback(() => {
        return incomes.reduce((total, income) => total + income.amount, 0);
    }, [incomes]);

    const totalExpenses = useCallback(() => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    }, [expenses]);

    const totalBalance = useCallback(() => {
        return totalIncome() - totalExpenses();
    }, [totalIncome, totalExpenses]);

    const transactionHistory = useCallback(() => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.date) - new Date(a.date));
        return history.slice(0, 3);
    }, [incomes, expenses]);

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            addExpense,
            getExpenses,
            expenses,
            deleteExpense,
            totalIncome,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError,
            user
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
