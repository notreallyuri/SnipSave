import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";
import { userPreferencesSchema } from "@/schemas";
import { AppError } from "@/lib/errors";

class UserRepository {
  constructor(private readonly db: PrismaClient) {}

  async getUser(id: string) {
    const user = await this.db.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        image: true,
      },
    });

    return user;
  }

  async getPreferences(id: string) {
    return await this.db.user.findUnique({
      where: { id },
      select: { preferences: true },
    });
  }

  updatePreferences(
    id: string,
    preferences: z.infer<typeof userPreferencesSchema>,
  ) {
    const parsed = userPreferencesSchema.safeParse(preferences);

    if (!parsed.success) {
      throw new AppError({
        code: "BAD_GATEWAY",
        message: "Invalid preferences data",
        meta: parsed.error.format(),
      });
    }

    console.log("✅ Clean preferences to update:", parsed.data);

    return this.db.user.update({
      where: { id },
      data: { preferences: { update: parsed.data } },
    });
  }

  async isVerified(id: string) {
    return await this.db.user.findUnique({
      where: { id },
      select: { emailVerified: true },
    });
  }
}

export const userManager = new UserRepository(prisma);
