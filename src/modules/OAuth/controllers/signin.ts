import { NextRequest, NextResponse } from "next/server";
import { OAuthFetchUser } from "../factory";
import { createSession } from "@/modules/session";
import { global_user } from "@/types/user";
import { Providers } from "@/generated";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function getUserData(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider: rawProvider } = await params;
  const code = req.nextUrl.searchParams.get("code");
  const provider = z.nativeEnum(Providers).parse(rawProvider);

  if (typeof code !== "string") {
    const errorUrl = new URL("/auth", req.url);
    errorUrl.searchParams.set("tab", "signin");
    errorUrl.searchParams.set(
      "oauthError",
      "Failed to connect. Please try again.",
    );
    return NextResponse.redirect(errorUrl);
  }

  try {
    const oAuthUser = await OAuthFetchUser.execute(code);
    const user = await AccountToUser(oAuthUser, provider);
    await createSession.execute({ user, remember: false });
    return NextResponse.redirect(new URL("/home", req.url));
  } catch (error) {
    const errorUrl = new URL("/auth", req.url);
    errorUrl.searchParams.set("tab", "signin");
    errorUrl.searchParams.set(
      "oauthError",
      "Failed to connect. Please try again.",
    );
    return NextResponse.redirect(errorUrl);
  }
}

export const AccountToUser = (
  { id, email, name }: global_user,
  provider: Providers,
) => {
  return prisma.$transaction(async (tx) => {
    let user = await tx.user.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        email: true,
        image: true,
        emailVerified: true,
      },
    });

    if (!user) {
      user = await tx.user.create({
        data: { email, username: name, preferences: { create: {} } },
        select: {
          id: true,
          username: true,
          email: true,
          image: true,
          emailVerified: true,
        },
      });
    }

    await tx.account.upsert({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId: id,
        },
      },
      update: {},
      create: {
        provider,
        providerAccountId: id,
        userId: user.id,
      },
    });

    return user;
  });
};
