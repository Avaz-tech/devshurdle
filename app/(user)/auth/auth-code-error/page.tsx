"use client";

import Section from "@components/Section";
import Link from "next/link";
import { FaExclamationCircle, FaRedo, FaHome, FaGoogle, FaGithub } from "react-icons/fa";

export default function AuthCodeErrorPage() {
  return (
    <main className="flex justify-center items-center flex-col min-h-screen">
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-red-500/10 to-transparent pt-24 pb-16" noPadding={true}>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 rounded-full mb-6">
            <FaExclamationCircle className="text-4xl text-red-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Authentication Failed</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We couldn't complete your sign-in process. Don't worry, this is usually easy to fix!
          </p>
        </div>
      </Section>

      {/* Error Details Section */}
      <Section>
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-xl border border-border p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">What went wrong?</h2>
            <p className="text-muted-foreground mb-6">
              The authentication code from your sign-in provider (Google or GitHub) couldn't be verified. This can
              happen for several reasons.
            </p>

            <h3 className="text-lg font-semibold text-foreground mb-3">Common causes:</h3>
            <ul className="space-y-2 text-muted-foreground mb-8">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>The authentication session expired (took too long to complete)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>You clicked the authentication link more than once</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Your browser blocked third-party cookies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Network interruption during the sign-in process</span>
              </li>
            </ul>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Quick Fix</p>
                  <p className="text-sm text-muted-foreground">
                    Simply try signIng in again. Most authentication issues resolve themselves on the second attempt.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/signIn"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-mainColor hover:bg-mainColor/90 text-white font-semibold rounded-lg transition-all duration-200"
              >
                <FaRedo />
                Try Again
              </Link>
              <Link
                href="/"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border hover:border-mainColor hover:bg-mainColor/5 text-foreground font-semibold rounded-lg transition-all duration-200"
              >
                <FaHome />
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Sign-in Options Section */}
      <Section className="bg-card/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Try a Different Sign-In Method</h2>
            <p className="text-muted-foreground">If one method isn't working, you can try another</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link
              href="/signIn"
              className="group p-6 bg-background rounded-lg border border-border hover:border-mainColor hover:bg-mainColor/5 transition-all duration-200"
            >
              <div className="w-12 h-12 bg-mainColor/10 rounded-full flex items-center justify-center mb-4">
                <FaGoogle className="text-mainColor text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-mainColor transition-colors">
                Sign in with Google
              </h3>
              <p className="text-muted-foreground text-sm">
                Quick and secure authentication with your Google account
              </p>
            </Link>

            <Link
              href="/signIn"
              className="group p-6 bg-background rounded-lg border border-border hover:border-mainColor hover:bg-mainColor/5 transition-all duration-200"
            >
              <div className="w-12 h-12 bg-mainColor/10 rounded-full flex items-center justify-center mb-4">
                <FaGithub className="text-mainColor text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-mainColor transition-colors">
                Sign in with GitHub
              </h3>
              <p className="text-muted-foreground text-sm">Use your GitHub account for developer-focused access</p>
            </Link>
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">Or use email and password</p>
            <Link href="/signIn" className="inline-block text-mainColor hover:text-mainColor/80 font-medium">
              Sign in with email →
            </Link>
          </div>
        </div>
      </Section>

      {/* Still Having Issues Section */}
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Still Can't Sign In?</h2>
          <p className="text-muted-foreground text-lg mb-6">Here are some additional steps you can try:</p>

          <div className="bg-card rounded-lg border border-border p-6 text-left mb-8">
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-mainColor font-bold">1.</span>
                <span>Clear your browser cache and cookies</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-mainColor font-bold">2.</span>
                <span>Try using a different browser or incognito/private mode</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-mainColor font-bold">3.</span>
                <span>Disable browser extensions that might block authentication</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-mainColor font-bold">4.</span>
                <span>Check if your firewall or VPN is interfering</span>
              </li>
            </ul>
          </div>

          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-mainColor hover:bg-mainColor/90 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
          >
            Contact Support
          </Link>
        </div>
      </Section>
    </main>
  );
}
