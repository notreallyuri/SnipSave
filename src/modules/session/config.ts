import type { SessionOptions } from "iron-session";
import type { UserData } from "@/types/user";
import { COOKIE_SESSION_KEY } from "@/config";

export interface SessionData {
  user?: UserData;
}

export const baseSessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: COOKIE_SESSION_KEY,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
