import { IUserRepository } from "@/modules/user";
import { UserSchemaTypes } from "@/schemas";
import { Service } from "@/interfaces";
import { User, UserPreferences } from "@/generated";

export class UpdateUser
  implements
    Service<
      IUserRepository,
      { id: string; data: UserSchemaTypes["update"] },
      User
    >
{
  constructor(public repository: IUserRepository) {}

  async execute(args: {
    id: string;
    data: UserSchemaTypes["update"];
  }): Promise<User> {
    const { id, data } = args;

    return this.repository.update(id, data);
  }
}

export class UpdateUserProfilePicture
  implements Service<IUserRepository, { id: string; url: string }, void>
{
  constructor(public repository: IUserRepository) {}

  async execute(args: { id: string; url: string }): Promise<void> {
    const { id, url } = args;

    return this.repository.updateProfilePicture(id, url);
  }
}

export class UpdateUserPreferences
  implements
    Service<
      IUserRepository,
      { id: string; data: UserSchemaTypes["preferences"] },
      UserPreferences | null
    >
{
  constructor(public repository: IUserRepository) {}

  async execute(args: {
    id: string;
    data: UserSchemaTypes["preferences"];
  }): Promise<UserPreferences | null> {
    const { id, data } = args;

    return this.repository.updatePreferences(id, data);
  }
}
