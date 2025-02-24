const express = require('express');
const cors = require('cors');
const { readdirSync } = require('fs');
require('dotenv').config();
const db = require('./db/db');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');

const app = express();
const PORT = process.env.PORT || 5000; // Default to 5000 if not set

// ✅ Connect to Database before starting the server
db();

// ✅ Middleware Setup
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003','https://expense-tracker-web-app-delta.vercel.app/'],
    credentials: true // Allow cookies
}));

// ✅ Home Route
app.get('/', (req, res) => {
    res.send('Welcome to the Expense Tracker API');
});

// ✅ Auth Routes (Public)
app.use('/api/auth', authRoutes);

// ✅ Load Other Routes Dynamically
readdirSync('./routes').forEach((file) => {
    if (file.endsWith('.js') && file !== 'auth.js') { // ✅ Avoid loading auth.js twice
        const route = require(`./routes/${file}`);
        app.use('/api', route); // ✅ Changed from `/api/v1` to `/api`
    }
});

// ✅ Start Server
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
