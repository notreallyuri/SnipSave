import { UserPreferencesSchemaTypes } from "@/schemas";
import { IUserRepository } from "../repository";
import { UserPreferences } from "@/backend/prisma/generated";
import { Service } from "@/backend/interfaces";

export class GetUserPreferences
  implements Service<IUserRepository, string, UserPreferences | null>
{
  constructor(public repository: IUserRepository) {}

  async execute(id: string): Promise<UserPreferences | null> {
    return await this.repository.getPreferences(id);
  }
}

export class UpdateUserPreferences
  implements
    Service<
      IUserRepository,
      { id: string; data: UserPreferencesSchemaTypes },
      UserPreferences | null
    >
{
  constructor(public repository: IUserRepository) {}

  async execute(args: {
    id: string;
    data: UserPreferencesSchemaTypes;
  }): Promise<UserPreferences | null> {
    const { id, data } = args;

    return this.repository.updatePreferences(id, data);
  }
}
