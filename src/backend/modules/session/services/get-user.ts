import { ISessionRepository } from "@/backend/interfaces";
import { Service } from "@/backend/interfaces";
import { SessionData } from "../config";

export class GetUserBySession
  implements Service<ISessionRepository, void, SessionData["user"]>
{
  constructor(public repository: ISessionRepository) {}

  public async execute(): Promise<SessionData["user"]> {
    return this.repository.getUserSession();
  }
}
