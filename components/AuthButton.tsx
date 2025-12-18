import Link from "next/link";
import type { User } from "@supabase/supabase-js";

type UserProps = {
  user: User | null;
};

export default function AuthButton({ user }: UserProps) {
  if (user) {
    return (
      <form action="/auth/signout" method="post">
        <button className="text-sm relative group overflow-hidden text-foreground">Sign out</button>
      </form>
    );
  }

  return (
    <Link href="/signIn" className="text-sm relative group overflow-hidden text-foreground">
      Sign in
    </Link>
  );
}
