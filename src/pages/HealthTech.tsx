import SiteHeader from "../components/SiteHeader";
import { usePageMeta } from "../hooks/usePageMeta";
import { useFormspreeForm } from "../hooks/useFormspreeForm";

const FORMSPREE_URL = "https://formspree.io/f/mykvzyqv";

function NdaNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-clay/20 dark:border-dark-clay/25 bg-clay/[0.06] dark:bg-dark-clay/[0.08] px-4 py-3">
      <svg
        className="text-clay-dark dark:text-dark-clay shrink-0 mt-0.5"
        width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="1.75"
        strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
      <p className="text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed">
        {children}
      </p>
    </div>
  );
}

function RequestAccessForm() {
  const { status, handleSubmit } = useFormspreeForm(FORMSPREE_URL);

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
          className="w-full px-3.5 py-2.5 rounded-lg border border-warm-gray/25 dark:border-dark-warm-gray/25 bg-cream dark:bg-dark-surface text-charcoal dark:text-dark-cream placeholder:text-warm-gray/50 dark:placeholder:text-dark-warm-gray/50 text-sm focus:outline-none focus:ring-2 focus:ring-clay/40 dark:focus:ring-dark-clay/40 transition-shadow"
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
          className="w-full px-3.5 py-2.5 rounded-lg border border-warm-gray/25 dark:border-dark-warm-gray/25 bg-cream dark:bg-dark-surface text-charcoal dark:text-dark-cream placeholder:text-warm-gray/50 dark:placeholder:text-dark-warm-gray/50 text-sm focus:outline-none focus:ring-2 focus:ring-clay/40 dark:focus:ring-dark-clay/40 transition-shadow"
        />
      </div>
      {status === "error" && (
        <p role="alert" className="text-sm text-clay-dark dark:text-dark-clay">
          Something went wrong. Try again or reach out to me on LinkedIn.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="px-5 py-2.5 rounded-lg bg-clay dark:bg-dark-clay text-cream dark:text-dark-bg text-sm font-medium hover:opacity-90 disabled:opacity-60 transition-opacity cursor-pointer disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending..." : "Request access"}
      </button>
    </form>
  );
}

export default function HealthTech() {
  usePageMeta({
    title: "Letting AI Do the Work so Human Experts Can Focus on Review | Vanessa Bell",
    description: "A researcher-facing workflow redesign for an AI health tech platform. Flipped the interaction model from manual-first to AI-proposes, human-confirms, achieving a 9x reduction in time and steps.",
    ogImage: "https://vanessabell.design/ai-research-workflow/hero-diagram-public.png",
    path: "/ai-research-workflow",
  });

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg text-charcoal dark:text-dark-cream">
      <SiteHeader />
      <main id="main-content" className="max-w-2xl mx-auto px-6 sm:px-8 pt-6 sm:pt-8 pb-12 sm:pb-16">

        {/* Hero */}
        <header className="mb-12">
          <p className="text-sm text-warm-gray dark:text-dark-warm-gray font-mono uppercase tracking-widest mb-3">
            Case Study
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-charcoal dark:text-dark-cream leading-tight text-balance mb-4">
            Letting AI Do the Work so Human Experts Can Focus on Review
          </h1>
          <p className="text-warm-gray dark:text-dark-warm-gray mb-6">
            A redesigned researcher workflow for an AI health tech platform.
          </p>

          <div className="mb-8">
            <NdaNotice>
              This project is under an NDA, so the mockup here is for illustrative purposes only. I'm happy to walk through the real thing on a call.
            </NdaNotice>
          </div>

          <figure className="my-10">
            <img
              src="/ai-research-workflow/ai-review-mobile.jpg"
              width={390}
              height={896}
              alt="concept mockup of the interaction model I designed, shown as a mobile review card"
              className="w-full max-w-xs mx-auto rounded-lg sm:hidden"
            />
            <img
              src="/ai-research-workflow/hero-diagram-public.png"
              width={1440}
              height={1024}
              alt="concept mockup of the interaction model I designed"
              className="hidden sm:block w-full rounded-lg"
            />
            <figcaption className="mt-3 text-sm text-warm-gray dark:text-dark-warm-gray text-center italic">
              Real interface under NDA — image above is a concept mockup of the interaction model I designed.
            </figcaption>
          </figure>

          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 mb-10 rounded-xl border border-clay/20 dark:border-dark-clay/25 bg-clay/[0.06] dark:bg-dark-clay/[0.08] px-5 py-6 sm:px-6">
            {[
              { value: "4.5 min → 30 sec", label: "per utterance" },
              { value: "9 steps → 4", label: "in the core flow" },
              { value: "7 PRs merged", label: "into the client's Angular codebase" },
              { value: "29", label: "components & services touched" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-serif text-xl sm:text-2xl text-clay-dark dark:text-dark-clay leading-tight mb-1.5">
                  {value}
                </p>
                <p className="text-xs text-warm-gray dark:text-dark-warm-gray leading-snug">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5 text-sm mt-8 mx-auto">
            {[
              { label: "Role", value: "Product Designer" },
              { label: "Company", value: "Early-stage health tech startup" },
              { label: "Year", value: "2026" },
              { label: "Team", value: "Me, one software engineer, and the CEO" },
              { label: "Scope", value: "Research, design, and shipped Angular/TypeScript implementation with Claude Code" },
              { label: "Impact", value: "A workflow the lighthouse customer called \"kind of a burden\" became one she called \"fun\"" },
            ].map(({ label, value }) => (
              <div key={label}>
                <dt className="text-warm-gray dark:text-dark-warm-gray mb-1">{label}</dt>
                <dd className="text-charcoal dark:text-dark-cream font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* Request Access */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            Full case study
          </h2>
          <div className="mb-6">
            <NdaNotice>
              The full case study is under NDA — request access below and I'll follow up directly.
            </NdaNotice>
          </div>
          <RequestAccessForm />
        </section>

        {/* Testimonial */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-6">
            Testimonial
          </h2>
          <blockquote className="border-l-2 border-clay dark:border-dark-clay pl-6">
            <p className="font-serif text-lg sm:text-xl text-charcoal dark:text-dark-cream leading-snug italic mb-4">
              "Wow. This new flow is fun now as opposed to being kind of a burden." When a lighthouse
              customer tells you that, you know your team nailed the UX. Vanessa did this within her
              first few weeks all the way from design through implementation in the Angular codebase.
              I'd worked with her as an engineer at a past startup and hired her as a UX designer for
              this role. She quickly earned the trust of both the engineering team and our customers,
              delivering a 9x reduction in time and steps for a workflow that customers repeat dozens
              of times. She excels at empathy, creativity, and the ability to ship.
            </p>
            <footer className="text-sm text-warm-gray dark:text-dark-warm-gray font-medium">
              CEO
            </footer>
          </blockquote>
        </section>

      </main>
    </div>
  );
}
