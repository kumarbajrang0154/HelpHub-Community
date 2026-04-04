import express from "express";
import {
  createRequest,
  getUserRequests
} from "../controllers/requestController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// create request
router.post("/create", authMiddleware, createRequest);

// get logged-in user requests
router.get("/my", authMiddleware, getUserRequests);

export default router;