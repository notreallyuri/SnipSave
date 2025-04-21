import { IUserRepository } from "../repository";
import { UserPreferences } from "@/generated";
import { Service } from "@/interfaces";

export class GetUserPreferences
  implements Service<IUserRepository, string, UserPreferences | null>
{
  constructor(public repository: IUserRepository) {}

  async execute(id: string): Promise<UserPreferences | null> {
    return await this.repository.getPreferences(id);
  }
}


