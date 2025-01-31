import { z } from "zod";

export const SignInSchema = z.object({
  username: z.string().min(2, "Username should be at least 2 characters long"),
  password: z.string().min(8, "Password should be at least 8 characters long"),
});
