import express from "express";
import { adminOnly, protect } from "../../middlewares/authMiddleware.js";
import { deleteUser, getAllUsers, updateUserDetails, createDepartment, getAllDepartments } from "../../controllers/adminController.js";

const router = express.Router();

router.get("/users", protect,adminOnly, getAllUsers);
router.put("/users/:id", protect, adminOnly, updateUserDetails);
router.delete("/users/:id", protect, adminOnly, deleteUser);
router.post("/departments",protect,adminOnly,createDepartment);     
router.get("/departments",protect,adminOnly, getAllDepartments);  

export default router;
