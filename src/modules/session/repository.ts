import { getIronSession, type SessionOptions } from "iron-session";
import { baseSessionOptions, SessionData } from "@/modules/session/config";
import type { UserData } from "@/types/user";
import { cookies } from "next/headers";

export type SessionInput = {
  user: UserData;
  remember: boolean;
};

export interface ISessionRepository {
  createSession({ user, remember }: SessionInput): Promise<void>;
  getUserSession(): Promise<SessionData["user"]>;
  destroySession(): Promise<void>;
}

export class SessionRepository implements ISessionRepository {
  private getSession = async (remember = false) => {
    const sessionOptions: SessionOptions = {
      ...baseSessionOptions,
      cookieOptions: {
        ...baseSessionOptions.cookieOptions,
        maxAge: remember ? 60 * 60 * 24 * 30 : undefined,
      },
    };

    return getIronSession<SessionData>(await cookies(), sessionOptions);
  };

  public async createSession({ user, remember }: SessionInput): Promise<void> {
    const session = await this.getSession(remember);
    session.user = user;
    await session.save();
  }

  public async getUserSession(): Promise<SessionData["user"]> {
    const session = await this.getSession();
    return session.user;
  }

  public async destroySession(): Promise<void> {
    const session = await this.getSession();
    session.destroy();
  }
}
