import { createBrowserClient } from "@supabase/ssr";

export function createClient(persist: boolean = true) {
  // Create a supabase client on the browser with project's credentials
  const options: any = {
    auth: {
      persistSession: persist,
    },
  };
  if (persist && typeof window !== 'undefined') {
    options.auth.storage = window.localStorage;
  } else if (!persist && typeof window !== 'undefined') {
    options.auth.storage = window.sessionStorage;
  }
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    options
  );
}