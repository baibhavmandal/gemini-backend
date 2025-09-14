import process from "process";
import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

const redisClient = createClient({ uri: process.env.REDIS_URI });

redisClient.on("error", (err) => console.log("Redis Client Error", err));

await redisClient.connect();
export default redisClient;
