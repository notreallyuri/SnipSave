import { Redis } from "@upstash/redis";
import dotenv from "dotenv";
import { AppError } from "./errors";

dotenv.config({ path: ".env" });

const upstash_url = process.env.UPSTASH_URL;
const upstash_token = process.env.UPSTASH_TOKEN;

if (!upstash_token || !upstash_url)
  throw new AppError({
    code: "INTERNAL_SERVER_ERROR",
    message: "Missing environment keys",
  });

export const redisClient = new Redis({
  url: upstash_url,
  token: upstash_token,
});
