import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { getUserById } from "@/modules/user";
import { createCookieShim } from "@/config/cookies";

export async function createContext(opts: FetchCreateContextFnOptions) {
  const { req } = opts;

  const { cookies, setCookies } = createCookieShim(req);

  let userData = null;


 

  return {
    userData,
    cookies,
    setCookies,
  };
}

export type TRPCContext = Awaited<ReturnType<typeof createContext>>;
