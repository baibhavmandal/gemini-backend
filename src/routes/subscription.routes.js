import express from "express";
import jwtAuth from "../middlewares/jwtAuth.js";
import { getSubscriptionStatus } from "../controllers/subscription.controller.js";

const router = express.Router();

router.post("/pro", (req, res) => {
  res.send("Subscribe to Pro plan");
});
router.get("/status", jwtAuth, getSubscriptionStatus);

export default router;
