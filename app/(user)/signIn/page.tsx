"use client";
import { useState } from "react";
import Container from "@components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { login, signinWithGithub, signinWithGoogle, signup } from "./actions";
import { createClient } from "@/lib/supabase/client";
import Breadcrumb from "@components/Breadcrumb";

export default function SignInPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    if (isSignUp) {
      signup(formData);
    } else {
      const supabase = createClient(formData.rememberMe);
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        console.error("Sign in error:", error);
        // You can add error handling here, like showing a message
      } else {
        window.location.href = "/account";
      }
    }
  };

  return (
    <main className="flex justify-center items-center flex-col min-h-screen pt-24">
      {/* Breadcrumb Navigation */}
      <Container className="mx-auto mb-6 px-4">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Sign In" }]} />
      </Container>

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-mainColor/15 to-transparent pb-16 px-4">
        <Container className="mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {isSignUp ? "Join DevsHurdle" : "Welcome Back"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isSignUp
                ? "Create your account to access personalized solutions and save your favorite coding resources."
                : "Sign in to access your personalized dashboard and continue your coding journey."}
            </p>
          </div>
        </Container>
      </section>

      {/* Auth Form Section */}
      <section className="w-full py-16 px-4">
        <Container className="mx-auto">
          <div className="max-w-md mx-auto">
            <div className="bg-card rounded-xl border border-border p-8 shadow-lg">
              {/* Toggle Buttons */}
              <div className="flex rounded-lg bg-muted p-1 mb-8">
                <button
                  onClick={() => setIsSignUp(false)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    !isSignUp
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsSignUp(true)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    isSignUp ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Social Auth Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-card border border-border rounded-lg hover:border-mainColor hover:bg-mainColor/5 transition-all"
                  onClick={signinWithGoogle}
                >
                  <FaGoogle className="text-red-500" />
                  <span className="text-foreground font-medium">Continue with Google</span>
                </button>
                <button
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-card border border-border rounded-lg hover:border-mainColor hover:bg-mainColor/5 transition-all"
                  onClick={signinWithGithub}
                >
                  <FaGithub className="text-foreground" />
                  <span className="text-foreground font-medium">Continue with GitHub</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">Or continue with email</span>
                </div>
              </div>

              {/* Auth Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div>
                    <Label htmlFor="name" className="text-foreground font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1"
                      required
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-foreground font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                    autoComplete="true"
                  />
                </div>

                {isSignUp && (
                  <div>
                    <Label htmlFor="confirmPassword" className="text-foreground font-medium">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="mt-1"
                      required
                      autoComplete="true"
                    />
                  </div>
                )}

                {!isSignUp && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                        className="rounded border-border"
                      />
                      <span className="ml-2 text-sm text-muted-foreground">Remember me</span>
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-mainColor hover:text-mainColor/80 font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-mainColor hover:bg-mainColor/90 text-white font-semibold py-3"
                >
                  {isSignUp ? "Create Account" : "Sign In"}
                </Button>
              </form>

              {/* Terms and Privacy */}
              {isSignUp && (
                <p className="text-xs text-muted-foreground text-center mt-4">
                  By creating an account, you agree to our{" "}
                  <Link href="/terms" className="text-mainColor hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-mainColor hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 px-4 bg-card/50">
        <Container className="mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose DevsHurdle?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of developers who trust DevsHurdle for their coding solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-mainColor/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Quick Solutions</h3>
              <p className="text-muted-foreground">Find practical coding solutions in seconds, not hours</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-mainColor/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Real-World Problems</h3>
              <p className="text-muted-foreground">Solutions built from actual development challenges</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-mainColor/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Well-Documented</h3>
              <p className="text-muted-foreground">Clear explanations and code examples for every solution</p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
