import pool from "../config/db.js";

export const createUser = async (email, password) => {
  try {
    const query = `
    INSERT INTO "User" (email, password)
    VALUES ($1, $2)
    RETURNING id, email
    `;
    const values = [email, password];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error creating user: ", error);
    throw error;
  }
};
export const getUserByEmail = async (email) => {
  try {
    const query = `SELECT * FROM "User" WHERE email = $1`;
    const value = [email];
    const { rows } = await pool.query(query, value);
    return rows[0];
  } catch (error) {
    console.error("Error fetching user by email: ", error);
    throw error;
  }
};
export const changeUserPassword = async (email, newPassword) => {
  try {
    const query = `
    UPDATE "User"
    SET password = $2
    WHERE email = $1
    RETURNING id, email`;

    const values = [email, newPassword];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error changing user password: ", error);
  }
};
