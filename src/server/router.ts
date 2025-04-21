import { router, publicProcedure } from "./trpc";
import { authRouter } from "@/modules/auth/route";
import { userRouter } from "@/modules/user/route";

export const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return "ok";
  }),
  auth: authRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
