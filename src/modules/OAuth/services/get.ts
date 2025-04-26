import { IOAuthRepository } from "../repository";
import { Service } from "@/interfaces";

type global_user = {
  id: string;
  email: string;
  name: string;
};

export class OAuthFetchUserService
  implements Service<IOAuthRepository, string, global_user>
{
  constructor(public readonly repository: IOAuthRepository) {}

  async execute(code: string) {
    return this.repository.fetchUser(code);
  }
}
