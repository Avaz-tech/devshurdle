"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error };
  }

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        full_name: formData.name,
        name: formData.name,
      },
    },
  };

  const { data: authData, error } = await supabase.auth.signUp(data);

  if (error) {
    return { error };
  }

  // If user was created, update their profile
  if (authData.user) {
    await supabase.from("profiles").upsert({
      id: authData.user.id,
      full_name: formData.name,
      updated_at: new Date().toISOString(),
    });
  }

  revalidatePath("/", "layout");

  // Don't redirect immediately for sign up - let them see the verification message
  return { success: true };
}

// Sign in with Google
export async function signInWithGoogle() {
  const supabase = await createClient();

  const isLocalEnv = process.env.NODE_ENV === "development";
  const redirectUrl = isLocalEnv
    ? "http://localhost:3000/auth/callback"
    : "https://devshurdle.vercel.app/auth/callback";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl,
      skipBrowserRedirect: false,
    },
  });

  if (error) {
    console.error("Google OAuth error:", error);
    return { error };
  }

  if (data.url) {
    redirect(data.url);
  }
}

// Sign in with GitHub
export async function signInWithGithub() {
  const supabase = await createClient();

  const isLocalEnv = process.env.NODE_ENV === "development";
  const redirectUrl = isLocalEnv
    ? "http://localhost:3000/auth/callback"
    : "https://devshurdle.vercel.app/auth/callback";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: redirectUrl,
      skipBrowserRedirect: false,
    },
  });

  if (error) {
    console.error("GitHub OAuth error:", error);
    return { error };
  }

  if (data.url) {
    redirect(data.url);
  }
}
