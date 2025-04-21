export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      httpOnly?: boolean;
      sameSite?: "strict" | "lax";
      path?: string;
      expires?: Date;
    }
  ) => void;
  get: (key: string) => { name: string; value: string } | undefined;
  delete: (key: string) => void;
};

export type CreateSessionInput = { userId: string; cookies: Cookies };
export type DeleteSessionInput = { cookies: Pick<Cookies, "get" | "delete"> };
export type GetUserIdInput = { cookies: Pick<Cookies, "get"> };
