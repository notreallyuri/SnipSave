import { z } from "zod";
import { OAuthClient } from "../client";
import { env } from "@/backend/config";

export function GithubOAuthGenerator() {
  return new OAuthClient({
    provider: "github",
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    scopes: ["read:user", "user:email"],
    urls: {
      auth: "https://github.com/login/oauth/authorize",
      token: "https://github.com/login/oauth/access_token",
      user: "https://api.github.com/user",
    },
    userInfo: {
      schema: z.object({
        id: z.number(),
        name: z.string().nullable(),
        login: z.string(),
        email: z.string().email(),
      }),
      parser: (data) => ({
        id: data.id.toString(),
        name: data.name ?? data.login,
        email: data.email,
      }),
    },
  });
}
