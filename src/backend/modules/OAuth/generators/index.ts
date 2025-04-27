import { Providers } from "@/backend/prisma/generated";
import { DiscordOAuthGenerator } from "./discord";
import { GithubOAuthGenerator } from "./github";
import { AppError } from "@/lib/errors";

export function getOAuthClient(provider: Providers) {
  switch (provider) {
    case "discord":
      return DiscordOAuthGenerator();
    case "github":
      return GithubOAuthGenerator();
    default:
      throw new AppError({
        code: "METHOD_NOT_SUPPORTED",
        message: `OAuth provider ${provider} is not supported`,
      });
  }
}
