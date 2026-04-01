import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized - token not provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID from token payload
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "failed",
        message: "Session expired - please log in again",
      });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized - invalid token",
      });
    }
    return res.status(500).json({
      status: "error",
      message: "Server error during authentication",
    });
  }
};
