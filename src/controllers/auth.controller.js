import {
  createUser,
  getUserByEmail,
  changeUserPassword,
} from "../services/userService.js";
import { sendOtp, verifyOtp } from "../services/otpService.js";
import { generateToken } from "../services/jwtService.js";
import { hashPassword, comparePassword } from "../utils/hash.js";

export const signupController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const user = await createUser(email, hashedPassword);
    res.status(201).json({
      success: true,
      message: "User registered",
      data: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error("Signup", error);
    res
      .status(500)
      .json({ success: false, messgae: "Something went wrong during signup" });
  }
};

export const sendOtpController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const otp = await sendOtp(email);
    res
      .status(200)
      .json({ sucess: true, otp: otp, message: "OTP sent sucessfully" });
  } catch (error) {
    console.error("Signup", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while sending OTP",
    });
  }
};

export const verifyOtpController = async (req, res) => {
  const { email, otp } = req.body;
  try {
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    if (!/^\d{4,6}$/.test(otp)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid OTP format" });
    }

    const result = await verifyOtp(email, otp);
    if (!result.success)
      return res.status(400).json({ message: result.message });
    const user = await getUserByEmail(email);
    const payload = { id: user.id, email: user.email };
    const token = generateToken(payload);
    res.status(200).json({ sucess: true, token, message: result.message });
  } catch (error) {
    console.error("Verify Otp", error);
    res
      .status(500)
      .json({ message: "Something went wrong while verifying OTP" });
  }
};

export const changeUserPasswordController = async (req, res) => {
  const { newPassword } = req.body;
  const { email } = req.user;
  try {
    if (!newPassword)
      return res
        .status(400)
        .json({ success: false, message: "New password is required" });
    const hashedPassword = await hashPassword(newPassword);
    const updatedUser = await changeUserPassword(email, hashedPassword);

    if (!updatedUser)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res
      .status(200)
      .json({ success: true, message: "Password updated sucessfully" });
  } catch (error) {
    console.error("Change Password", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while changing password",
    });
  }
};

export const forgetOtpController = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = await sendOtp(email);
    res
      .status(200)
      .json({ sucess: true, otp: otp, message: "OTP sent sucessfully" });
  } catch (error) {
    console.error("Signup", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while sending OTP",
    });
  }
};
