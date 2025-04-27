import { IAuthRepository } from "@/backend/interfaces";
import {  AuthRepository } from "./repository";
import { SignUpService, SignInService } from "./services";
import { prisma } from "@/lib/prisma";

function authFactory<T>(Service: new (repository: IAuthRepository) => T) {
  return new Service(new AuthRepository(prisma));
}

const signUp = authFactory(SignUpService);
const signIn = authFactory(SignInService);

export { signUp, signIn };
