"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { SignInState } from "./types/sign-in";

export async function authenticate(
  state: SignInState,
  formData: FormData
): Promise<SignInState> {
  try {
    await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    return { errors: {}, message: "Successfully logged in!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            errors: {
              username: ["Invalid username or password"],
            },
            message: "Invalid username or password",
          };
        default:
          return {
            errors: {},
            message: "Authentication failed. Connect a support team",
          };
      }
    }
    return {
      errors: {},
      message: error as string,
    };
  }
}

export async function signInWithGoogle() {
  await signIn("google", { callbackUrl: "/conversation" });
}

export async function signInWithGithub() {
  await signIn("github", { callbackUrl: "/conversation" });
}
