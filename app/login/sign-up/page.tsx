"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth/sign-up";
import { SignUpState } from "@/lib/auth/types/sign-up";
import { useActionState } from "react";

export default function Page() {
  const initialActionState: SignUpState = { errors: {}, message: null };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction, isPending] = useActionState<SignUpState, FormData>(
    signUp,
    initialActionState
  );

  return (
    <>
      <div className="flex flex-col gap-6 items-center justify-center h-fit w-fit py-6 px-8 border border-primary rounded-lg">
        <h2
          className="text-2xl font-semibold pb-2 border-b border-primary highlighted-title"
          aria-label="Log in form`s name"
        >
          Sign up
        </h2>
        <form
          className="flex flex-col gap-6 mt-4 w-80"
          aria-label="Log in form"
          action={formAction}
        >
          <div className="flex flex-col gap-2">
            <Label
              className="highlighted-label text-md"
              aria-label="Username field"
              id="username-field"
              htmlFor="username"
            >
              Username
            </Label>
            <Input
              type="text"
              placeholder="Enter your username"
              name="username"
              aria-labelledby="username-field"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label
              className="highlighted-label text-md"
              aria-label="Password field"
              id="password-field"
              htmlFor="password"
            >
              Password
            </Label>
            <Input
              type="password"
              placeholder="Enter your assword"
              name="password"
              aria-labelledby="password-field"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label
              className="highlighted-label text-md"
              aria-label="Password confirmation field"
              id="password-confirmation-field"
              htmlFor="confirmPassword"
            >
              Confirm password
            </Label>
            <Input
              type="password"
              placeholder="Confirm your assword"
              name="confirmPassword"
              aria-labelledby="password-confirmation-field"
            />
          </div>
          <Button
            type="submit"
            variant="outline-light"
            aria-label="Submit button"
            aria-description="Disabled until the form is filled"
          >
            Sign up
          </Button>
        </form>
      </div>
    </>
  );
}
