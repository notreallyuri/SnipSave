import { Service, GetUserIdInput } from "@/interfaces";
import type { ISessionRepository } from "../repository";

export class GetUserIdService
  implements Service<ISessionRepository, GetUserIdInput, string | null>
{
  constructor(public repository: ISessionRepository) {}

  async execute(data: GetUserIdInput): Promise<string | null> {
    const { cookies } = data;
    return await this.repository.getUserId(cookies);
  }
}
