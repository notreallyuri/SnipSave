import { prisma } from "@/lib/prisma";
import type { SignUpSchemaType, SignInSchemaType } from "@/schemas";
import type { UserData } from "@/types/user";
import { AppError } from "@/lib/errors";

export interface IAuthRepository {
  signUp(data: Omit<SignUpSchemaType, "remember">): Promise<UserData>;
  signIn(
    data: Omit<SignInSchemaType, "remember">,
  ): Promise<UserData & { password: string | null; salt: string | null }>;
}

export class AuthRepository implements IAuthRepository {
  async signUp(data: Omit<SignUpSchemaType, "remember">): Promise<UserData> {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new AppError({
        code: "CONFLICT",
        message: "User already exists with this email",
      });
    }

    return await prisma.user.create({
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
    const user = await prisma.user.findUnique({
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
