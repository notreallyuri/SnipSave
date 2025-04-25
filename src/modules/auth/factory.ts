import { IUserRepository, UserRepository } from "@/modules/user/repository";
import { SignUpService, SignInService } from "./services";

const authFactory = <T>(Service: new (repository: IUserRepository) => T) =>
  new Service(new UserRepository());

const signUp = authFactory(SignUpService);
const signIn = authFactory(SignInService);

export { signUp, signIn };
