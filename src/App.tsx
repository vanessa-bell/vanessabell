import { useState } from "react";
import { Link } from "react-router-dom";
import { useSparkles } from "./useSparkles";
import ThemeToggle from "./components/ThemeToggle";

const FORMSPREE_URL = "https://formspree.io/f/mykvzyqv";

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <p className="text-warm-gray dark:text-dark-warm-gray text-sm">
        Got it. I'll be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="hidden" name="_subject" value="Portfolio contact" />
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="name" className="block text-sm text-charcoal dark:text-dark-cream mb-1.5">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full px-3.5 py-2.5 rounded-lg border border-warm-gray/25 dark:border-dark-warm-gray/25 bg-cream dark:bg-dark-surface text-charcoal dark:text-dark-cream text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40 dark:focus:ring-dark-terracotta/40 transition-shadow"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-charcoal dark:text-dark-cream mb-1.5">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full px-3.5 py-2.5 rounded-lg border border-warm-gray/25 dark:border-dark-warm-gray/25 bg-cream dark:bg-dark-surface text-charcoal dark:text-dark-cream text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40 dark:focus:ring-dark-terracotta/40 transition-shadow"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm text-charcoal dark:text-dark-cream mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="w-full px-3.5 py-2.5 rounded-lg border border-warm-gray/25 dark:border-dark-warm-gray/25 bg-cream dark:bg-dark-surface text-charcoal dark:text-dark-cream text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40 dark:focus:ring-dark-terracotta/40 transition-shadow resize-none"
        />
      </div>
      {status === "error" && (
        <p role="alert" className="text-sm text-terracotta dark:text-dark-terracotta">
          Something went wrong. Try again or reach me on LinkedIn.
        </p>
      )}
      <div className="pt-1">
        <button
          type="submit"
          disabled={status === "sending"}
          className="px-5 py-2.5 rounded-lg bg-terracotta dark:bg-dark-terracotta text-cream dark:text-dark-bg text-sm font-medium hover:opacity-90 disabled:opacity-60 transition-opacity cursor-pointer disabled:cursor-not-allowed"
        >
          {status === "sending" ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
}

export default function App() {
  useSparkles();

  return (
    <div className="min-h-screen bg-cream text-charcoal dark:bg-dark-bg dark:text-dark-cream transition-colors duration-300">
      <header className="flex justify-between items-center p-6 sm:p-8">
        <a
          href="/vanessa-bell-design-engineer-resume-2026.pdf"
          download="Vanessa Bell Resume.pdf"
          className="px-4 py-2 rounded-lg bg-terracotta dark:bg-dark-terracotta text-cream dark:text-dark-bg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Resume
        </a>
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
          I design and build experiences that reduce complexity & friction. Here's my recent work.
        </p>

        <section className="mt-10" aria-label="Case studies">
          <h2 className="font-serif text-xl text-charcoal dark:text-dark-cream mb-3">
            Selected Work
          </h2>
          <ul className="space-y-3">
            <li>
              <Link
                to="/ai-research-workflow"
                className="text-terracotta dark:text-dark-terracotta hover:text-terracotta-dark dark:hover:text-dark-cream transition-all duration-150 underline underline-offset-4 hover:underline-offset-6 cursor-pointer"
              >
                Letting AI Do the Work so Human Experts Can Focus on Review
              </Link>
            </li>
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
          <h2 className="font-serif text-xl text-charcoal dark:text-dark-cream mb-4">
            Get in Touch
          </h2>
          <ContactForm />
          <a
            href="https://www.linkedin.com/in/vanessajoanbell/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-sm text-olive dark:text-dark-olive hover:text-olive-dark dark:hover:text-dark-cream transition-all duration-150 underline underline-offset-4 hover:underline-offset-6"
          >
            LinkedIn
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </section>
      </main>

      <footer className="mt-auto py-6 px-6 text-center text-sm text-warm-gray dark:text-dark-warm-gray">
        &copy; {new Date().getFullYear()} Vanessa Bell
      </footer>
    </div>
  );
}
