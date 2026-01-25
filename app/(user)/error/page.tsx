"use client";

import Section from "@components/Section";
import Link from "next/link";
import { FaExclamationTriangle, FaHome, FaSearch, FaRedo } from "react-icons/fa";

export default function ErrorPage() {
  return (
    <main className="flex justify-center items-center flex-col min-h-screen">
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-red-500/10 to-transparent pt-24 pb-16" noPadding={true}>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 rounded-full mb-6">
            <FaExclamationTriangle className="text-4xl text-red-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Oops! Something Went Wrong</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We encountered an unexpected error. Don't worry, it's not your fault!
          </p>
        </div>
      </Section>

      {/* Error Details Section */}
      <Section>
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-xl border border-border p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">What happened?</h2>
            <p className="text-muted-foreground mb-6">
              An unexpected error occurred while processing your request. Our team has been notified and is working to
              fix the issue.
            </p>

            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Error Code:</strong> 500 - Internal Server Error
              </p>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-3">Try these solutions:</h3>
            <ul className="space-y-2 text-muted-foreground mb-8">
              <li className="flex items-start gap-2">
                <span className="text-mainColor mt-1">•</span>
                <span>Refresh the page to try again</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-mainColor mt-1">•</span>
                <span>Clear your browser cache and cookies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-mainColor mt-1">•</span>
                <span>Check your internet connection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-mainColor mt-1">•</span>
                <span>Try again in a few minutes</span>
              </li>
            </ul>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-mainColor hover:bg-mainColor/90 text-white font-semibold rounded-lg transition-all duration-200"
              >
                <FaRedo />
                Reload Page
              </button>
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

      {/* Quick Links Section */}
      <Section className="bg-card/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">While You're Here</h2>
            <p className="text-muted-foreground">Explore other sections of DevsHurdle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/blog"
              className="group p-6 bg-background rounded-lg border border-border hover:border-mainColor hover:bg-mainColor/5 transition-all duration-200"
            >
              <div className="w-12 h-12 bg-mainColor/10 rounded-full flex items-center justify-center mb-4">
                <FaSearch className="text-mainColor" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-mainColor transition-colors">
                Browse Solutions
              </h3>
              <p className="text-muted-foreground text-sm">Explore our library of coding solutions and tutorials</p>
            </Link>

            <Link
              href="/blog"
              className="group p-6 bg-background rounded-lg border border-border hover:border-mainColor hover:bg-mainColor/5 transition-all duration-200"
            >
              <div className="w-12 h-12 bg-mainColor/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-mainColor transition-colors">
                Latest Articles
              </h3>
              <p className="text-muted-foreground text-sm">Read the newest posts and coding tips</p>
            </Link>

            <Link
              href="/"
              className="group p-6 bg-background rounded-lg border border-border hover:border-mainColor hover:bg-mainColor/5 transition-all duration-200"
            >
              <div className="w-12 h-12 bg-mainColor/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-mainColor transition-colors">
                Homepage
              </h3>
              <p className="text-muted-foreground text-sm">Return to the main page and start fresh</p>
            </Link>
          </div>
        </div>
      </Section>

      {/* Contact Support Section */}
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Still Having Issues?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            If the problem persists, our support team is here to help you get back on track
          </p>
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
