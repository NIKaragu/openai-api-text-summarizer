import { Chat } from "@prisma/client";
import ChatListItem from "./chat-list-item";

export default async function ChatList({ chats }: { chats: Chat[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {chats.map((chat) => (
        <ChatListItem key={chat.id} id={chat.id} chatName={chat.chatName} />
      ))}
    </ul>
  );
}
