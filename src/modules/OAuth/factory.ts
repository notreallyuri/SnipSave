import { OAuthFetchUserService } from "./services";
import { OAuthRepository, IOAuthRepository } from "./repository";

const oAuthFactory = <T>(Service: new (repository: IOAuthRepository) => T) =>
  new Service(new OAuthRepository());

const OAuthFetchUser = oAuthFactory(OAuthFetchUserService);

export { OAuthFetchUser };
