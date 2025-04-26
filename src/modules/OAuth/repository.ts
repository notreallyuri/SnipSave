import { AppError } from "@/lib/errors";
import { env } from "@/config";
import { z } from "zod";
import { global_user } from "@/types/user";

export interface IOAuthRepository {
  fetchUser(code: string): Promise<global_user>;
}

export class OAuthRepository<T> {
  private get redirectUrl(): URL {
    return new URL("discord", env.OAUTH_REDIRECT_URL_BASE);
  }

  private readonly tokenSchema = z.object({
    access_token: z.string(),
    token_type: z.string(),
  });

  private readonly userSchema = z.object({
    id: z.string(),
    username: z.string(),
    global_name: z.string().nullable(),
    email: z.string().email(),
  });

  private async fetchToken(code: string) {
    return fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        code,
        redirect_uri: this.redirectUrl.toString(),
        grant_type: "authorization_code",
        client_id: env.DISCORD_CLIENT_ID,
        client_secret: env.DISCORD_CLIENT_SECRET,
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
    const url = new URL("https://discord.com/oauth2/authorize");
    url.searchParams.set("client_id", env.DISCORD_CLIENT_ID);
    url.searchParams.set("redirect_uri", this.redirectUrl.toString());
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", "identify email");

    return url.toString();
  }

  async fetchUser(code: string) {
    const { accessToken, tokenType } = await this.fetchToken(code);

    const user = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((rawData) => {
        const { data, success, error } = this.userSchema.safeParse(rawData);

        if (!success) {
          throw new AppError({
            code: "BAD_REQUEST",
            message: "Invalid user",
            cause: error,
          });
        }

        return data;
      });

    return {
      id: user.id,
      email: user.email,
      name: user.global_name ?? user.username,
    };
  }
}
