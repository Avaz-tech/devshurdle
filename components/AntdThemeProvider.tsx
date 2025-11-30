"use client";

import { ConfigProvider, theme } from "antd";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function AntdThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme: appTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: appTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {},
      }}
    >
      {children}
    </ConfigProvider>
  );
}

