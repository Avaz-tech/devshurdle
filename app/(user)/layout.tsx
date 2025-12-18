import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "@components/navbar";
import Footer from "@components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { AntdThemeProvider } from "@/components/AntdThemeProvider";

export const metadata: Metadata = {
  title: "DevsHurdle",
  description: "Conquering Development Errors",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="oEf46UbtX65sh2HN8xyR0Z2M5rqkaU1gxBHwkkW1jrg" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AntdThemeProvider>
            <Navbar />
            {children}
            <Footer />
          </AntdThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
