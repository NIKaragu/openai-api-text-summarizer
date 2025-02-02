import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function Page() {
  return (
    <div>
      <h2>Conversation</h2>
      <form
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
      </form>
    </div>
  );
}
