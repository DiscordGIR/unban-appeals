import { type ClassValue, clsx } from "clsx";
import { Session } from "next-auth";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const addUserToGuild = async (userId: string, sessionToken: string) => {
  const url = new URL(
    `https://discord.com/api/guilds/${process.env.APPEAL_GUILD_ID}/members/${userId}`,
  );
  const body = {
    method: "PUT",
    body: JSON.stringify({
      access_token: `${sessionToken}`,
    }),
    headers: {
      Authorization: `Bot ${process.env.BOT_TOKEN}`,
      "Content-Type": "application/json",
    },
  };

  return await fetch(url.href, body);
};

export const sendAppealToWehook = async (
  session: Session,
  formData: FormData,
) => {
  const webhook = new URL(process.env.DISCORD_WEBHOOK!);

  return await fetch(webhook.href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      embeds: [
        {
          title: "New Unban Appeal",
          color: 0x377ef7,
          fields: [
            {
              name: "Username",
              value: session?.user?.name,
            },
            {
              name: "ID",
              value: session?.user?.id,
            },
            {
              name: "When were you banned?",
              value: formData.get("whenBanned"),
            },
            {
              name: "Why were you banned?",
              value: formData.get("whyBanned"),
            },
            {
              name: "Do you think the ban was justified? Explain your answer.",
              value: formData.get("banJustified"),
            },
            {
              name: "Why should you be unbanned?",
              value: formData.get("whyUnban"),
            },
          ],
        },
      ],
    }),
  });
};
