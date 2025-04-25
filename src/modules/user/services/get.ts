import { IUserRepository } from "@/modules/user";
import { BaseUserData, Service } from "@/interfaces";
import { User } from "@/generated";

export class GetUserById
  implements Service<IUserRepository, string, User | null>
{
  constructor(public repository: IUserRepository) {}

  async execute(id: string): Promise<User | null> {
    return await this.repository.getUserById(id);
  }
}

export class GetBaseUserData
  implements Service<IUserRepository, string, BaseUserData | null>
{
  constructor(public repository: IUserRepository) {}

  async execute(id: string): Promise<BaseUserData | null> {
    return await this.repository.getBaseUserData(id);
  }
}
