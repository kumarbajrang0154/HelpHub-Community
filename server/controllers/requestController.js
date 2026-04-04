import Request from "../models/Request.js";

// ✅ CREATE REQUEST
export const createRequest = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newRequest = new Request({
      user: req.user.id,
      title,
      description,
      file: req.file?.path
    });

    await newRequest.save();

    res.status(201).json({
      success: true,
      message: "Request submitted"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET USER REQUESTS (👉 YEHI TERA QUESTION THA)
export const getUserRequests = async (req, res) => {
  try {
    const requests = await Request.find({ user: req.user.id });

    res.json({
      success: true,
      requests
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};