import { Input, TextArea } from "@/components/ui/input";
import SubmitButton from "@/components/ui/submit-button";
import { addUserToGuild, sendAppealToWehook } from "@/lib/utils";
import { auth } from "auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  async function submitAppeal(formData: FormData) {
    "use server";

    if (!session || !session.user) {
      return;
    }

    // send data to Discord webhook
    const sendWehookResponse = await sendAppealToWehook(session, formData);

    if (sendWehookResponse.status !== 204) {
      redirect("/error?message=Failed to submit appeal, please try again or contact..");
    }

    // @ts-ignore
    const addUserResponse = await addUserToGuild(
      session.user.id!,
      // @ts-ignore
      session.sessionToken,
    );

    if (addUserResponse.status !== 201) {
      redirect(
        "/error?message=Failed to add user to guild, please try again or contact..",
      );
    }

    redirect("/success");
  }

  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">r/Jailbreak Unban Appeals Form</h1>
      <p>
        This form is to be filled out if you were banned from the r/Jailbreak
        discord server and you are looking to get unbanned. It is not
        recommended to appeal within 3 months of your ban. Also, you cannot fill
        this out on behalf of someone else.
      </p>

      <p>
        By signing in, you give us access to basic information such as your
        Discord username and ID. You will also automatically join our appeal
        server where you will await your decision.
      </p>
      {!session?.user ? (
        <p>
          To continue, please <em>Sign In</em> with Discord first.
        </p>
      ) : (
        <div className="pt-4">
          <form
            className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
            action={submitAppeal}
          >
            <label className="font-medium text-sm" htmlFor="username">
              Username
            </label>
            <Input
              name="username"
              type="text"
              placeholder="Discord Username"
              disabled
              value={session.user.name!}
            />
            <label className="font-medium text-sm" htmlFor="id">
              ID
            </label>
            <Input
              name="id"
              type="text"
              placeholder="Discord ID"
              disabled
              value={session.user.id!}
            />

            <label className="font-medium text-sm" htmlFor="whenBanned">
              Approximately when were you banned?
            </label>
            <Input name="whenBanned" type="date" placeholder="Discord ID" />
            <label className="font-medium text-sm" htmlFor="whyBanned">
              Why were you banned?
            </label>
            <TextArea name="whyBanned" rows={4} />
            <label className="font-medium text-sm" htmlFor="banJustified">
              Do you think the ban was justified? Explain your answer.
            </label>
            <TextArea name="banJustified" rows={4} />
            <label className="font-medium text-sm" htmlFor="whyUnban">
              Why do you think you should be unbanned?
            </label>
            <TextArea name="whyUnban" rows={4} />
            <SubmitButton />
          </form>
        </div>
      )}
    </div>
  );
}