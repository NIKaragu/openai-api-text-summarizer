"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { SignInState } from "./types/sign-in";
import { SignInSchema } from "./schemas/sign-in";

export async function authenticate(
  state: SignInState,
  formData: FormData
): Promise<SignInState> {
  const credentials = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const parsedCredentials = SignInSchema.safeParse(credentials);
  const isParsedSuccessfully = parsedCredentials.success;
  const parsingErrors = parsedCredentials.error?.flatten().fieldErrors;
  const USERNAME_ERROR = parsingErrors?.username && parsingErrors?.username[0];
  const PASSWORD_ERROR = parsingErrors?.password && parsingErrors?.password[0];

  if (!isParsedSuccessfully) {
    return {
      errors: parsingErrors,
      message: USERNAME_ERROR || PASSWORD_ERROR,
    };
  }

  try {
    await signIn("credentials", {
      ...credentials,
      redirect: false,
    });

    return { message: "Successfully logged in!" };
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
      errors: { username: ["Unexpected error occured"] },
      message: error as string,
    };
  }
}

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/chat", redirect: true });
}

export async function signInWithGithub() {
  await signIn("github", { redirectTo: "/chat", redirect: true });
}
