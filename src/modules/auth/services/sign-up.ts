import { IAuthRepository } from "../repository";
import { Service } from "@/interfaces";
import { customHasher } from "@/lib/utils";
import { SignUpSchemaType } from "@/schemas";
import { createSession } from "@/modules/session";
import { UserData } from "@/types/user";

export class SignUpService
  implements
    Service<IAuthRepository, Omit<SignUpSchemaType, "remember">, UserData>
{
  constructor(public repository: IAuthRepository) {}

  async execute(data: Omit<SignUpSchemaType, "remember">): Promise<UserData> {
    const { password, ...rest } = data;

    const salt = customHasher.generateSalt();
    const hashedPassword = await customHasher.hash(password, salt);

    const user = await this.repository.signUp({
      ...rest,
      password: hashedPassword,
    });

    return user;
  }
}
