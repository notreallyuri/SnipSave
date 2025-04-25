import { IUserRepository } from "@/modules/user";
import { Service, BaseUserData } from "@/interfaces";
import { createSession } from "@/modules/session";
import { UserSchemaTypes } from "@/schemas";
import { customHasher } from "@/lib/utils";
import { AppError } from "@/lib/errors";

export class SignInService
  implements Service<IUserRepository, UserSchemaTypes["signIn"], BaseUserData>
{
  constructor(public repository: IUserRepository) {}

  async execute(data: UserSchemaTypes["signIn"]): Promise<BaseUserData> {
    const user = await this.repository.getUserByEmail(data.email);

    if (!user) {
      await customHasher.verifyPassword(
        data.password,
        "dummySalt",
        "dummyHash"
      );

      throw new AppError({
        code: "UNAUTHORIZED",
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await customHasher.verifyPassword(
      data.password,
      user.salt,
      user.password
    );

    if (!isPasswordValid)
      throw new AppError({
        code: "UNAUTHORIZED",
        message: "Invalid credentials",
      });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      isEmailVerified: !!user.emailVerified,
    };
  }
}
