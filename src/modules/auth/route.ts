import { router, publicProcedure } from "@/server/trpc";
import { UserSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

import { signIn, signUp } from "@/modules/auth";
import { deleteSession, createSession } from "@/modules/session";

export const authRouter = router({
  signIn: publicProcedure
    .input(UserSchema["signIn"])
    .mutation(async ({ input, ctx }) => {
      try {
        await deleteSession.execute({
          cookies: { get: ctx.cookies.get, delete: ctx.cookies.delete },
        });

        const { id } = await signIn.execute(input);

        await createSession.execute({ userId: id, cookies: ctx.cookies });
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error signing in",
        });
      }
    }),

  signUp: publicProcedure
    .input(UserSchema["create"])
    .mutation(async ({ input, ctx }) => {
      try {
        await deleteSession.execute({
          cookies: { get: ctx.cookies.get, delete: ctx.cookies.delete },
        });

        const { id } = await signUp.execute(input);

        await createSession.execute({ userId: id, cookies: ctx.cookies });
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error signing up",
        });
      }
    }),

  signOut: publicProcedure.mutation(async ({ ctx }) => {
    try {
      await deleteSession.execute({
        cookies: { get: ctx.cookies.get, delete: ctx.cookies.delete },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error signing out",
      });
    }
  }),
});
