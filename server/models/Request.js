// models/Request.js

import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: String,
  description: String,
  file: String,
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending"
  }
}, { timestamps: true });

export default mongoose.model("Request", requestSchema);