// server.js
const express = require("express");
const path = require("path");
const app = express();

// Use Render's PORT (important for deployment)
const PORT = process.env.PORT || 5000;

// Serve all static files (html, css, js, images, etc.) from "public"
app.use(express.static(path.join(__dirname, "public")));

// Middleware to handle JSON requests
app.use(express.json());

// Set your registration deadline
const deadline = new Date("August 31, 2025 23:59:59").getTime();

// Countdown API endpoint
app.get("/countdown", (req, res) => {
  const now = Date.now();
  const distance = deadline - now;
  res.json({ distance });
});

// Serve index.html when visiting "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
