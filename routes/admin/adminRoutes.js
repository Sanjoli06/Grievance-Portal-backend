import express from "express";
import { adminOnly, protect } from "../../middlewares/authMiddleware.js";
import { deleteUser, getAllUsers, updateUserDetails } from "../../controllers/adminController.js";

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);
router.put("/users/:id", protect, adminOnly, updateUserDetails);
router.delete("/users/:id", protect, adminOnly, deleteUser);

export default router;
