import { getUserByEmail } from "../services/userService.js";

export const getSubscriptionStatus = async (req, res) => {
  try {
    const { email } = req.user;

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User data retrieved",
      data: { status: user.subscription || "basic" }, // fallback if null
    });
  } catch (error) {
    console.error("Error in getSubscriptionStatus:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
