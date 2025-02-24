import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { motion } from "framer-motion";
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";

const API_URL = "http://localhost:5000/api/auth";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        await login(data.token, data.user);
        navigate("/dashboard", { replace: true });
      } else {
        throw new Error("No token received");
      }
    } catch (err) {
      setError(err.message || "Server error. Please try again.");
    }
  };

  return (
      <div className={`flex h-screen overflow-hidden transition-all duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
        <button
            className={`absolute top-4 right-4 p-2 rounded-full transition-all ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-500' : 'bg-gray-300 text-black hover:bg-gray-400'}`}
            onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '🌞' : '🌙'}
        </button>
        <div className="flex flex-col items-center justify-center w-1/3 p-8">
          <motion.h1
              className={`text-5xl font-bold bg-clip-text text-transparent ${darkMode ? 'bg-gradient-to-r from-purple-400 to-pink-600' : 'bg-gradient-to-r from-blue-400 to-green-600'}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
          >
            Welcome
          </motion.h1>
          <motion.p
              className={`mt-4 text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
          >
            Manage your expenses with ease.
          </motion.p>
        </div>

        <div className={`w-2/3 flex items-center justify-center transition-all ${darkMode ? 'bg-gradient-to-br from-purple-900 to-indigo-900' : 'bg-gradient-to-br from-blue-200 to-green-300'}`}>
          <form className={`p-8 rounded-lg shadow-lg w-96 border transition-all ${darkMode ? 'bg-gray-800 bg-opacity-40 backdrop-blur border-gray-600' : 'bg-white border-gray-400'}`} onSubmit={handleSubmit}>
            <div className="flex items-center border-b py-2 mb-4 transition-all hover:border-blue-500 focus-within:border-green-400">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="flex-1 bg-transparent border-none focus:outline-none"
                  onChange={handleChange}
                  required
              />
            </div>

            <div className="flex items-center border-b py-2 mb-6 transition-all hover:border-blue-500 focus-within:border-green-400 relative">
              <FaLock className="text-gray-400 mr-2" />
              <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="flex-1 bg-transparent border-none focus:outline-none"
                  onChange={handleChange}
                  required
              />
              <button
                  type="button"
                  className="absolute right-2 text-gray-400 hover:text-black"
                  onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <motion.button
                type="submit"
                className={`w-full py-3 text-lg font-semibold rounded-lg shadow-lg transition-all ${darkMode ? 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600' : 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>

            <div className="text-center mt-4">
              <Link to="/signup" className={`text-sm transition-all ${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-blue-500 hover:text-blue-400'}`}>
                Don't have an account? Sign Up
              </Link>
            </div>

            {error && <motion.p className={`mt-4 text-center ${darkMode ? 'text-red-400' : 'text-red-600'}`} animate={{ x: [-5, 5, -5, 0] }} transition={{ duration: 0.3 }}>
              {error}
            </motion.p>}
          </form>
        </div>
      </div>
  );
};

export default Login;
