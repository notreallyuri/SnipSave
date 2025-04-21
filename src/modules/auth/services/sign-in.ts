import { IUserRepository } from "@/modules/user";
import { Service, BaseUserData } from "@/interfaces";
import { UserSchemaTypes } from "@/schemas";
import { customHasher } from "@/lib/utils";
import { TRPCError } from "@trpc/server";

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
      
      throw new TRPCError({
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
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid credentials",
      });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
}
