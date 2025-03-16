"use client";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ArrowUp, Mic } from "lucide-react";

// const FormSchema = z.object({
//   content: z
//     .string()
//     .nonempty("Your message must be at least 1 character long")
//     .max(2000, "Your message must be no longer than 2000 characters"),
// });

export default function SendMessageForm({}) {
  return (
    <div className="flex w-full">
      <form action={async () => {}} className="flex flex-1 gap-2">
        <Textarea
          placeholder="Type your message here..."
          aria-label="Type your message here"
          className="border-0 bg-muted"
        />
        <div className="flex flex-col items-center gap-1 bg-background">
          <Button className="flex-1 w-10 rounded-full">
            <Mic />
          </Button>
          <Button
            variant="outline-dark"
            className="self-end border-0 rounded-full"
            size="icon"
          >
            <ArrowUp />
          </Button>
        </div>
      </form>
    </div>
  );
}
