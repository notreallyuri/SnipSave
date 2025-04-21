import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { getCurrentSession } from "@/modules/session";
import { getUserById } from "@/modules/user";
import { createCookieShim } from "@/config/cookies";
import { TRPCError } from "@trpc/server";

export async function createContext(opts: FetchCreateContextFnOptions) {
  const { req } = opts;

  const { cookies, setCookies } = createCookieShim(req);

  let userData = null;

  const userId = await getCurrentSession.execute({
    cookies: { get: cookies.get },
  });

  if (userId) {
    const user = await getUserById.execute(userId);
    if (user) {
      userData = {
        id: user.id,
        username: user.username,
        email: user.email,
      };
    }
  }

  return {
    userData,
    cookies,
    setCookies,
  };
}

export type TRPCContext = Awaited<ReturnType<typeof createContext>>;
