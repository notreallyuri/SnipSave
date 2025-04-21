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
        sameSite?: "strict" | "lax";
        path?: string;
        expires?: Date;
      } = {}
    ) => {
      const cookie = serialize(key, value, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        ...options,
      });
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
