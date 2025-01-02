"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
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
            >
              Confirm password
            </Label>
            <Input
              type="password"
              placeholder="Confirm your assword"
              name="password-confirmation"
              aria-labelledby="password-confirmation-field"
            />
          </div>
          <Button
            type="submit"
            variant="outline-light"
            size="default"
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
