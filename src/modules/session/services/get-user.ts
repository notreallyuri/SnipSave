import { ISessionRepository } from "../repository";
import { SessionData } from "../config";
import { Service } from "@/interfaces";

export class GetUserBySession
  implements Service<ISessionRepository, void, SessionData["user"]>
{
  constructor(public repository: ISessionRepository) {}

  public async execute(): Promise<SessionData["user"]> {
    return this.repository.getUserSession();
  }
}
