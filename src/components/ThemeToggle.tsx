import { useEffect, useState } from "react";

function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={theme === "dark"}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="relative w-14 h-7 rounded-full bg-cream-dark dark:bg-dark-surface border border-warm-gray/20 dark:border-dark-warm-gray/20 transition-colors duration-200 cursor-pointer"
    >
      <span
        className={`absolute top-px left-px w-6 h-6 rounded-full bg-terracotta dark:bg-dark-terracotta transition-transform duration-200 flex items-center justify-center text-cream dark:text-dark-bg text-xs ${
          theme === "dark" ? "translate-x-7" : "translate-x-0"
        }`}
      >
        <span aria-hidden="true">{theme === "dark" ? "☾" : "☀"}</span>
      </span>
    </button>
  );
}
