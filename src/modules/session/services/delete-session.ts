import { Service, DeleteSessionInput } from "@/interfaces";
import type { ISessionRepository } from "../repository";

export class DeleteSessionService
  implements Service<ISessionRepository, DeleteSessionInput, void>
{
  constructor(public repository: ISessionRepository) {}

  async execute(data: DeleteSessionInput): Promise<void> {
    const { cookies } = data;
    await this.repository.deleteSession(cookies);
  }
}