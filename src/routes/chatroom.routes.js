import express from "express";
import {
  chatWithGeminiController,
  createChatroomController,
  getChatroomByIdController,
  getChatroomController,
} from "../controllers/chatroom.controller.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = express.Router();

router.post("/", jwtAuth, createChatroomController);
router.get("/", jwtAuth, getChatroomController);
router.get("/:id", jwtAuth, getChatroomByIdController);
router.post("/:id/message", jwtAuth, chatWithGeminiController);

export default router;
