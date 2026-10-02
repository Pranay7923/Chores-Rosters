const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Chore Roster Backend is Running!");
});

// Routes
app.use("/api/flatmates", require("./routes/flatmateRoutes"));
app.use("/api/chores", require("./routes/choreRoutes"));
app.use("/api/assignments", require("./routes/assignmentRoutes"));
app.use("/api/leave", require("./routes/leaveRoutes"));

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});