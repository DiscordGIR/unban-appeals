import NextAuth from "next-auth";

import Discord from "next-auth/providers/discord";
import type { NextAuthConfig } from "next-auth";

export const config = {
  theme: {
    logo: "https://media.discordapp.net/attachments/457981600941080596/1224432807888031774/normal2.png?ex=661d78ea&is=660b03ea&hm=b9949852ad704b340179bbbc319896ed1f390a2c1e5fae5ed2886d260316face&=&format=webp&quality=lossless&width=629&height=629",
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
          session.sessionToken = token.accessToken as string;
        }
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
