"use server";

import bcryptjs from "bcryptjs";
import { z } from "zod";
import { getUser } from "../getUser";
import { prisma } from "../prisma-client/prisma-client";
import { signIn } from "@/auth";

const SignUpSchema = z.object({
  username: z
    .string()
    .min(2, "Username should be at least 2 characters long")
    .max(20, "Username should be less than 30 characters long"),
  password: z.string().min(8, "Password should be at least 8 characters long"),
  confirmPassword: z.string(),
});

export type SignUpState = {
  errors?: {
    username?: string[];
    password?: string[];
    confirmPAssword?: string[];
  };
  message?: string | null;
};

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

  await signIn("credentials", formData);

  return { success: true, user: user };
}
