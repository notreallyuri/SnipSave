"use server";
import { Providers } from "@/backend/prisma/generated";
import { getOAuthClient } from "./generators";
import { redirect } from "next/navigation";

export async function oAuthSignIn(provider: Providers) {
  const oAuthClient = getOAuthClient(provider);
  const authUrl = oAuthClient.createAuthUrl();
  redirect(authUrl);
}
