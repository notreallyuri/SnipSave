import {
  COOKIE_SESSION_KEY,
  SESSION_EXPIRATION_SECONDS,
} from "@/config/config";
import { cookies } from "next/headers";
import { redisClient } from "@/lib/redis";
import crypto from "crypto";

export interface ISessionRepository {
  getUserId(): Promise<string | null>;
  createUserSession(userId: string): Promise<string>;
  deleteSession(sessionId: string): Promise<null | void>;
}

export class SessionRepository implements ISessionRepository {
  private async getUserSessionById(sessionId: string) {
    const data = await redisClient.get(`session:${sessionId}`);
    if (!data) return null;
    if (typeof data !== "string") return null;
    return data;
  }

  async getUserId() {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(COOKIE_SESSION_KEY)?.value;
    console.log("Session ID from cookie:", sessionId);
    if (!sessionId) return null;
    return await this.getUserSessionById(sessionId);
  }

  async createUserSession(userId: string) {
    const sessionToken = crypto.randomBytes(32).toString("hex");
    await redisClient.set(`session:${sessionToken}`, userId, {
      ex: SESSION_EXPIRATION_SECONDS,
    });
    return sessionToken;
  }

  async deleteSession(sessionId: string) {
    await redisClient.del(`session:${sessionId}`);
  }
}
