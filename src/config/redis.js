import process from "process";
import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

// const redisClient = createClient({ uri: process.env.REDIS_URI });

// redisClient.on("error", (err) => console.log("Redis Client Error", err));

// await redisClient.connect();
// export default redisClient;

const redisConfig = {
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    connectTimeout: 10000,
  },
  disableOfflineQueue: true,
};

const redisClient = createClient(redisConfig);

redisClient.on("error", (err) => console.log("Redis Client Error", err));

await redisClient.connect();

export default redisClient;
