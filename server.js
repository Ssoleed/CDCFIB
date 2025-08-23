// server.js
const express = require("express");
const path = require("path");
const axios = require("axios");
require("dotenv").config(); // for PAYSTACK_SECRET_KEY

const app = express();
const PORT = process.env.PORT || 5000;

// ==== Middleware ====
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==== Deadline for Countdown ====
const deadline = Date.now() + 7 * 24 * 60 * 60 * 1000;

app.get("/countdown", (req, res) => {
  const now = Date.now();
  const distance = deadline - now;
  res.json({ distance });
});

// ==== Registration Route ====
app.post("/register", (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  // For now, just log registration (later you can save in DB or file)
  console.log("✅ New Registration:", { name, email, phone });

  res.json({
    success: true,
    message: "Registration successful. Proceeding to payment...",
  });
});

// ==== Paystack Payment Route ====
app.post("/payment", async (req, res) => {
  const { email, amount } = req.body;

  if (!email || !amount) {
    return res.status(400).json({ success: false, message: "Email and amount required." });
  }

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100, // Paystack works in kobo (₦1 = 100 kobo)
        callback_url: `https://${req.hostname}/payment/callback`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("💰 Payment Init:", response.data);

    res.json(response.data);
  } catch (error) {
    console.error("❌ Payment Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Payment initialization failed.",
    });
  }
});

// ==== Payment Callback (optional) ====
app.get("/payment/callback", (req, res) => {
  // Paystack will redirect here after payment
  res.sendFile(path.join(__dirname, "public", "success.html")); // Create a success.html page
});

// ==== Serve index.html ====
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ==== Start Server ====
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
