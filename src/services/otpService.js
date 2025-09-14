import redisClient from "../config/redis.js";
import otpGenerator from "../utils/otpGenerator.js";

const OTP_EXPIRY = 300;

export const sendOtp = async (email) => {
  try {
    const otp = otpGenerator();
    await redisClient.setEx(`otp:${email}`, OTP_EXPIRY, `${otp}`);
    return otp;
  } catch (error) {
    console.error("Send OTP", error);
    throw error;
  }
};

export const verifyOtp = async (email, enteredOTP) => {
  try {
    const storedOTP = await redisClient.get(`otp:${email}`);

    if (!storedOTP)
      return { success: false, message: "OTP expired or not found" };
    if (Number(storedOTP) !== enteredOTP)
      return { success: false, message: "Invalid OTP" };

    await redisClient.del(`otp:${email}`);
    return { success: true, message: "OTP verified" };
  } catch (error) {
    console.error("Verify OTP", error);
    throw error;
  }
};
