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


