import express from "express";

const router = express.Router();

router.post("/stripe", (req, res) => {
  res.send("Stripe webhook received");
});

export default router;
