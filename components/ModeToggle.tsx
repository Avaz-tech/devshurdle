"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Set system as default on mount
  useEffect(() => {
    setMounted(true);
    if (!theme || theme === "system") {
      setTheme("system");
    }
  }, []);

  const toggleTheme = () => {
    // Toggle between light and dark only
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant="outline" size="icon">
        <SunIcon className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      <SunIcon className="h-[1rem] w-[1rem] rotate-0  scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
