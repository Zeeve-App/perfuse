// hooks/useDarkMode.js
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "@/utils/cookie";

export default function useDarkMode() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = getCookie("theme");
    const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme === "dark" || (!storedTheme && userPrefersDark)) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      setCookie("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      setCookie("theme", "dark");
      setTheme("dark");
    }
  };

  return { theme, toggleTheme };
}
