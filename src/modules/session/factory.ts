import {
  CreateSessionService,
  GetUserIdService,
  DeleteSessionService,
} from "./services";
import { SessionRepository, ISessionRepository } from "./repository";

const sessionFactory = <T>(
  Service: new (repository: ISessionRepository) => T
) => {
  return new Service(new SessionRepository());
};

const createSession = sessionFactory(CreateSessionService);
const getUserIdBySession = sessionFactory(GetUserIdService);
const deleteSession = sessionFactory(DeleteSessionService);

export { createSession, getUserIdBySession, deleteSession };
