import NextAuth from "next-auth";

import Discord from "next-auth/providers/discord";
import type { NextAuthConfig } from "next-auth";

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: "https://discord.com/api/oauth2/authorize?scope=identify+guilds.join",
    }),
  ],
  basePath: "/auth",
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      if (profile) {
        token.id = profile.id;
        token.name = profile.username as string;
        token.email = null;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (token?.picture?.includes("discord")) {
          session.user.id = token.id as string;
        }
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
