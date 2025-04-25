import { IAuthRepository, AuthRepository } from "./repository";
import { SignUpService, SignInService } from "./services";

const authFactory = <T>(Service: new (repository: IAuthRepository) => T) =>
  new Service(new AuthRepository());

const signUp = authFactory(SignUpService);
const signIn = authFactory(SignInService);

export { signUp, signIn };
