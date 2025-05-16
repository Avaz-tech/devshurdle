import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ConfigProvider, theme } from "antd";

export const metadata: Metadata = {
  title: "DevsHurdle",
  description: "Conquering Development Errors",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
            token: {},
          }}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
