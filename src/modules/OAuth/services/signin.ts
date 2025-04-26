"use server";
import { OAuthRepository } from "../repository";
import { Providers } from "@/generated";
import { redirect } from "next/navigation";

export async function OAuthSignIn(provider: Providers) {
  redirect(new OAuthRepository().createAuthUrl());
}
