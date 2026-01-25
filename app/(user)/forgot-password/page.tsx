"use client";
import { useState } from "react";
import Section from "@components/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import PageLayout from "@components/PageLayout";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/reset-password`,
      });
      if (error) {
        setMessage("Error sending reset email. Please try again.");
      } else {
        setMessage("Password reset email sent. Check your inbox.");
      }
    } catch (err) {
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout className="min-h-screen">
      <Section className="bg-gradient-to-b from-mainColor/15 to-transparent pb-16" noPadding={true}>
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Reset Your Password
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-md mx-auto">
          <div className="bg-card rounded-xl border border-border p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-mainColor hover:bg-mainColor/90 text-white font-semibold py-3"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            {message && (
              <p className="text-sm text-center mt-4 text-muted-foreground">
                {message}
              </p>
            )}

            <div className="text-center mt-6">
              <Link
                href="/signIn"
                className="text-sm text-mainColor hover:text-mainColor/80 font-medium"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}