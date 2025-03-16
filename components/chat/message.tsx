import { cn } from "@/lib/utils";
import { Message, Sender } from "@prisma/client";

export default function MessageRepr({
  message,
}: {
  message: Omit<Message, "createdAt">;
}) {
  const styles = {
    [Sender.User]:
      "flex bg-secondary text-white w-2/3 sm:w-1/2 max-w-lg self-end p-4 rounded-lg",
    [Sender.AI]: "flex bg-background text-white w-full",
  };

  return <div className={cn(styles[message.sender])}>{message.content}</div>;
}
