import express from "express";

// Importing route modules
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import chatroomRoutes from "./chatroom.routes.js";
import subscriptionRoutes from "./subscription.routes.js";
import webhookRoutes from "./webhook.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/chatroom", chatroomRoutes);
router.use("/subscription", subscriptionRoutes);
router.use("/webhook", webhookRoutes);

export default router;
