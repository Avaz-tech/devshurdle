import AccountForm from "./account-form";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@lib/auth/get-user";
import { redirect } from "next/navigation";

export default async function Account() {
  const user = await getUser();

  if (!user) {
    redirect("/signIn");
  }

  return <AccountForm user={user} />;
}
