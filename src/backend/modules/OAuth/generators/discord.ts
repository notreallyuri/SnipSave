import { z } from "zod";
import { OAuthClient } from "../client";
import { env } from "@/backend/config";

export function DiscordOAuthGenerator() {
  return new OAuthClient({
    provider: "discord",
    clientId: env.DISCORD_CLIENT_ID,
    clientSecret: env.DISCORD_CLIENT_SECRET,
    scopes: ["identify", "email"],
    urls: {
      auth: "https://discord.com/api/oauth2/authorize",
      token: "https://discord.com/api/oauth2/token",
      user: "https://discord.com/api/users/@me",
    },
    userInfo: {
      schema: z.object({
        id: z.string(),
        username: z.string(),
        global_name: z.string().nullable(),
        email: z.string(),
      }),
      parser: (data) => ({
        id: data.id,
        name: data.global_name ?? data.username,
        email: data.email,
      }),
    },
  });
}
