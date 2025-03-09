require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const expenseRoutes = require("./routes/expenseRoutes");
app.use("/api/expenses",expenseRoutes);

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Consider restricting origins for security
app.use(express.json());
app.use(morgan("dev")); // Logs HTTP requests

// Check if environment variables are loaded
if (!process.env.MONGO_URI) {
    console.error("❌ MongoDB URI is missing! Add MONGO_URI in .env file.");
    process.exit(1);
}

// Connect to MongoDB Atlas
mongoose
    .connect(process.env.MONGO_URI, { 
        serverSelectionTimeoutMS: 5000,  // Handles connection timeout errors
    })
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    });

// Import Expense Routes
const expenseRoutes = require("./routes/expenseRoutes");
app.use("/api/expenses", expenseRoutes); // ✅ Correct API endpoint

// Basic Route
app.get("/", (req, res) => {
    res.send("🚀 Expense Manager API is running...");
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("🔥 Error:", err.stack);
    res.status(500).json({ message: err.message || "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
