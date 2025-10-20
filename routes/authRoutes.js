import express from "express";
import { registerUser, loginUser, getMe } from "../controllers/authController.js";
import { signupValidation, loginValidation } from "../middlewares/validationMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupValidation, registerUser);
router.post("/login", loginValidation, loginUser);

router.get("/me", protect, getMe);

export default router;
