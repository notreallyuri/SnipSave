import { Cookies } from "@/interfaces";
import { parse, serialize } from "cookie";

export function createCookieShim(req: Request) {
  const parsed = parse(req.headers.get("cookie") ?? "");
  const setCookies: string[] = [];

  const cookies: Cookies = {
    get: (key: string) =>
      parsed[key] ? { name: key, value: parsed[key] } : undefined,
    set: (
      key: string,
      value: string,
      options: {
        secure?: boolean;
        httpOnly?: boolean;
        sameSite?: "strict" | "lax" | "none";
        path?: string;
        expires?: Date;
      } = {}
    ) => {
      const isProduction = process.env.NODE_ENV === "production";
      const cookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax" as "lax",
        path: "/",
        ...options,
      };

      const cookie = serialize(key, value, cookieOptions);
      setCookies.push(cookie);
    },
    delete: (key: string) => {
      const cookie = serialize(key, "", {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        expires: new Date(0),
      });
      setCookies.push(cookie);
    },
  };

  return { cookies, setCookies };
}
