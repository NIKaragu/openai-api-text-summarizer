"use server";

import bcryptjs from "bcryptjs";
import { getUser } from "../getUser";
import { prisma } from "../prisma-client/prisma-client";
import { signIn } from "@/auth";
import { SignUpSchema } from "./schemas/sign-up";
import { SignUpState } from "./types/sign-up";

export async function signUp(state: SignUpState, formData: FormData) {
  const validatedFields = SignUpSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Registration failed",
    };
  }

  const { username, password } = validatedFields.data;

  const isUserExists = await getUser(username);

  if (isUserExists) {
    return {
      errors: {
        username: ["User with this username already exists"],
      },
      message: "Registration failed",
    };
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const user = await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
    },
  });

  await signIn("credentials", {
    username,
    password,
    redirectTo: "/conversation",
  });

  return { success: true, user: user };
}
