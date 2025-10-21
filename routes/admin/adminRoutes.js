import express from "express";
import { adminOnly, protect } from "../../middlewares/authMiddleware.js";
import { getAllUsers } from "../../controllers/adminController.js";

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);

export default router;
