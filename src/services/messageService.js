import pool from "../config/db.js";

export const createMessage = async ({
  chatroomId,
  message,
  sender = "user",
  replyTo = null,
}) => {
  try {
    const query = `
    INSERT INTO "Message" (chatroom_id, content, sender, reply_to) 
    VALUES ($1, $2, $3, $4) 
    RETURNING id, created_at
    `;
    const values = [chatroomId, message, sender, replyTo];
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) throw new Error("Failed to Create Message");
    return rows[0];
  } catch (error) {
    console.error("Create message", error);
    throw error;
  }
};
