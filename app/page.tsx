import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="flex flex-col gap-6 mb-20 justify-center">
      <div className="flex flex-col gap-3">
        <h2 className="text-center font-semibold text-3xl highlighted-label">
          Welcome to Touch to AI
        </h2>
        <p>
          Touch to AI is a web application that uses the power of AI to help you
          to find a solution of all of your problems.
        </p>
      </div>
      <div className="flex gap-2 items-center justify-center rounded-lg">
        <Link href={"/login"}>
          <Button
            variant={"outline-light"}
            size={"lg"}
            aria-label="Submit button"
            className=""
          >
            Log in
          </Button>
        </Link>
        <Button
          variant={"secondary"}
          size={"lg"}
          aria-label="Submit button"
          className=""
        >
          Use guest account
        </Button>
      </div>
    </div>
  );
}
