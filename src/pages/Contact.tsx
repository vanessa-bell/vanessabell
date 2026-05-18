import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg text-charcoal dark:text-dark-cream">
      <main className="max-w-2xl mx-auto px-6 sm:px-8 py-12 sm:py-16">

        <div className="flex justify-between items-center mb-12">
          <Link
            to="/"
            className="text-sm text-warm-gray dark:text-dark-warm-gray hover:text-charcoal dark:hover:text-dark-cream transition-colors"
          >
            <span aria-hidden="true">←</span> Back
          </Link>
          <ThemeToggle />
        </div>

        <header className="mb-10">
          <h1 className="font-serif text-4xl sm:text-5xl text-charcoal dark:text-dark-cream leading-tight mb-3">
            Get in Touch
          </h1>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            Open to staff roles and contract engagements. I'll get back to you within a day or two.
          </p>
        </header>

        <ContactForm />

        <a
          href="https://www.linkedin.com/in/vanessajoanbell/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-5 text-sm text-olive dark:text-dark-olive hover:text-olive-dark dark:hover:text-dark-cream transition-all duration-150 underline underline-offset-4 hover:underline-offset-6"
        >
          LinkedIn
          <span className="sr-only"> (opens in new tab)</span>
        </a>

      </main>
    </div>
  );
}
