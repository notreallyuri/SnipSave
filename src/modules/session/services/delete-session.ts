import { Service, DeleteSessionInput } from "@/interfaces";
import type { ISessionRepository } from "../repository";

export class DeleteSessionService
  implements Service<ISessionRepository, null, void>
{
  constructor(public repository: ISessionRepository) {}

  async execute(): Promise<void> {
    await this.repository.deleteSession();
  }
}