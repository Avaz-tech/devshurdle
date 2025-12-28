"use client";

import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function PageLayout({ children, className = "" }: PageLayoutProps) {
  return (
    <main className={`flex justify-center items-center flex-col pt-20 ${className}`}>
      {children}
    </main>
  );
}