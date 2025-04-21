import type { ISessionRepository } from "../repository";
import { CreateSessionInput, Service } from "@/interfaces";

export class CreateSessionService
  implements Service<ISessionRepository, CreateSessionInput, void>
{
  constructor(public repository: ISessionRepository) {}

  async execute(data: CreateSessionInput): Promise<void> {
    const { userId, cookies } = data;
    await this.repository.createUserSession(userId, cookies);
  }
}
