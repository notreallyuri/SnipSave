import type {
  UpdateUserSchemaType,
  UserPreferencesSchemaTypes,
} from "@/schemas";
import { prisma } from "@/lib/prisma";
import { User, UserPreferences } from "@/generated";
import type { BaseUserData } from "@/interfaces";

export interface IUserRepository {
  update(id: string, data: UpdateUserSchemaType): Promise<User>;
  delete(id: string): Promise<User>;
  updateProfilePicture(id: string, url: string): Promise<void>;
  getPreferences(id: string): Promise<UserPreferences | null>;
  updatePreferences(
    id: string,
    data: UserPreferencesSchemaTypes,
  ): Promise<UserPreferences | null>;
  getBaseUserData(id: string): Promise<BaseUserData | null>;
  getUserById(id: string): Promise<User | null>;
}

export class UserRepository implements IUserRepository {
  async getBaseUserData(id: string): Promise<BaseUserData | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        image: true,
        emailVerified: true,
      },
    });

    if (!user) return null;

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      image: user.image,
      isEmailVerified: !!user.emailVerified,
    };
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

  update(id: string, data: UpdateUserSchemaType): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  updatePreferences(
    id: string,
    data: UserPreferencesSchemaTypes,
  ): Promise<UserPreferences | null> {
    return prisma.userPreferences.update({
      where: { userId: id },
      data,
    });
  }

  async updateProfilePicture(id: string, url: string): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: {
        image: url,
      },
    });
  }

  async delete(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }
}
