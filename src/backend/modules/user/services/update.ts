import type { UpdateUserSchemaType } from "@/schemas";
import { User } from "@/backend/prisma/generated";
import { IUserRepository } from "@/backend/modules/user";
import { Service } from "@/backend/interfaces";

export class UpdateUser
  implements
    Service<IUserRepository, { id: string; data: UpdateUserSchemaType }, User>
{
  constructor(public repository: IUserRepository) {}

  async execute(args: {
    id: string;
    data: UpdateUserSchemaType;
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
