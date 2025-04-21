import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { User, UserPreferences } from "@/generated";
import { UserSchema, UserSchemaTypes } from "@/schemas";
import { AppError } from "@/lib/errors";
import type { BaseUserData } from "@/interfaces";

type isVerifiedRes = {
  emailVerified: Date | null;
};

export interface IUserRepository {
  create(data: UserSchemaTypes["base"]): Promise<BaseUserData>;
  update(id: string, data: UserSchemaTypes["update"]): Promise<User>;
  delete(id: string): Promise<User>;
  getPreferences(id: string): Promise<UserPreferences | null>;
  updatePreferences(
    id: string,
    preferences: UserSchemaTypes["preferences"]
  ): Promise<UserPreferences | null>;
  isVerified(id: string): Promise<isVerifiedRes | null>;
  getBaseUserData(id: string): Promise<BaseUserData | null>;
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
}

export class UserRepository implements IUserRepository {
  async create(data: UserSchemaTypes["base"]): Promise<BaseUserData> {
    return prisma.user.create({
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
      },
    });
  }

  async getBaseUserData(id: string): Promise<BaseUserData | null> {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        image: true,
      },
    });
  }

  async getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async getPreferences(id: string): Promise<UserPreferences | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { preferences: true },
    });

    return user?.preferences ?? null;
  }

  update(id: string, data: UserSchemaTypes["update"]): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  updatePreferences(
    id: string,
    preferences: UserSchemaTypes["preferences"]
  ): Promise<UserPreferences | null> {
    const parsed = UserSchema["preferences"].safeParse(preferences);

    if (!parsed.success) {
      throw new AppError({
        code: "BAD_GATEWAY",
        message: "Invalid preferences data",
        meta: parsed.error.format(),
      });
    }
    return prisma.userPreferences.update({
      where: { userId: id },
      data: parsed.data,
    });
  }

  async isVerified(id: string): Promise<isVerifiedRes | null> {
    return prisma.user.findUnique({
      where: { id },
      select: { emailVerified: true },
    });
  }

  async delete(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }
}
