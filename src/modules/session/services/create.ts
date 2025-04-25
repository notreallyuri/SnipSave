import { ISessionRepository, SessionInput } from "../repository";
import { Service } from "@/interfaces";

export class CreateSessionService
  implements Service<ISessionRepository, SessionInput, void>
{
  constructor(public repository: ISessionRepository) {}

  async execute({ user, remember }: SessionInput): Promise<void> {
    return await this.repository.createSession({ user, remember });
  }
}
