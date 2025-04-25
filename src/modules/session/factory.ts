import {
  GetUserBySession,
  CreateSessionService,
  DestroySessionService,
} from "./services";
import { ISessionRepository, SessionRepository } from "./repository";

const SessionFactory = <T>(
  Service: new (repository: ISessionRepository) => T
) => new Service(new SessionRepository());

const getUserBySession = SessionFactory(GetUserBySession);
const createSession = SessionFactory(CreateSessionService);
const destroySession = SessionFactory(DestroySessionService);

export { getUserBySession, createSession, destroySession };