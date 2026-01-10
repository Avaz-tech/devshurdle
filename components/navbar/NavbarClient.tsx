"use client";

import Logo from "../Logo";
import Link from "next/link";
import { FiMenu, FiX, FiLogOut, FiSettings, FiLayout, FiUser } from "react-icons/fi";
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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigationData = [
    { title: "Home", href: "/" },
    { title: "Blog", href: "/blog" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setIsUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
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
    if (!isMobileMenuOpen && !isUserMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
        closeUserMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen, isUserMenuOpen]);

  // Close user menu when clicking outside
  useEffect(() => {
    if (!isUserMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".user-menu-container")) {
        closeUserMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserMenuOpen]);

  return (
    <>
      {/* Navbar */}
      <nav className="w-full h-16 md:h-20 shadow-sm transition-all z-50 border-b border-border bg-background/95 backdrop-blur-md fixed top-0">
        <div className="max-w-screen-xl flex items-center justify-between mx-4 xl:mx-auto h-full">
          {/* Logo */}
          <Logo title="DH" />

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center gap-1 lg:gap-6 absolute left-1/2 transform -translate-x-1/2">
            {navigationData.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm  font-medium px-3 py-2 transition-all duration-200 relative group ${
                  pathname === item.href ? "text-mainColor" : "text-foreground hover:text-mainColor"
                }`}
              >
                {item.title}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[1px] bg-mainColor transition-all duration-300 ${
                    pathname === item.href ? "scale-x-75" : "scale-x-0 group-hover:scale-x-75"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex gap-2 md:gap-3 items-center">
            {/* Theme Toggle - Always visible */}
            <ModeToggle />

            {/* Desktop User Menu or Auth Button */}
            {user ? (
              <div className="hidden md:block relative user-menu-container">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center gap-2 h-9 px-3 rounded-lg transition-all duration-200 hover:bg-mainColor/10 border border-border hover:border-mainColor/50"
                  aria-label="User menu"
                  aria-expanded={isUserMenuOpen}
                >
                  <div className="w-7 h-7 rounded-full bg-mainColor/20 flex items-center justify-center flex-shrink-0">
                    <FiUser className="text-mainColor text-sm" />
                  </div>
                  <span className="text-sm font-medium text-foreground hidden lg:block">
                    {user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0]}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-border bg-muted/30">
                      <p className="text-sm font-medium text-foreground truncate">
                        {user.user_metadata?.full_name || user.user_metadata?.name || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{user.email}</p>
                      {isAdmin && <p className="text-xs text-mainColor mt-1">Administrator</p>}
                    </div>

                    <div className="py-2">
                      {isAdmin && (
                        <Link
                          href="/studio"
                          onClick={closeUserMenu}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-mainColor/10 hover:text-mainColor transition-colors"
                        >
                          <FiLayout className="text-base" />
                          <span>Studio</span>
                        </Link>
                      )}

                      <Link
                        href="/account"
                        onClick={closeUserMenu}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-mainColor/10 hover:text-mainColor transition-colors"
                      >
                        <FiSettings className="text-base" />
                        <span>Account Settings</span>
                      </Link>
                    </div>

                    <div className="border-t border-border">
                      <form action="/auth/signout" method="post">
                        <button
                          type="submit"
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <FiLogOut className="text-base" />
                          <span>Sign Out</span>
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              !isAuthPage && (
                <div className="hidden md:block">
                  <AuthButton user={user} />
                </div>
              )
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-xl text-foreground hover:text-mainColor transition-colors p-2 rounded-lg hover:bg-mainColor/10 active:scale-95 border border-border"
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
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-16 left-0 right-0 bottom-0 bg-background z-40 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* User Info Section - Top of mobile menu */}
          {user && (
            <div className="px-6 py-4 bg-muted/30 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-mainColor/20 flex items-center justify-center">
                  <FiUser className="text-mainColor text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {user.user_metadata?.full_name || user.user_metadata?.name || "User"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  {isAdmin && (
                    <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-mainColor/20 text-mainColor rounded">
                      Admin
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col p-4 space-y-1">
            {/* Navigation Links */}
            {navigationData.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={`text-base font-medium px-4 py-3 rounded-lg transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-mainColor/10 text-mainColor border-l-4 border-mainColor"
                    : "text-foreground hover:text-mainColor hover:bg-mainColor/5"
                }`}
              >
                {item.title}
              </Link>
            ))}

            {/* User Actions */}
            {user ? (
              <>
                <div className="my-3 border-t border-border" />
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
                      ? "bg-mainColor/10 text-mainColor border-l-4 border-mainColor"
                      : "text-foreground hover:text-mainColor hover:bg-mainColor/5"
                  }`}
                >
                  <FiSettings className="text-lg" />
                  <span>Account Settings</span>
                </Link>

                <div className="my-3 border-t border-border" />

                <form action="/auth/signout" method="post">
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
            ) : (
              !isAuthPage && (
                <>
                  <div className="my-3 border-t border-border" />
                  <div className="px-4">
                    <AuthButton user={user} />
                  </div>
                </>
              )
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
