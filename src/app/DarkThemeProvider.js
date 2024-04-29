"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { useEffect } from "react";

export function DarkThemeProvider({ children }) {
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
