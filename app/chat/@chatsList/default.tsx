import { Chat } from "@prisma/client";
import ChatList from "@/components/chat/chat-list/chat-list";

export default async function ChatListSlot({}) {
  const chats: Chat[] = [
    {
      id: 1,
      chatName: "Chat 1",
      userId: "1",
      createdAt: new Date(),
    },
    { id: 2, chatName: "Chat 2", userId: "1", createdAt: new Date() },
    { id: 3, chatName: "Chat 3", userId: "1", createdAt: new Date() },
    { id: 4, chatName: "Chat 4", userId: "1", createdAt: new Date() },
    { id: 5, chatName: "Chat 5", userId: "1", createdAt: new Date() },
  ];
  return (
    <div className="flex flex-col gap-4 w-full">
      <header className="text-xl font-semibold">Chats List</header>
      <nav>
        <ChatList chats={chats} />
      </nav>
    </div>
  );
}
