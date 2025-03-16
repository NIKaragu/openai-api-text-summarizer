import { X } from "lucide-react";
import Link from "next/link";

export default async function ChatListItem({
  id,
  chatName,
}: {
  id: number;
  chatName: string;
}) {
  return (
    <li className="group flex justify-between items-center p-1 pl-2 w-full rounded-md transition-colors hover:bg-muted cursor-pointer relative">
      <Link href={`/chat/${id}`} className="inline-flex w-full h-full">
        {chatName}
      </Link>
      <button className="hidden group-hover:block">
        <X className="h-4 w-4 hover:icon-shadow-primary-sm active:icon-shadow-primary-md transition-all" />
      </button>
    </li>
  );
}
