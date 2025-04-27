import { AppError } from "@/lib/errors";
import { env } from "@/backend/config";
import { z } from "zod";
import { global_user } from "@/backend/types/user";
import { Providers } from "@/backend/prisma/generated";

export interface IOAuthRepository {
  fetchUser(code: string): Promise<global_user>;
}

export class OAuthClient<T> {
  private readonly provider: Providers;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly scopes: string[];
  private readonly urls: {
    auth: string;
    token: string;
    user: string;
  };

  private readonly userInfo: {
    schema: z.ZodSchema<T>;
    parser: (data: T) => { id: string; email: string; name: string };
  };

  private readonly tokenSchema = z.object({
    access_token: z.string(),
    token_type: z.string(),
  });

  constructor({
    provider,
    clientId,
    clientSecret,
    scopes,
    urls,
    userInfo,
  }: {
    provider: Providers;
    clientId: string;
    clientSecret: string;
    scopes: string[];
    urls: {
      auth: string;
      token: string;
      user: string;
    };
    userInfo: {
      schema: z.ZodSchema<T>;
      parser: (data: T) => { id: string; email: string; name: string };
    };
  }) {
    this.provider = provider;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.scopes = scopes;
    this.urls = urls;
    this.userInfo = userInfo;
  }

  private get redirectUrl(): URL {
    return new URL(
      this.provider,
      env.OAUTH_REDIRECT_URL_BASE,
    );
  }

  private async fetchToken(code: string) {
    return fetch(this.urls.token, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        code,
        redirect_uri: this.redirectUrl.toString(),
        grant_type: "authorization_code",
        client_id: this.clientId,
        client_secret: this.clientSecret,
      }),
    })
      .then((res) => res.json())
      .then((rawData) => {
        const { data, success, error } = this.tokenSchema.safeParse(rawData);

        if (!success) {
          throw new AppError({
            code: "BAD_REQUEST",
            message: "Invalid token",
            cause: error,
          });
        }

        return {
          accessToken: data.access_token,
          tokenType: data.token_type,
        };
      });
  }

  createAuthUrl() {
    const url = new URL(this.urls.auth);
    url.searchParams.set("client_id", this.clientId);
    url.searchParams.set("redirect_uri", this.redirectUrl.toString());
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", this.scopes.join(" "));

    return url.toString();
  }

  async fetchUser(code: string) {
    const { accessToken, tokenType } = await this.fetchToken(code);

    const user = await fetch(this.urls.user, {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((rawData) => {
        const { data, error } = this.userInfo.schema.safeParse(rawData);

        if (error) {
          throw new AppError({
            code: "BAD_REQUEST",
            message: "Invalid user",
            cause: error,
          });
        }

        return data;
      });

    return this.userInfo.parser(user);
  }
}
