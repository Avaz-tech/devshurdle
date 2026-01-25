"use client";

import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function PageLayout({ children, className = "" }: PageLayoutProps) {
  return (
    <main className={`w-full min-h-screen mt-16  md:mt-20 ${className}`}>
      {children}
    </main>
  );
}