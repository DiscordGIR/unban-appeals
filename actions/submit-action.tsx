"use server";

import { auth } from "@/auth";
import { addUserToGuild, sendAppealToWehook } from "./util-actions";

async function submitAppeal(formData: FormData) {
  const session = await auth();
  if (!session || !session.user) {
    return;
  }
  
  const addUserResponse = await addUserToGuild(
    session.user.id!,
    // @ts-ignore
    session.sessionToken,
  );

  if (addUserResponse.status !== 201 && addUserResponse.status !== 204) {
    console.error(addUserResponse.status, addUserResponse.statusText);
    return {
      error:
        "Failed to add you to the appeals Discord server. Make sure you haven't reached the limit of servers you can join. If not, please try again later.",
    };
  }

  // send data to Discord webhook
  const sendWehookResponse = await sendAppealToWehook(session, formData);

  if (sendWehookResponse.status !== 204) {
    console.error(sendWehookResponse.status, sendWehookResponse.statusText);
    return {
      error: "Failed to submit appeal, please try again or contact @aaron on Discord",
    };
  }

}

export { submitAppeal };
