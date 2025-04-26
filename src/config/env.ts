import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    UPLOADTHING_TOKEN: z.string().min(1),
    // Cookie Related info
    SESSION_SECRET: z.string().min(1),
    COOKIE_SESSION_KEY: z.string().min(1),
    // OAuth Providers
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    DISCORD_CLIENT_ID: z.string().min(1),
    DISCORD_CLIENT_SECRET: z.string().min(1),
    OAUTH_REDIRECT_URL_BASE: z.string().url(),
  },
  experimental__runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
