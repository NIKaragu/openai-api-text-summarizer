// import { signOut } from "@/auth";
import SendMessageForm from "@/components/chat/send-message-form";
// import { Button } from "@/components/ui/button";

export default function ChatLayout({
  children,
  chatsList,
}: Readonly<{
  children: React.ReactNode;
  chatsList: React.ReactNode;
}>) {
  return (
    <>
      <aside className="flex min-w-32 max-w-80 w-1/4 h-full border border-t-0 border-l-0 border-primary rounded-br-lg box-border py-4 px-2">
        {chatsList}
      </aside>
      <div className="flex flex-col flex-1 gap-12 justify-end items-center px-2 sm:px-8 xl:px-16 pt-2 sm:py-4 h-full">
        {children}
        <SendMessageForm />
      </div>
      {/* <form
        action={async () => {
          "use server";

          await signOut({ redirect: true, redirectTo: "/" });
        }}
      >
        <Button
          type="submit"
          variant="outline-light"
          size="default"
          aria-label="Submit button"
          aria-description="Disabled until the form is filled"
        >
          Sign Out
        </Button>
      </form> */}
    </>
  );
}
