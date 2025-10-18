import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "./button";
import { useTheme } from "@/hooks/useTheme";

export const DarkModeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark" || (theme === "system" && typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-pressed={isDark} title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
};

export default DarkModeToggle;
