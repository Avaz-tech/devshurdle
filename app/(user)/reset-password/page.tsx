"use client";
import { useState } from "react";
import Container from "@components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import PageLayout from "@components/PageLayout";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password: password,
      });
      if (error) {
        console.log('Update error:', error);
        setMessage(error.message || "Error updating password. Please try again.");
      } else {
        setMessage("Password updated successfully. Redirecting...");
        setTimeout(() => {
          window.location.href = "/account";
        }, 2000);
      }
    } catch (err) {
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout className="min-h-screen">
      <section className="w-full bg-gradient-to-b from-mainColor/15 to-transparent pb-16 px-4">
        <Container className="mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Reset Your Password
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter your new password below.
            </p>
          </div>
        </Container>
      </section>

      <section className="w-full py-16 px-4">
        <Container className="mx-auto">
          <div className="max-w-md mx-auto">
            <div className="bg-card rounded-xl border border-border p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="password" className="text-foreground font-medium">
                    New Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-foreground font-medium">
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-mainColor hover:bg-mainColor/90 text-white font-semibold py-3"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Password"}
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
        </Container>
      </section>
    </PageLayout>
  );
}