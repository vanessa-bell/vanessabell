import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { usePageMeta } from "../hooks/usePageMeta";

const FORMSPREE_URL = "https://formspree.io/f/mykvzyqv";

function RequestAccessForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
        Got it. I'll be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
      <div>
        <label
          htmlFor="name"
          className="block text-sm text-charcoal dark:text-dark-cream mb-1.5"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full px-3.5 py-2.5 rounded-lg border border-warm-gray/25 dark:border-dark-warm-gray/25 bg-cream dark:bg-dark-surface text-charcoal dark:text-dark-cream placeholder:text-warm-gray/50 dark:placeholder:text-dark-warm-gray/50 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40 dark:focus:ring-dark-terracotta/40 transition-shadow"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm text-charcoal dark:text-dark-cream mb-1.5"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full px-3.5 py-2.5 rounded-lg border border-warm-gray/25 dark:border-dark-warm-gray/25 bg-cream dark:bg-dark-surface text-charcoal dark:text-dark-cream placeholder:text-warm-gray/50 dark:placeholder:text-dark-warm-gray/50 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40 dark:focus:ring-dark-terracotta/40 transition-shadow"
        />
      </div>
      {status === "error" && (
        <p role="alert" className="text-sm text-terracotta dark:text-dark-terracotta">
          Something went wrong. Try again or email me directly at vanessa.bell14@gmail.com.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="px-5 py-2.5 rounded-lg bg-terracotta dark:bg-dark-terracotta text-cream dark:text-dark-bg text-sm font-medium hover:opacity-90 disabled:opacity-60 transition-opacity cursor-pointer disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending..." : "Request access"}
      </button>
    </form>
  );
}

export default function HealthTech() {
  usePageMeta({
    title: "Letting AI Do the Work so Human Experts Can Focus on Review | Vanessa Bell",
    description: "A researcher-facing workflow redesign for an AI health tech platform. Flipped the interaction model from manual-first to AI-proposes, human-confirms — achieving a 9x reduction in time and steps.",
    ogImage: "https://vanessabell.design/ai-research-workflow/hero-diagram-og.png",
    path: "/ai-research-workflow",
  });

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

        {/* Hero */}
        <header className="mb-12">
          <p className="text-sm text-warm-gray dark:text-dark-warm-gray uppercase tracking-widest mb-3">
            Case Study
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-charcoal dark:text-dark-cream leading-tight mb-4">
            Letting AI Do the Work so Human Experts Can Focus on Review
          </h1>
          <p className="text-warm-gray dark:text-dark-warm-gray mb-8">
            A redesigned researcher workflow for an AI health tech platform.
          </p>

          <figure className="my-10">
            <img
              src="/ai-research-workflow/mobile-hero-diagram.svg"
              alt="A side-by-side comparison showing the redesigned researcher workflow. On the left, a long form labeled before with many fields and a Run LLM button at the bottom, captioned Specify every expected answer, then run AI. Time spent: 4.5 minutes. On the right, a compact card labeled after with four checkmarks and a Confirm Correct button, captioned AI proposes, researcher confirms or corrects. Time spent: under 30 seconds. Between them, an arrow containing the text 9x reduction."
              className="w-full rounded-lg sm:hidden"
            />
            <img
              src="/ai-research-workflow/hero-diagram-public.svg"
              alt=""
              aria-hidden="true"
              className="w-full rounded-lg hidden sm:block"
            />
          </figure>

          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5 text-sm mt-8 mx-auto">
            {[
              { label: "Role", value: "Design Engineer" },
              { label: "Company", value: "Early-stage health tech startup (NDA)" },
              { label: "Timeline", value: "March – May 2026" },
              { label: "Team", value: "Myself + software engineer + CEO" },
              { label: "Scope", value: "Research, design, and shipped Angular/TypeScript implementation with Claude Code" },
              { label: "Impact", value: "9x reduction in time spent" },
            ].map(({ label, value }) => (
              <div key={label}>
                <dt className="text-warm-gray dark:text-dark-warm-gray mb-1">{label}</dt>
                <dd className="text-charcoal dark:text-dark-cream font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <hr className="border-warm-gray/20 dark:border-dark-warm-gray/20 mb-12" />

        {/* The Problem */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            The Problem
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            I redesigned the core workflow on a researcher-facing tool where clinicians validate
            AI-extracted data. The original workflow asked researchers to manually specify expected
            results before the AI ran, then check whether the AI agreed. They were doing cognitive
            work upfront with no signal to react to.
          </p>
        </section>

        {/* The Redesign */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            The Redesign
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            I rebuilt the flow around the inverse model: the AI proposes a draft, and the researcher
            confirms or corrects. The redesign cut time and steps by 9x for a workflow researchers
            repeat dozens of times per study.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            I was the sole designer embedded in their engineering team and shipped the changes in code.
          </p>
        </section>

        {/* Testimonial */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-6">
            Testimonial
          </h2>
          <blockquote className="border-l-2 border-terracotta dark:border-dark-terracotta pl-6">
            <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed italic mb-4">
              "Wow. This new flow is fun now as opposed to being kind of a burden." When a lighthouse
              customer tells you that, you know your team nailed the UX. Vanessa did this within her
              first few weeks all the way from design through implementation in the Angular codebase.
              I'd worked with her as an engineer at a past startup and hired her as a UX designer for
              this role. She quickly earned the trust of both the engineering team and our customers,
              delivering a 9x reduction in time and steps for a workflow that customers repeat dozens
              of times. She excels at empathy, creativity, and the ability to ship.
            </p>
            <footer className="text-sm text-charcoal dark:text-dark-cream font-medium">
              CEO
            </footer>
          </blockquote>
        </section>

        {/* Request Access */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            Full Case Study
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-6">
            Process detail, design decisions, and screens are available on request.
          </p>
          <RequestAccessForm />
        </section>

        <Link
          to="/"
          className="inline-block text-sm text-warm-gray dark:text-dark-warm-gray hover:text-charcoal dark:hover:text-dark-cream transition-colors"
        >
          <span aria-hidden="true">←</span> Back to work
        </Link>

      </main>
    </div>
  );
}
