"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-fit w-fit py-6 px-8 border border-primary rounded-lg">
        <h2
          className="text-2xl font-semibold pb-2 border-b border-primary highlighted-title"
          aria-label="Log in form`s name"
        >
          Log in
        </h2>
        <form
          className="flex flex-col gap-6 mt-4 w-80"
          aria-label="Log in form"
        >
          <div className="flex flex-col gap-2">
            <Label
              className="highlighted-label"
              aria-label="Username field"
              id="username-field"
            >
              Username
            </Label>
            <Input
              type="text"
              placeholder="Username"
              name="username"
              aria-labelledby="username-field"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label
              className="highlighted-label"
              aria-label="Password field"
              id="password-field"
            >
              Password
            </Label>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              aria-labelledby="password-field"
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
      </div>
    </>
  );
}
