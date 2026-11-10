// The site follows DeepSeek Harness: one fixed dark appearance and no
// user-facing light/dark switch. `data-theme="dark"` is also set in index.html
// so the first paint already matches.
import type { ReactNode } from "react";

export type ColorTheme = "dark";

export function applyColorTheme() {
  document.documentElement.dataset.theme = "dark";
  document.documentElement.style.colorScheme = "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  applyColorTheme();
  return children;
}

export function useColorTheme(): { colorTheme: ColorTheme } {
  return { colorTheme: "dark" };
}
