import { IAuthRepository } from "../repository";
import { Service, BaseUserData } from "@/interfaces";
import { createSession } from "@/modules/session";
import type { SignInSchemaType } from "@/schemas";
import { customHasher } from "@/lib/utils";
import { AppError } from "@/lib/errors";
import type { UserData } from "@/types/user";

export class SignInService
  implements
    Service<IAuthRepository, Omit<SignInSchemaType, "remember">, UserData>
{
  constructor(public repository: IAuthRepository) {}

  async execute(data: Omit<SignInSchemaType, "remember">): Promise<UserData> {
    const user = await this.repository.signIn(data);

    if (!user.salt || !user.password) {
      throw new AppError({
        code: "BAD_REQUEST",
        message: "User not authenticated through crendetials.",
      });
    }

    const isPasswordValid = await customHasher.verify(
      data.password,
      user.salt,
      user.password,
    );

    if (!isPasswordValid) {
      throw new AppError({
        code: "BAD_REQUEST",
        message: "Invalid credentials",
      });
    }

    const userData: UserData = {
      id: user.id,
      username: user.username,
      email: user.email,
      image: user.image,
      emailVerified: user.emailVerified,
    };

    return userData;
  }
}
