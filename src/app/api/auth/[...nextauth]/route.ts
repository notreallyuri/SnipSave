import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user, account }) {
      console.log("SignIn callback:", { user, account });
      if (!user.email) return false;

      if (account?.type === "credentials") return true;

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
        include: { accounts: true },
      });

      if (!existingUser) return true;

      const hasSameProvider = existingUser.accounts.some(
        (acc) =>
          acc.provider === account?.provider &&
          acc.providerAccountId === account.providerAccountId,
      );

      if (hasSameProvider) return true;
      return false;
    },

    async session({ session, user }) {
      console.log("Session callback with user:", { session, user });
      if (session.user) {
        session.user.email = user.email;
      }

      return session;
    },
  },
  session: {
    strategy: "database",
  },
  pages: {
    signIn: "/auth?tab=signin",
  },
  events: {
    async createUser({ user }) {
      await prisma.userPreferences.create({
        data: {
          userId: user.id,
        },
      });
    },
  },
  debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
