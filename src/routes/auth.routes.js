import express from "express";

// import controllers (to be implemented)
import {
  signupController,
  sendOtpController,
  verifyOtpController,
  changeUserPasswordController,
  forgetOtpController,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/jwtAuth.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/send-otp", sendOtpController);
router.post("/verify-otp", verifyOtpController);
router.post("/forget-password", forgetOtpController);
router.post("/change-password", authMiddleware, changeUserPasswordController);

export default router;
