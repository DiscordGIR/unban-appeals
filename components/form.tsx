"use client";

import { submitAppeal } from "@/actions/submit-action";
import { Input, TextArea } from "@/components/ui/input";
import SubmitButton from "@/components/ui/submit-button";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useToast } from "./ui/use-toast";
import Alert from "./ui/alert";

const Form = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmitAppeal(formData: FormData) {
    const result = await submitAppeal(formData);

    if (result?.error) {
      return toast({
        title: "An unexpected error occured",
        description: result.error,
        variant: "destructive",
      });
    }

    setSubmitted(true);
  }

  if (!session?.user) {
    return (
      <p>
        To continue, please <em>Sign In</em> with Discord first.
      </p>
    );
  }

  if (submitted) {
    return (
      <Alert variant="success">
        Your appeal has been submitted! You have now been put in our appeals
        server. A moderator or administrator will contact you when your case has
        been voted on.
      </Alert>
    );
  }

  return (
    <form
      className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      action={handleSubmitAppeal}
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
  );
};

export default Form;
