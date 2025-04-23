import { Service } from "@/interfaces";
import type { ISessionRepository } from "../repository";

export class DeleteSessionService
  implements Service<ISessionRepository, string, void>
{
  constructor(public repository: ISessionRepository) {}

  async execute(sessionId: string): Promise<void> {
    await this.repository.deleteSession(sessionId);
  }
}
