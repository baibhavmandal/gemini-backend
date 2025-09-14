import express from "express";

const router = express.Router();

router.post("/pro", (req, res) => {
  res.send("Subscribe to Pro plan");
});
router.get("/status", (req, res) => {
  res.send("Get subscription status");
});

export default router;
