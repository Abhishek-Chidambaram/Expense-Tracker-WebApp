import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate,Outlet } from "react-router-dom";
import styled from "styled-components";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Expenses from "./Components/Expenses/Expenses";
import Income from "./Components/Incomes/Income";
import Login from "./Authentication/Login";
import Signup from "./Authentication/SignUp";
import { useAuth } from './Authentication/AuthContext';
import { ThemeProvider } from './Styles/ThemeProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

// ✅ Fetch user data before rendering protected pages
const ProtectedRoute = ({ children }) => {
    const { user, loading, isAuthenticated } = useAuth();
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

// ✅ Dynamic Navigation Highlight Based on Route
const AuthenticatedLayout = () => {
    return (
        <>
            <Navigation />
            <main>
                <Outlet />
            </main>
        </>
    );
};

function App() {
    return (
        <ThemeProvider>
            <AppStyled className="App">
                <Router>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        {/* Protected Routes */}
                        <Route element={<ProtectedRoute><AuthenticatedLayout /></ProtectedRoute>}>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/incomes" element={<Income />} />
                            <Route path="/expenses" element={<Expenses />} />
                        </Route>

                        {/* Redirect all unknown routes to dashboard */}
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                </Router>
            </AppStyled>
        </ThemeProvider>
    );
}

const AppStyled = styled.div`
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;

    .main-content {
        flex: 1;
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
    }
`;

export default App;
