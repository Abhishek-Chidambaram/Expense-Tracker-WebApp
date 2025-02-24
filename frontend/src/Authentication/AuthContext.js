import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
    }, []);

    const verifyToken = useCallback(async () => {
        const currentToken = localStorage.getItem('token');
        if (!currentToken) {
            handleLogout();
            return false;
        }

        try {
            const response = await axios.get('http://localhost:5000/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${currentToken}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.status === 200 && response.data) {
                setUser(response.data);
                setToken(currentToken);
                setIsAuthenticated(true);
                return true;
            } else {
                handleLogout();
                return false;
            }
        } catch (error) {
            console.error('Auth verification failed:', error);
            handleLogout();
            return false;
        } finally {
            setLoading(false);
        }
    }, [handleLogout]);

    const login = async (newToken, userData) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(userData);
        setIsAuthenticated(true);
        await verifyToken();
    };

    useEffect(() => {
        verifyToken();
    }, [verifyToken]);

    return (
        <AuthContext.Provider value={{ 
            token, 
            user, 
            loading, 
            login, 
            logout: handleLogout,
            isAuthenticated,
            verifyToken
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
