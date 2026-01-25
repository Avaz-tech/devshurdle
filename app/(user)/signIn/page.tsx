"use client";
import { useState } from "react";
import Section from "@components/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGithub, FaGoogle, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { login, signInWithGithub, signInWithGoogle, signup } from "./actions";
import { createClient } from "@/lib/supabase/client";
import PageLayout from "@components/PageLayout";

type AlertType = "error" | "success" | null;

export default function SignInPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: AlertType; message: string }>({
    type: null,
    message: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (alert.type) {
      setAlert({ type: null, message: "" });
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = (): boolean => {
    if (!formData.email || !formData.password) {
      setAlert({ type: "error", message: "Please fill in all required fields" });
      return false;
    }

    if (isSignUp) {
      if (!formData.name) {
        setAlert({ type: "error", message: "Please enter your full name" });
        return false;
      }
      if (formData.password.length < 6) {
        setAlert({ type: "error", message: "Password must be at least 6 characters long" });
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setAlert({ type: "error", message: "Passwords do not match" });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setAlert({ type: null, message: "" });

    try {
      if (isSignUp) {
        const result = await signup(formData);

        if (result?.error) {
          setAlert({
            type: "error",
            message: result.error?.message || "Failed to create account. Please try again.",
          });
        } else if (result?.success) {
          setAlert({
            type: "success",
            message: "Account created successfully! Please check your email to verify your account.",
          });
          // Reset form
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            rememberMe: false,
          });
        }
      } else {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            setAlert({
              type: "error",
              message: "Invalid email or password. Please check your credentials and try again.",
            });
          } else if (error.message.includes("Email not confirmed")) {
            setAlert({
              type: "error",
              message:
                "Please verify your email address before signing in. Check your inbox for the verification link.",
            });
          } else {
            setAlert({
              type: "error",
              message: error.message || "Failed to sign in. Please try again.",
            });
          }
        } else {
          setAlert({ type: "success", message: "Sign in successful! Redirecting..." });
          setTimeout(() => {
            window.location.href = "/account";
          }, 1000);
        }
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    setIsLoading(true);
    setAlert({ type: null, message: "" });

    try {
      if (provider === "google") {
        await signInWithGoogle();
      } else {
        await signInWithGithub();
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to sign in. Please try again.",
      });
      setIsLoading(false);
    }
  };

  const handleToggleMode = () => {
    setIsSignUp(!isSignUp);
    setAlert({ type: null, message: "" });
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    });
  };

  return (
    <PageLayout className="min-h-screen">
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-mainColor/15 to-transparent pb-16" noPadding={false}>
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
      </Section>

      {/* Auth Form Section */}
      <Section>
        <div className="max-w-md mx-auto">
          <div className="bg-card rounded-xl border border-border p-8 shadow-lg">
            {/* Alert Message */}
            {alert.type && (
              <div
                className={`mb-6 p-4 rounded-lg border ${
                  alert.type === "error"
                    ? "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400"
                    : "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400"
                } animate-in fade-in slide-in-from-top-2 duration-300`}
              >
                <div className="flex items-start gap-3">
                  {alert.type === "error" ? (
                    <FaExclamationCircle className="text-lg mt-0.5 flex-shrink-0" />
                  ) : (
                    <FaCheckCircle className="text-lg mt-0.5 flex-shrink-0" />
                  )}
                  <p className="text-sm font-medium">{alert.message}</p>
                </div>
              </div>
            )}

            {/* Toggle Buttons */}
            <div className="flex rounded-lg bg-muted p-1 mb-8">
              <button
                onClick={handleToggleMode}
                disabled={isLoading}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  !isSignUp ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Sign In
              </button>
              <button
                onClick={handleToggleMode}
                disabled={isLoading}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  isSignUp ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Sign Up
              </button>
            </div>

            {/* Social Auth Buttons */}
            <div className="space-y-3 mb-6">
              <button
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-card border border-border rounded-lg hover:border-mainColor hover:bg-mainColor/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleOAuthSignIn("google")}
                disabled={isLoading}
                type="button"
              >
                <FaGoogle className="text-red-500" />
                <span className="text-foreground font-medium">Continue with Google</span>
              </button>
              <button
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-card border border-border rounded-lg hover:border-mainColor hover:bg-mainColor/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleOAuthSignIn("github")}
                disabled={isLoading}
                type="button"
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
                    disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                  required
                  autoComplete="current-password"
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
                    disabled={isLoading}
                    required
                    autoComplete="new-password"
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
                      disabled={isLoading}
                    />
                    <span className="ml-2 text-sm text-muted-foreground">Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm text-mainColor hover:text-mainColor/80 font-medium">
                    Forgot password?
                  </Link>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-mainColor hover:bg-mainColor/90 text-white font-semibold py-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>{isSignUp ? "Create Account" : "Sign In"}</>
                )}
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
      </Section>

      {/* Features Section */}
      <Section className="bg-card/50">
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
      </Section>
    </PageLayout>
  );
}
