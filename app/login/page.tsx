"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  authenticate,
  signInWithGoogle,
  signInWithGithub,
} from "@/lib/auth/sign-in";
import { SignInState } from "@/lib/auth/types/sign-in";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import GoogleLogo from "@/public/google-logo.svg";
import GithubLogo from "@/public/github-logo.svg";

export default function Page() {
  const initialActionState: SignInState = { errors: {}, message: null };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction, isPendingOnAuth] = useActionState<
    SignInState,
    FormData
  >(authenticate, initialActionState);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [googleState, useGoogle, isPendingOnGoogle] = useActionState(
    signInWithGoogle,
    undefined
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [githubState, useGithub, isPendingOnGithub] = useActionState(
    signInWithGithub,
    undefined
  );

  return (
    <>
      <div className="flex flex-col gap-6 items-center justify-center h-fit w-fit py-6 px-8 border border-primary rounded-lg">
        <h2
          className="text-2xl font-semibold pb-2 border-b border-primary highlighted-title"
          aria-label="Log in form`s name"
        >
          Log in
        </h2>
        <form
          className="flex flex-col gap-6 mt-4 w-80"
          aria-label="Log in form"
          action={async (formData) => {
            formAction(formData);
            redirect("/conversation");
          }}
        >
          <div className="flex flex-col gap-2">
            <Label
              className="highlighted-label text-md"
              aria-label="Username field"
              id="username-field"
            >
              Username
            </Label>
            <Input
              type="text"
              placeholder="Enter your username"
              name="username"
              aria-labelledby="username-field"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label
              className="highlighted-label text-md"
              aria-label="Password field"
              id="password-field"
            >
              Password
            </Label>
            <Input
              type="password"
              placeholder="Enter your password"
              name="password"
              aria-labelledby="password-field"
              required
            />
          </div>
          <Button
            type="submit"
            variant="outline-light"
            size="default"
            aria-label="Submit button"
            aria-description="Disabled until the form is filled"
          >
            Log in
          </Button>
        </form>
        <div className="flex gap-3">
          <form action={useGoogle}>
            <Button
              variant="outline-dark"
              size="icon"
              aria-label="Submit button"
            >
              <Image
                src={GoogleLogo}
                alt="google logo"
                width={20}
                height={20}
              />
            </Button>
          </form>
          <form action={useGithub}>
            <Button
              variant="outline-dark"
              size="icon"
              aria-label="Submit button"
            >
              <Image
                src={GithubLogo}
                alt="github logo"
                width={24}
                height={24}
              />
            </Button>
          </form>
        </div>
        <Link
          href={"./login/sign-up"}
          className="text-sm text-foreground hover:text-muted-foreground transition-colors"
        >
          Don`t have an account?
        </Link>
      </div>
    </>
  );
}
