import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Authentication/AuthContext';
import { dashboard, expenses, trend } from '../../Utils/Icons';

function Navigation() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlNavbar = useCallback(() => {
        if (typeof window !== 'undefined') {
            if (window.scrollY === 0 || window.scrollY < lastScrollY) {
                setIsVisible(true);
            } else if (window.scrollY > lastScrollY) {
                setIsVisible(false);
            }
            setLastScrollY(window.scrollY);
        }
    }, [lastScrollY]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);
            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [controlNavbar]);

    const signOut = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav 
            className={`fixed top-0 left-0 right-0 bg-[#1A1A1A] border-b border-gray-800 px-3 py-2 z-50 transition-transform duration-300 ${
                isVisible ? 'translate-y-0' : '-translate-y-full'
            } hover:translate-y-0`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img 
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                        alt="user avatar"
                        className="w-9 h-9 rounded-full border-2 border-purple-500"
                    />
                    <div>
                        <h4 className="text-white text-base font-medium">{user?.name || 'User'}</h4>
                        <p className="text-gray-400 text-sm">My Money</p>
                    </div>
                </div>

                <ul className="flex items-center gap-1">
                    <li>
                        <NavLink 
                            to="/dashboard" 
                            className={({ isActive }) => 
                                `flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-colors text-base ${
                                    isActive 
                                        ? 'bg-purple-600 text-white' 
                                        : 'text-gray-400 hover:bg-dark-200 hover:text-white'
                                }`
                            }
                        >
                            {dashboard} Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/incomes" 
                            className={({ isActive }) => 
                                `flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-colors text-base ${
                                    isActive 
                                        ? 'bg-purple-600 text-white' 
                                        : 'text-gray-400 hover:bg-dark-200 hover:text-white'
                                }`
                            }
                        >
                            {trend} Incomes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/expenses" 
                            className={({ isActive }) => 
                                `flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-colors text-base ${
                                    isActive 
                                        ? 'bg-purple-600 text-white' 
                                        : 'text-gray-400 hover:bg-dark-200 hover:text-white'
                                }`
                            }
                        >
                            {expenses} Expenses
                        </NavLink>
                    </li>
                    <li>
                        <button 
                            onClick={signOut}
                            className="flex items-center gap-2 px-3.5 py-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors text-base ml-1"
                        >
                            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign Out
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;
