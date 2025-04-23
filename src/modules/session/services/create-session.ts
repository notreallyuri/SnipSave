import type { ISessionRepository } from "../repository";
import { Service } from "@/interfaces";

export class CreateSessionService
  implements Service<ISessionRepository, string, string>
{
  constructor(public repository: ISessionRepository) {}

  async execute(id: string): Promise<string> {
    return await this.repository.createUserSession(id);
  }
}
