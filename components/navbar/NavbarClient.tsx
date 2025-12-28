"use client";

import Logo from "../Logo";
import Link from "next/link";
import { FiMenu, FiX, FiLogOut, FiSettings, FiLayout } from "react-icons/fi";
import { ModeToggle } from "../ModeToggle";
import AuthButton from "../AuthButton";
import { usePathname } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";

export default function NavbarClient({ user, userRole }: { user: User | null; userRole: string }) {
  const pathname = usePathname();
  const isAuthPage = useMemo(() => pathname.startsWith("/sign"), [pathname]);
  const isAdmin = userRole === "admin";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationData = [
    { title: "Home", href: "/" },
    { title: "Blog", href: "/blog" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle body scroll and cleanup
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Navbar */}
      <nav className="w-full h-20 shadow-custom-medium transition-colors z-50 border-b border-primary bg-background/95 backdrop-blur-sm fixed top-0">
        <div className="max-w-screen-xl flex items-center justify-between mx-4 xl:mx-auto h-full font-medium">
          {/* Logo */}
          <Logo title="DH" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            {navigationData.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm relative group overflow-hidden transition-colors ${
                  pathname === item.href ? "text-mainColor" : "text-foreground hover:text-mainColor"
                }`}
              >
                {item.title}
                <span
                  className={`w-full h-[2px] bg-mainColor absolute left-0 bottom-0 transition-transform duration-300 ${
                    pathname === item.href ? "translate-x-0" : "-translate-x-full group-hover:translate-x-0"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex gap-4 items-center justify-center">
            {!isAuthPage && <AuthButton user={user} />}

            <span className="text-muted-foreground/30">|</span>

            <ModeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-2xl text-foreground hover:text-mainColor transition-colors p-2 rounded-lg hover:bg-mainColor/10 active:scale-95"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-20 left-0 right-0 bottom-0 bg-background z-40 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="flex flex-col p-6 space-y-2">
            {/* Navigation Links */}
            {navigationData.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={`text-base font-medium px-4 py-3 rounded-lg transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-mainColor/10 text-mainColor"
                    : "text-foreground hover:text-mainColor hover:bg-mainColor/5"
                }`}
              >
                {item.title}
              </Link>
            ))}

            {/* User Section */}
            {user && (
              <>
                <div className="my-4 border-t border-border" />

                {isAdmin && (
                  <Link
                    href="/studio"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 text-base font-medium text-foreground hover:text-mainColor hover:bg-mainColor/5 px-4 py-3 rounded-lg transition-all duration-200"
                  >
                    <FiLayout className="text-lg" />
                    <span>Studio</span>
                  </Link>
                )}

                <Link
                  href="/account"
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 text-base font-medium px-4 py-3 rounded-lg transition-all duration-200 ${
                    pathname === "/account"
                      ? "bg-mainColor/10 text-mainColor"
                      : "text-foreground hover:text-mainColor hover:bg-mainColor/5"
                  }`}
                >
                  <FiSettings className="text-lg" />
                  <span>Account</span>
                </Link>

                <form action="/auth/signout" method="post" className="mt-2">
                  <button
                    type="submit"
                    onClick={closeMobileMenu}
                    className="w-full flex items-center gap-3 text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 px-4 py-3 rounded-lg transition-all duration-200"
                  >
                    <FiLogOut className="text-lg" />
                    <span>Sign Out</span>
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-auto p-6 border-t border-border bg-muted/30">
            <p className="text-xs text-muted-foreground text-center">
              © {new Date().getFullYear()} DevsHurdle. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
