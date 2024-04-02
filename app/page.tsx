import { auth } from "auth";
import Form from "@/components/form";
import { SessionProvider } from "next-auth/react";

export default async function Page() {
  const session = await auth();
  const cleanedSession = { expires: "", user: {} };

  if (session?.user) {
    cleanedSession.user = {
      name: session.user.name,
      id: session.user.id,
    };
    cleanedSession.expires = session.expires;
  }

  return (
    <SessionProvider session={cleanedSession} basePath="/auth">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">r/Jailbreak Unban Appeals Form</h1>
        <p>
          This form is to be filled out if you were banned from the r/Jailbreak
          discord server and you are looking to get unbanned. It is not
          recommended to appeal within 3 months of your ban. Also, you cannot
          fill this out on behalf of someone else.
        </p>

        <p>
          By signing in, you give us access to basic information such as your
          Discord username and ID. You will also automatically join our appeal
          server where you will await your decision.
        </p>
        {!session || !session.user ? (
          <p>
            To continue, please <em>Sign In</em> with Discord first.
          </p>
        ) : (
          <div className="pt-4">
            <Form />
          </div>
        )}
      </div>
    </SessionProvider>
  );
}
