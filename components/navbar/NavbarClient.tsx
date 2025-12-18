"use client";

import Logo from "../Logo";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { ModeToggle } from "../ModeToggle";
import AuthButton from "../AuthButton";
import { usePathname } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { useMemo } from "react";

export default function NavbarClient({ user }: { user: User | null }) {
  const pathname = usePathname();
  const isAuthPage = useMemo(() => pathname.startsWith("/sign"), [pathname]);

  const navigationData = [
    { title: "Home", href: "/" },
    { title: "Blog", href: "/blog" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <div
      className={`w-full h-20 shadow-custom-medium backdrop-blur-3xl transition-colors z-[10] border-b border-primary 
        fixed top-0 max-w-none xs:h-[100vh]
      `}
    >
      <div className="max-w-screen-xl flex items-center justify-between mx-4 xl:mx-auto h-full font-medium">
        <Logo title="DH" />

        <div className="hidden md:inline-flex items-center gap-7 duration-200">
          {navigationData.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm relative group overflow-hidden text-foreground">
              {item.title}
              <span className="w-full h-[1px] bg-primary absolute left-0 bottom-0 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-200" />
            </Link>
          ))}
        </div>

        <div className="flex gap-4 items-center">
          {user && (
            <Link href="/account" className="text-sm relative group overflow-hidden">
              Account
              <span className="w-full h-[1px] bg-primary absolute left-0 bottom-0 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-200" />
            </Link>
          )}

          {!isAuthPage && <AuthButton user={user} />}

          <span className="text-muted-foreground opacity-70">|</span>
          <ModeToggle />

          <div className="md:hidden">
            <FiMenu className="text-2xl text-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
