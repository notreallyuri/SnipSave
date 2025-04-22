import type { ISessionRepository } from "../repository";
import { CreateSessionInput, Service } from "@/interfaces";

export class CreateSessionService
  implements Service<ISessionRepository, string, void>
{
  constructor(public repository: ISessionRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.createUserSession(id);
  }
}
