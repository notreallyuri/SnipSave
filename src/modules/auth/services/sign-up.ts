import { IUserRepository } from "@/modules/user";
import { Service, BaseUserData } from "@/interfaces";
import { customHasher } from "@/lib/utils";
import { UserSchemaTypes } from "@/schemas";

export class SignUpService
  implements Service<IUserRepository, UserSchemaTypes["create"], BaseUserData>
{
  constructor(public repository: IUserRepository) {}

  async execute(data: UserSchemaTypes["create"]): Promise<BaseUserData> {
    const { email, password } = data;

    const existingUser = await this.repository.getUserByEmail(email);
    if (existingUser) {
      throw new Error("NOT FOUND", {
        cause: "User already exists",
      });
    }

    const salt = customHasher.generateSalt();
    const hashedPassword = await customHasher.hashPassword(password, salt);

    const user = await this.repository.create({
      ...data,
      password: hashedPassword,
      salt,
    });

    return user;
  }
}
