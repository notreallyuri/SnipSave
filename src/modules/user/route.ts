import {
  getBaseUserData,
  getUserById,
  getUserByEmail,
  updateUser,
} from "@/modules/user";
import { router, publicProcedure, protectedProcedure } from "@/server/trpc";
import { UserSchema } from "@/schemas";
import { z } from "zod";

export const userRouter = router({
  getUserByEmail: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await getUserByEmail.execute(input);
  }),

  getUserById: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await getUserById.execute(input);
  }),

  getBaseUserData: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.userData.id;

    return await getBaseUserData.execute(userId);
  }),

  updateUser: protectedProcedure
    .input(z.object({ id: z.string(), data: UserSchema["update"] }))
    .mutation(async ({ input }) => {
      const { id, data } = input;

      return await updateUser.execute({ id, data });
    }),

  getPreferences: protectedProcedure.query(async ({ ctx }) => {}),

  updatePreferences: protectedProcedure
    .input(z.object({ preferences: UserSchema["preferences"] }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userData.id;
    }),
});
