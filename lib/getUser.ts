import { prisma } from "./prisma-client/prisma-client";

export async function getUser(username: string) {
  const user = await prisma.user.findUnique({
    where: { username: username },
  });

  if (!user) {
    return null;
  }

  return user;
}
