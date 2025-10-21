import User from "../models/User.js";
import Department from "../models/Department.js";
import Address from "../models/Address.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: [0, 1] } })
      .populate("department", "name description")
      .populate("address", "HouseAddress City State Country")
      .select("-password")
      .sort({ createdAt: -1 });

    if (users.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No users found (excluding admins)",
        count: 0,
        users: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Citizens and government agents fetched successfully",
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching users",
    });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, department } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }


    if (user.role === 2) {
      return res
        .status(403)
        .json({ success: false, message: "Cannot modify another admin" });
    }

    if (department) {
      const depExists = await Department.findById(department);
      if (!depExists) {
        return res.status(400).json({ success: false, message: "Invalid department ID" });
      }
      user.department = department;
    }

    
    if (role !== undefined) {
      if (![0, 1, 2].includes(role)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid role value (0, 1, or 2)" });
      }
      user.role = role;
    }

    await user.save();

    const updatedUser = await User.findById(user._id)
      .populate("department", "name description")
      .select("-password");

    res.status(200).json({
      success: true,
      message: "User details updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating user",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user._id.toString() === id) {
      return res.status(400).json({ message: "Admins cannot delete themselves" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === 2) {
      return res.status(403).json({ message: "Cannot delete another admin" });
    }

    await user.deleteOne();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

