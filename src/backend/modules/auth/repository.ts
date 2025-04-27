
import type { SignUpSchemaType, SignInSchemaType } from "@/schemas";
import type { UserData } from "@/backend/types/user";
import { AppError } from "@/lib/errors";
import type { PrismaClient } from "@/backend/prisma/generated";
import { IAuthRepository } from "@/backend/interfaces";



export class AuthRepository implements IAuthRepository {
  private readonly client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async signUp(data: Omit<SignUpSchemaType, "remember">): Promise<UserData> {
    const existingUser = await this.client.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new AppError({
        code: "CONFLICT",
        message: "User already exists with this email",
      });
    }

    return await this.client.user.create({
      data: {
        ...data,
        preferences: {
          create: {},
        },
      },
      select: {
        id: true,
        username: true,
        email: true,
        image: true,
        emailVerified: true,
      },
    });
  }

  async signIn(
    data: Omit<SignInSchemaType, "remember">,
  ): Promise<UserData & { password: string | null; salt: string | null }> {
    const user = await this.client.user.findUnique({
      where: { email: data.email },
      select: {
        id: true,
        username: true,
        email: true,
        image: true,
        emailVerified: true,
        password: true,
        salt: true,
      },
    });

    if (!user) throw new Error("User not found");

    return user;
  }
}
