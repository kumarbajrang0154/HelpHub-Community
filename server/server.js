import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import requestRoutes from "./routes/requestRoutes.js";

dotenv.config();

// ✅ FIRST create app
const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes (NOW correct position)
app.use("/api/request", requestRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// ✅ DB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ✅ Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});