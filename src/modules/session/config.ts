import type { SessionOptions } from "iron-session";
import { COOKIE_SESSION_KEY } from "@/config";

export interface SessionData {
  user?: {
    id: string;
    username: string;
    image?: string | null;
    email: string;
    isEmailVerified: boolean;
  };
}

export const baseSessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: COOKIE_SESSION_KEY,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
