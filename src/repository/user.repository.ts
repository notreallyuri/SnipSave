import { prisma } from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";

class UserRepository {
  constructor(private readonly db: PrismaClient) {}

  async get(id: string) {
    const user = await this.db.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        emailVerified: true,
        image: true,
      },
    });

    return user;
  }
}

export const userManager = new UserRepository(prisma);
