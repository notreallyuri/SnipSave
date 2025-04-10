import {
  COOKIE_SESSION_KEY,
  SESSION_EXPIRATION_SECONDS,
} from "@/config/config";
import { redisClient } from "@/lib/redis";
import { Redis } from "@upstash/redis";
import crypto from "crypto";

export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      httpOnly?: boolean;
      sameSite?: "strict" | "lax";
      path?: string;
      expires?: Date;
    },
  ) => void;
  get: (key: string) => { name: string; value: string } | undefined;
  delete: (key: string) => void;
};

class SessionRepository {
  constructor(private readonly stash: Redis) {}

  setCookies(sessionToken: string, cookies: Pick<Cookies, "set">) {
    cookies.set(COOKIE_SESSION_KEY, sessionToken, {
      secure: true,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      expires: new Date(Date.now() + SESSION_EXPIRATION_SECONDS * 1000),
    });
  }

  async getUserId(cookies: Pick<Cookies, "get">) {
    const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
    console.log("Session ID from cookie:", sessionId);

    if (!sessionId) return null;

    return await this.getUserSessionById(sessionId);
  }

  private async getUserSessionById(sessionId: string) {
    const data = await this.stash.get(`session:${sessionId}`);

    if (!data) return null;

    if (typeof data !== "string") return null;

    return data;
  }

  async createUserSession(userId: string, cookies: Cookies) {
    const sessionToken = crypto.randomBytes(32).toString("hex");

    await this.stash.set(`session:${sessionToken}`, userId, {
      ex: SESSION_EXPIRATION_SECONDS,
    });

    this.setCookies(sessionToken, cookies);
  }

  async deleteSession(cookies: Pick<Cookies, "get" | "delete">) {
    const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;

    if (!sessionId) return null;

    await this.stash.del(`session:${sessionId}`);

    cookies.delete(COOKIE_SESSION_KEY);
  }
}

export const sessionManager = new SessionRepository(redisClient);
