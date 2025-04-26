import type { SessionOptions } from "iron-session";
import type { UserData } from "@/types/user";
import { env } from "@/config";

const cookieName = env.COOKIE_SESSION_KEY;
export interface SessionData {
  user?: UserData;
}

export const baseSessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
