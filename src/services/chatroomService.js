import pool from "../config/db.js";
import redisClient from "../config/redis.js";

export const createChatroom = async (userId, name) => {
  try {
    const query = `
    INSERT INTO "Chatroom" (name, userId) 
    VALUES ($1, $2) 
    RETURNING id, name, created_at
    `;
    const values = [name, userId];
    const { rows } = await pool.query(query, values);
    if (rows.length == 0) {
      throw new Error("Failed to create chatroom");
    }
    return rows[0];
  } catch (error) {
    console.error("Create Chatroom", error);
    throw error;
  }
};

export const getChatroomsByUserId = async (userId) => {
  const cacheKey = `chatroom:user:${userId}`;
  const ttl = 300;
  try {
    const cache = await redisClient.get(cacheKey);
    if (cache) {
      return JSON.parse(cache);
    }
    const query = `SELECT * FROM "Chatroom" WHERE userId = $1`;
    const values = [userId];
    const { rows } = await pool.query(query, values);
    if (rows.length == 0) throw new Error("Failed to get chatrooms");
    await redisClient.set(`chatroom:user:${userId}`, JSON.stringify(rows), {
      EX: ttl,
    });
    return rows;
  } catch (error) {
    console.error("Get Chatrooms By UserId", error);
    throw error;
  }
};

export const getChatroomById = async (id) => {
  try {
    const query = `
    SELECT 
    c.id AS chatroom_id,
    c."userid" AS user_id,
    c.created_at AS chatroom_created_at,
    COALESCE(
        JSON_AGG(
        JSON_BUILD_OBJECT(
            'id', m.id,
            'content', m.content,
            'created_at', m.created_at
        )
        ) FILTER (WHERE m.id IS NOT NULL),
        '[]'
    ) AS messages
    FROM "Chatroom" c
    LEFT JOIN "Message" m ON c.id = m."chatroom_id"
    WHERE c.id = $1
    GROUP BY c.id, c."userid", c.created_at;
    `;

    const values = [id];
    const { rows } = await pool.query(query, values);
    if (rows.length == 0) throw new Error("Chatroom not found");
    return rows[0];
  } catch (error) {
    console.error("Get Chatroom By Id", error);
    throw error;
  }
};
