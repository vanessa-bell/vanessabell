import { useEffect, useState } from "react";
import { useSparkles } from "./useSparkles";

function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useSparkles();

  const toggleTheme = () =>
    setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="min-h-screen bg-cream text-charcoal dark:bg-dark-bg dark:text-dark-cream transition-colors duration-300">
      <header className="flex justify-end p-6 sm:p-8">
        <button
          onClick={toggleTheme}
          role="switch"
          aria-checked={theme === "dark"}
          aria-label="Dark mode"
          className="relative w-14 h-7 rounded-full bg-cream-dark dark:bg-dark-surface border border-warm-gray/20 dark:border-dark-warm-gray/20 transition-colors duration-200 cursor-pointer"
        >
          <span
            className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-terracotta dark:bg-dark-terracotta transition-transform duration-200 flex items-center justify-center text-cream dark:text-dark-bg text-xs ${
              theme === "dark" ? "translate-x-7" : "translate-x-0"
            }`}
          >
            {theme === "dark" ? "☾" : "☀"}
          </span>
        </button>
      </header>

      <main className="max-w-xl mx-auto px-6 sm:px-8 pt-8 sm:pt-12 pb-12">
        <h1 className="font-serif text-4xl sm:text-5xl text-charcoal dark:text-dark-cream leading-tight">
          Vanessa Bell
        </h1>
        <p className="mt-1 text-lg text-warm-gray dark:text-dark-warm-gray">
          UX Designer & Frontend Engineer
        </p>

        <p className="mt-5 text-base leading-relaxed text-warm-gray dark:text-dark-warm-gray">
          I design and build experiences that reduce complexity & friction. Healthcare case study publishing soon — in the meantime, here's my recent work.
        </p>

        <section className="mt-10" aria-label="Case studies">
          <h2 className="font-serif text-xl text-charcoal dark:text-dark-cream mb-3">
            Selected Work
          </h2>
          <ul className="space-y-3">
            <li>
              <a
                href="/case-studies/spendlight_case_study_final.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terracotta dark:text-dark-terracotta hover:text-terracotta-dark dark:hover:text-dark-cream transition-all duration-150 underline underline-offset-4 hover:underline-offset-6 cursor-pointer"
              >
                SpendLight: Designing Mindful Money Habits
              </a>
            </li>
            <li>
              <a
                href="/case-studies/monster_walk_case_study.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terracotta dark:text-dark-terracotta hover:text-terracotta-dark dark:hover:text-dark-cream transition-all duration-150 underline underline-offset-4 hover:underline-offset-6 cursor-pointer"
              >
                Monster Walk: Turning Daily Walks into Daily Wins
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-10" aria-label="Contact">
          <h2 className="font-serif text-xl text-charcoal dark:text-dark-cream mb-3">
            Get in Touch
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <a
              href="https://mail.google.com/mail/?view=cm&to=vanessabelldesign@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-olive dark:text-dark-olive hover:text-olive-dark dark:hover:text-dark-cream transition-all duration-150 underline underline-offset-4 hover:underline-offset-6 cursor-pointer"
            >
              vanessabelldesign@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/vanessajoanbell/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-olive dark:text-dark-olive hover:text-olive-dark dark:hover:text-dark-cream transition-all duration-150 underline underline-offset-4 hover:underline-offset-6 cursor-pointer"
            >
              LinkedIn
            </a>
          </div>
        </section>
      </main>

      <footer className="mt-auto py-6 px-6 text-center text-sm text-warm-gray dark:text-dark-warm-gray">
        &copy; {new Date().getFullYear()} Vanessa Bell
      </footer>
    </div>
  );
}
