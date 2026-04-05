const express = require("express");
const {
  createRequest,
  getUserRequests
} = require("../controllers/requestController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// create request
router.post("/create", authMiddleware, createRequest);

// get logged-in user requests
router.get("/my", authMiddleware, getUserRequests);

module.exports = router;