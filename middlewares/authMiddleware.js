import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

export const protect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      }

      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, no token provided" });
    }
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 2) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied: Admins only",
    });
  }
};


export const agentOrAdminOnly = (req, res, next) => {
  if (req.user && (req.user.role === 1 || req.user.role === 2)) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied: Agents or Admins only",
    });
  }
};
