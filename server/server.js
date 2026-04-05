const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");

const requestRoutes = require("./routes/requestRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

// Initialize passport config
require("./config/passport");

const app = express();

// CORS configuration for OAuth
const corsOptions = {
  origin: ["http://localhost:5175", "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Session middleware (required for passport)
app.use(
  session({
    secret: process.env.JWT_SECRET, // Use JWT secret for session
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/api/request", requestRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});