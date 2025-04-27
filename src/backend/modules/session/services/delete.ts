import { ISessionRepository } from "@/backend/interfaces";
import { Service } from "@/backend/interfaces";

export class DestroySessionService
  implements Service<ISessionRepository, void, void>
{
  constructor(public repository: ISessionRepository) {}

  public async execute(): Promise<void> {
    return this.repository.destroySession();
  }
}
