"use client";

import Link from "next/link";
import { FaLock, FaHome, FaEnvelope, FaShieldAlt } from "react-icons/fa";

// Mock Container component - replace with your actual Container import
const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`max-w-7xl mx-auto ${className}`}>{children}</div>
);

export default function UnauthorizedPage() {
  return (
    <main className="flex justify-center items-center flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-amber-500/10 to-transparent pt-24 pb-16 px-4">
        <Container className="mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500/10 rounded-full mb-6">
              <FaLock className="text-4xl text-amber-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Access Denied</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              This area is restricted to administrators only.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content Section */}
      <section className="w-full py-16 px-4">
        <Container className="mx-auto">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-xl border border-border p-8 shadow-lg mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Why am I seeing this?</h2>
              <p className="text-muted-foreground mb-6">
                The Studio is a content management area where administrators can create and publish blog posts. Regular
                users don't have permission to access this section.
              </p>

              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <FaShieldAlt className="text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Administrator Access Required</p>
                    <p className="text-sm text-muted-foreground">
                      If you believe you should have access to the Studio, please contact the site administrator.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-mainColor hover:bg-mainColor/90 text-white font-semibold rounded-lg transition-all duration-200"
                >
                  <FaHome />
                  Go to Homepage
                </Link>
                <Link
                  href="/blog"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border hover:border-mainColor hover:bg-mainColor/5 text-foreground font-semibold rounded-lg transition-all duration-200"
                >
                  Browse Blog
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Links Section */}
      <section className="w-full py-16 px-4 bg-card/50">
        <Container className="mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Explore DevsHurdle</h2>
              <p className="text-muted-foreground">Check out what you can access</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/blog"
                className="group p-6 bg-background rounded-lg border border-border hover:border-mainColor hover:bg-mainColor/5 transition-all duration-200"
              >
                <div className="w-12 h-12 bg-mainColor/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-mainColor transition-colors">
                  Read Blog Posts
                </h3>
                <p className="text-muted-foreground text-sm">
                  Explore our collection of coding tutorials and solutions
                </p>
              </Link>

              <Link
                href="/contact"
                className="group p-6 bg-background rounded-lg border border-border hover:border-mainColor hover:bg-mainColor/5 transition-all duration-200"
              >
                <div className="w-12 h-12 bg-mainColor/10 rounded-full flex items-center justify-center mb-4">
                  <FaEnvelope className="text-mainColor" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-mainColor transition-colors">
                  Get in Touch
                </h3>
                <p className="text-muted-foreground text-sm">Have questions? Reach out to us</p>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Support Section */}
      <section className="w-full py-16 px-4">
        <Container className="mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Need Administrator Access?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              If you're supposed to have access to the Studio, please contact us and we'll help you out
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-mainColor hover:bg-mainColor/90 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              Contact Administrator
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
