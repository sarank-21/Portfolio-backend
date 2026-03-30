require('dotenv').config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email transporter (Gmail example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,    // 👈 EMAIL from .env
    pass: process.env.PASSWORD  // 👈 APP PASSWORD from .env
  },
  tls: { rejectUnauthorized: false }
});

app.post("/send", async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Respond immediately
    res.status(200).json({ success: true });

    // Send email in background
    try {
        await transporter.sendMail({
            from: email,
            to: process.env.EMAIL,
            subject: subject,
            text: `
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}
            `
        });
    } catch (error) {
        console.error(error);
    }
});

// Start server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});

