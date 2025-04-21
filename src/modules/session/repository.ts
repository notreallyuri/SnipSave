import {
  COOKIE_SESSION_KEY,
  SESSION_EXPIRATION_SECONDS,
} from "@/config/config";
import { Cookies } from "@/interfaces";
import { redisClient } from "@/lib/redis";
import crypto from "crypto";

export interface ISessionRepository {
  getUserId(cookies: Pick<Cookies, "get">): Promise<string | null>;
  createUserSession(userId: string, cookies: Cookies): Promise<void>;
  deleteSession(cookies: Pick<Cookies, "get" | "delete">): Promise<null | void>;
}

export class SessionRepository implements ISessionRepository {
  private setCookies(sessionToken: string, cookies: Pick<Cookies, "set">) {
    cookies.set(COOKIE_SESSION_KEY, sessionToken, {
      secure: true,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      expires: new Date(Date.now() + SESSION_EXPIRATION_SECONDS * 1000),
    });
  }

  private async getUserSessionById(sessionId: string) {
    const data = await redisClient.get(`session:${sessionId}`);
    if (!data) return null;
    if (typeof data !== "string") return null;
    return data;
  }

  async getUserId(cookies: Pick<Cookies, "get">) {
    const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
    console.log("Session ID from cookie:", sessionId);
    if (!sessionId) return null;
    return await this.getUserSessionById(sessionId);
  }

  async createUserSession(userId: string, cookies: Cookies) {
    const sessionToken = crypto.randomBytes(32).toString("hex");
    await redisClient.set(`session:${sessionToken}`, userId, {
      ex: SESSION_EXPIRATION_SECONDS,
    });
    this.setCookies(sessionToken, cookies);
  }

  async deleteSession(cookies: Pick<Cookies, "get" | "delete">) {
    const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
    if (!sessionId) return null;
    await redisClient.del(`session:${sessionId}`);
    cookies.delete(COOKIE_SESSION_KEY);
  }
}
