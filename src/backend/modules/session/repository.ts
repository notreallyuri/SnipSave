import { baseSessionOptions, SessionData } from "@/backend/modules/session/config";
import { ISessionRepository } from "@/backend/interfaces";
import { getIronSession, type SessionOptions } from "iron-session";
import type { UserData } from "@/backend/types/user";
import { cookies } from "next/headers";

export type SessionInput = {
  user: UserData;
  remember: boolean;
};



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
