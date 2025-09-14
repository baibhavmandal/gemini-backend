import { getUserByEmail } from "../services/userService.js";

const userMeController = async (req, res) => {
  const { email } = req.user;
  try {
    const user = await getUserByEmail(email);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const { password, ...safeUser } = user;
    res.status(200).json({
      success: true,
      message: "User details retrived successfully",
      data: safeUser,
    });
  } catch (error) {
    console.error("User me", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default userMeController;
