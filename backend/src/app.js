const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const connectDB = require("./configs/db");
const router = require("./routers/index");
require("dotenv").config();

const app = express();

const allowedOrigins = ["http://localhost:3000", "http://localhost:3005"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Cho phép request không có origin (ví dụ: từ Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", router);

// Serve static files (optional)
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
