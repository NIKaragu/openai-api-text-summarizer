import MessageRepr from "@/components/chat/message";
import { Message, Sender } from "@prisma/client";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { chatId } = await params;

  const chatData: Omit<Message, "createdAt">[] = [
    {
      chatId: 1,
      id: 1,
      sender: Sender.User,
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, deserunt error! Alias explicabo, odit numquam eos nulla blanditiis nesciunt maiores! Minus et sit laborum aperiam asperiores veritatis commodi. Laboriosam, doloribus",
      isVersionActive: true,
      version: 1,
    },
    {
      chatId: 1,
      id: 2,
      sender: Sender.AI,
      content:
        "AI Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, deserunt error! Alias explicabo, odit numquam eos nulla blanditiis nesciunt maiores! Minus et sit laborum aperiam asperiores veritatis commodi. Laboriosam, doloribus",
      isVersionActive: true,
      version: 1,
    },
    {
      chatId: 1,
      id: 3,
      sender: Sender.User,
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, deserunt error! Alias explicabo, odit numquam eos nulla blanditiis nesciunt maiores! Minus et sit laborum aperiam asperiores veritatis commodi. Laboriosam, doloribus",
      isVersionActive: true,
      version: 1,
    },
    {
      chatId: 1,
      id: 4,
      sender: Sender.AI,
      content:
        "AI Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, deserunt error! Alias explicabo, odit numquam eos nulla blanditiis nesciunt maiores! Minus et sit laborum aperiam asperiores veritatis commodi. Laboriosam, doloribus",
      isVersionActive: true,
      version: 1,
    },
    {
      chatId: 1,
      id: 5,
      sender: Sender.User,
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, deserunt error! Alias explicabo, odit numquam eos nulla blanditiis nesciunt maiores! Minus et sit laborum aperiam asperiores veritatis commodi. Laboriosam, doloribus",
      isVersionActive: true,
      version: 1,
    },
    {
      chatId: 1,
      id: 6,
      sender: Sender.AI,
      content:
        "AI Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, deserunt error! Alias explicabo, odit numquam eos nulla blanditiis nesciunt maiores! Minus et sit laborum aperiam asperiores veritatis commodi. Laboriosam, doloribus",
      isVersionActive: true,
      version: 1,
    },
    {
      chatId: 1,
      id: 7,
      sender: Sender.User,
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, deserunt error! Alias explicabo, odit numquam eos nulla blanditiis nesciunt maiores! Minus et sit laborum aperiam asperiores veritatis commodi. Laboriosam, doloribus",
      isVersionActive: true,
      version: 1,
    },
    {
      chatId: 1,
      id: 8,
      sender: Sender.AI,
      content:
        "AI Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, deserunt error! Alias explicabo, odit numquam eos nulla blanditiis nesciunt maiores! Minus et sit laborum aperiam asperiores veritatis commodi. Laboriosam, doloribus",
      isVersionActive: true,
      version: 1,
    },
  ];

  if (!chatId) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-6 h-full w-full overflow-scroll scroll-smooth no-scrollbar py-6">
      {chatData.map((message) => (
        <MessageRepr message={message} key={message.id} />
      ))}
    </div>
  );
}
