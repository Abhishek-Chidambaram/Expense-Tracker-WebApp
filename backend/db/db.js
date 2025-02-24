const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('❌ Database connection error:', error.message);
        process.exit(1); // Exit process if DB connection fails
    }
};

module.exports = db;
