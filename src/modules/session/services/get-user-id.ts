import { Service, GetUserIdInput } from "@/interfaces";
import type { ISessionRepository } from "../repository";

export class GetUserIdService
  implements Service<ISessionRepository, null, string | null>
{
  constructor(public repository: ISessionRepository) {}

  async execute(): Promise<string | null> {
    return await this.repository.getUserId();
  }
}
