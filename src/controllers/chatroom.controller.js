import {
  createChatroom,
  getChatroomById,
  getChatroomsByUserId,
} from "../services/chatroomService.js";
import { generateGeminiContent } from "../services/geminiService.js";
import { createMessage } from "../services/messageService.js";

export const createChatroomController = async (req, res) => {
  const { id } = req.user;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Name is required",
    });
  }
  try {
    const chatroom = await createChatroom(id, name);
    if (!chatroom) {
      res
        .status(500)
        .json({ success: false, message: "Failed to create chatroom" });
    }
    res.status(201).json({
      success: true,
      messsage: "Chatroom created",
      data: {
        chatroom_id: chatroom.id,
        name: chatroom.name,
        created_at: chatroom.created_at,
      },
    });
  } catch (error) {
    console.error("Create Chatroom", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getChatroomController = async (req, res) => {
  const { id } = req.user;
  try {
    const allChatrooms = await getChatroomsByUserId(id);
    if (!allChatrooms || allChatrooms.length === 0) {
      res.status(200).json({
        success: true,
        message: "No chatrooms found for this user",
      });
    }
    res.status(200).json({
      success: true,
      message: "Chatrooms retrived successfully",
      data: { allChatrooms },
    });
  } catch (error) {
    console.error("Get All Chatrooms", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getChatroomByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const chatroom = await getChatroomById(id);

    if (!chatroom) {
      res.status(404).json({ success: false, message: "Chatroom not found" });
    }
    res.status(200).json({
      success: true,
      message: "Chatroom retrived successfully",
      data: { chatroom },
    });
  } catch (error) {
    console.error("Get Chatroom", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const chatWithGeminiController = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      success: false,
      message: "Message is required",
    });
  }

  try {
    const generatedText = await generateGeminiContent(message);

    if (!generatedText) {
      return res.status(400).json({
        success: false,
        message: "Gemini API generated no response",
      });
    }

    const userMessage = await createMessage({
      chatroomId: id,
      message,
    });
    const geminiResponse = await createMessage({
      chatroomId: id,
      message: generatedText,
      sender: "gemini",
      replyTo: userMessage.id,
    });

    res.status(201).json({
      success: true,
      message: "Message and reply saved successfully",
      data: { userMessage, geminiResponse, generatedText },
    });
  } catch (error) {
    console.error("Chat With Gemini Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
