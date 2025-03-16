// import { Message, Sender } from "@prisma/client";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { chatId } = await params;

  if (!chatId) {
    return <></>;
  }

  return (
    <div>
      <h1>Chat ID: {chatId}</h1>
      <p>Це сторінка для чату з ID {chatId}</p>
    </div>
  );
}
