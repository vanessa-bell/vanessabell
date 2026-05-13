import { Link } from "react-router-dom";
import { useSparkles } from "./useSparkles";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  useSparkles();

  return (
    <div className="min-h-screen bg-cream text-charcoal dark:bg-dark-bg dark:text-dark-cream transition-colors duration-300">
      <header className="flex justify-end p-6 sm:p-8">
        <ThemeToggle />
      </header>

      <main className="max-w-xl mx-auto px-6 sm:px-8 pt-8 sm:pt-12 pb-12">
        <h1 className="font-serif text-4xl sm:text-5xl text-charcoal dark:text-dark-cream leading-tight">
          Vanessa Bell
        </h1>
        <p className="mt-1 text-lg text-warm-gray dark:text-dark-warm-gray">
          Design Engineer
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
              <Link
                to="/spendlight"
                className="text-terracotta dark:text-dark-terracotta hover:text-terracotta-dark dark:hover:text-dark-cream transition-all duration-150 underline underline-offset-4 hover:underline-offset-6 cursor-pointer"
              >
                SpendLight: Designing Mindful Money Habits
              </Link>
            </li>
            <li>
              <Link
                to="/monster-walk"
                className="text-terracotta dark:text-dark-terracotta hover:text-terracotta-dark dark:hover:text-dark-cream transition-all duration-150 underline underline-offset-4 hover:underline-offset-6 cursor-pointer"
              >
                Monster Walk: Turning Daily Walks into Daily Wins
              </Link>
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
