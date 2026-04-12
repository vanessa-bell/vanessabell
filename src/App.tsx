import { useEffect, useState } from "react";

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

  const toggleTheme = () =>
    setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="min-h-screen bg-cream text-charcoal dark:bg-dark-bg dark:text-dark-cream transition-colors duration-300">
      <header className="flex justify-end p-6 sm:p-8">
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="text-warm-gray dark:text-dark-warm-gray hover:text-charcoal dark:hover:text-dark-cream transition-colors text-sm"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </header>

      <main className="max-w-xl mx-auto px-6 sm:px-8 pt-16 sm:pt-24 pb-24">
        <h1 className="font-serif text-4xl sm:text-5xl text-charcoal dark:text-dark-cream leading-tight">
          Vanessa Bell
        </h1>
        <p className="mt-2 text-lg text-warm-gray dark:text-dark-warm-gray">
          Healthcare UX Designer & Frontend Engineer
        </p>

        <p className="mt-8 text-base leading-relaxed text-warm-gray dark:text-dark-warm-gray">
          I design and build healthcare experiences that reduce friction for
          clinicians and patients.
        </p>

        <section className="mt-16" aria-label="Case studies">
          <h2 className="font-serif text-xl text-charcoal dark:text-dark-cream mb-4">
            Selected Work
          </h2>
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="text-terracotta dark:text-dark-terracotta hover:text-terracotta-dark dark:hover:text-dark-cream transition-colors underline underline-offset-4"
              >
                Case Study One
              </a>
              <span className="text-sm text-warm-gray dark:text-dark-warm-gray ml-2">
                — Coming soon
              </span>
            </li>
            <li>
              <a
                href="#"
                className="text-terracotta dark:text-dark-terracotta hover:text-terracotta-dark dark:hover:text-dark-cream transition-colors underline underline-offset-4"
              >
                Case Study Two
              </a>
              <span className="text-sm text-warm-gray dark:text-dark-warm-gray ml-2">
                — Coming soon
              </span>
            </li>
          </ul>
        </section>

        <section className="mt-16" aria-label="Contact">
          <h2 className="font-serif text-xl text-charcoal dark:text-dark-cream mb-4">
            Get in Touch
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <a
              href="mailto:vanessabelldesign@gmail.com"
              className="text-olive dark:text-dark-olive hover:text-olive-dark dark:hover:text-dark-cream transition-colors underline underline-offset-4"
            >
              vanessabelldesign@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/vanessajoanbell/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-olive dark:text-dark-olive hover:text-olive-dark dark:hover:text-dark-cream transition-colors underline underline-offset-4"
            >
              LinkedIn
            </a>
          </div>
        </section>
      </main>

      <footer className="mt-auto py-8 px-6 text-center text-sm text-warm-gray dark:text-dark-warm-gray">
        &copy; {new Date().getFullYear()} Vanessa Bell
      </footer>
    </div>
  );
}
