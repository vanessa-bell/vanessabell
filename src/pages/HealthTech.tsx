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
    description: "A researcher-facing workflow redesign for an AI health tech platform. Flipped the interaction model from manual-first to AI-proposes, human-confirms, achieving a 9x reduction in time and steps.",
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

          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 mb-10 rounded-xl border border-terracotta/20 dark:border-dark-terracotta/25 bg-terracotta/[0.06] dark:bg-dark-terracotta/[0.08] px-5 py-6 sm:px-6">
            {[
              { value: "4.5 min → 30 sec", label: "per utterance" },
              { value: "9 steps → 4", label: "in the core flow" },
              { value: "7 PRs merged", label: "into the client's Angular codebase" },
              { value: "29", label: "components & services touched" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-serif text-xl sm:text-2xl text-terracotta dark:text-dark-terracotta leading-tight mb-1.5">
                  {value}
                </p>
                <p className="text-xs text-warm-gray dark:text-dark-warm-gray leading-snug">
                  {label}
                </p>
              </div>
            ))}
          </div>

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

        <hr className="border-warm-gray/20 dark:border-dark-warm-gray/20 mb-12" />

        {/* The challenge */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            The challenge
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            The client builds two connected products. Caregivers report symptoms in natural speech
            in a patient app, something like "he had three wet diapers and seemed cranky." An AI
            pipeline turns each spoken report into structured research data and sends it to a
            researcher-facing portal, where clinicians study patterns across patients. The AI
            doesn't diagnose. It turns unstructured speech into a research-ready database that can
            inform new treatments.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            For the AI to do that reliably, researchers configure it first, then validate it. That
            validation step, where trust in the AI is built or lost, was the focus of my work.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            The stakes are specific to rare disease. A given study might track symptoms for a few
            hundred patients worldwide, so a misconfigured extraction pipeline doesn't just add
            noise. It can make a condition look different from how it actually presents.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            And the people doing this work are clinicians, not full-time software users. One
            physician-researcher I spoke with had one to two days of protected academic time every
            four weeks. She was authoring test cases from memory of real clinical encounters,
            picking the tool up after weeks between sessions.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-3">
            For her, the tool had three jobs:
          </p>
          <ul className="space-y-2 mb-4">
            {[
              "Build confidence that the AI is extracting the right data from patient utterances.",
              "Signal clearly when testing is complete, so researchers aren't left wondering whether they've done enough before launching a study.",
              "Protect limited research time by not requiring more effort than the task actually requires.",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-warm-gray dark:text-dark-warm-gray">
                <span className="text-terracotta dark:text-dark-terracotta text-sm leading-relaxed shrink-0">–</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            The original workflow did the opposite. It asked her to author the entire expected
            result by hand, field by field, before the AI ever ran. Estimated time per utterance:
            four and a half minutes. A typical study has dozens of utterances.
          </p>
        </section>

        {/* Approach */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-6">
            Approach
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-8">
            Before touching a single screen, I mapped the existing codebase and found a structural
            problem that shaped the entire engagement: the system had no opinion about whether a
            study was correctly configured. A researcher could publish an incomplete study with no
            warning. From there I narrowed scope to one workflow, ran heuristic evaluations at
            multiple stages, aligned early with the CEO on the core vision (the AI should propose a
            draft, the researcher should confirm or correct), and conducted user research with two
            researchers running active studies on the platform.
          </p>

          <h3 className="font-medium text-charcoal dark:text-dark-cream mb-2">
            Phase 1: reduce the manual work
          </h3>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            My first hypothesis was that the problem was friction. The heuristic audit supported it:
            too many clicks for basic tasks, no way to sort, search, or filter, and no top-level
            signal about whether the AI was configured well enough to start collecting real data.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-2">Shipped:</p>
          <ul className="space-y-2 mb-8">
            {[
              "Run the AI first, not last, so the researcher's job becomes verification rather than authoring.",
              "Editing in place instead of in a disconnected modal.",
              "Sort, search and filter on the list, so researchers could find their way back to where they left off.",
              "Per-item status and accuracy indicators.",
              "A configurable accuracy target. This one came from research rather than the audit. A second researcher told me her trust threshold was 9 out of 10, but the tool showed a percentage with nothing to compare it against. A number without a target isn't feedback.",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-warm-gray dark:text-dark-warm-gray">
                <span className="text-terracotta dark:text-dark-terracotta text-sm leading-relaxed shrink-0">–</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="font-medium text-charcoal dark:text-dark-cream mb-2">
            The pivot
          </h3>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            After Phase 1 shipped, I ran a session with a physician-researcher who had already tried
            the redesign on her own and struggled. Mid-task, she paused and said:
          </p>
          <blockquote className="border-l-2 border-terracotta dark:border-dark-terracotta pl-6 mb-4">
            <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed italic">
              "Do I hit Mark as Reviewed? Do I hit Run? Do I hit Rerun? I don't know what I do.
              Actually, I don't know what I do."
            </p>
          </blockquote>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            Phase 1 had made individual tasks easier but hadn't given researchers a clear path
            through the tool. The old author-first option was still there, so she had never
            discovered the AI-first flow on her own. When I walked her through it in the same
            session, same data, opposite sequencing:
          </p>
          <blockquote className="border-l-2 border-terracotta dark:border-dark-terracotta pl-6 mb-4">
            <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed italic">
              "That is huge. That is amazing, actually. That's so wonderful, because before, I was
              like, this is painful."
            </p>
          </blockquote>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-8">
            My hypothesis had been half right. Friction was real, but removing it wasn't sufficient,
            because the interface still offered two paths and defaulted to the worse one. That
            session became the brief for Phase 2.
          </p>

          <h3 className="font-medium text-charcoal dark:text-dark-cream mb-2">
            Phase 2: review-first
          </h3>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            I reframed the design question from "how do we make editing easier?" to "what does the
            interface look like if editing is the exception, not the default?"
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-2">Shipped:</p>
          <ul className="space-y-2 mb-8">
            {[
              "Read-only by default, so the interface itself communicates that editing is the exception rather than the expected action.",
              "Renamed the core actions to describe what the researcher is actually doing: agreeing with the AI's output, or correcting it and saving that correction as the new ground truth.",
              "Removed uninformative comparisons, so only meaningful differences surface and attention goes where a decision is genuinely needed.",
              "Made progress and next action always visible, so a researcher returning after weeks away never has to work out where they are or what to do next.",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-warm-gray dark:text-dark-warm-gray">
                <span className="text-terracotta dark:text-dark-terracotta text-sm leading-relaxed shrink-0">–</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="font-medium text-charcoal dark:text-dark-cream mb-2">
            The decision I'd defend
          </h3>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            Making review faster created a risk I had to design against: if confirming takes one
            click, people confirm without looking.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            So the flow keeps friction exactly where scrutiny matters. Agreeing with the AI stays
            cheap. Anything the AI got wrong, or anything the researcher flagged as uncertain, has to
            be dealt with deliberately and cannot be cleared by a bulk action. Discrepancies stay
            visible even as matching fields recede.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            The goal was to remove busywork, not oversight.
          </p>
        </section>

        {/* Flow: before and after */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            Flow: before and after
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            <strong className="text-charcoal dark:text-dark-cream font-medium">Before, nine steps.</strong>{" "}
            The researcher authored the entire expected result by hand, field by field, before the AI
            ever ran. Only then could they trigger it and compare. Reconciling a mismatch meant
            leaving the workflow and moving between separate areas of the product with no guidance of the next step in the workflow. There was
            no search, no filtering and no review state, so returning to the queue meant re-deriving
            what you had already handled.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            <strong className="text-charcoal dark:text-dark-cream font-medium">After, four steps.</strong>{" "}
            Enter the utterances and save; the AI runs on each automatically. Review only what needs
            a decision. For each observation, agree with the AI, correct it and save that as the new
            expected value, or set it aside with a note so it's flagged for follow-up without
            blocking the rest of the review. When everything is reviewed, the next item is one action
            away.
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

        {/* How I measured success */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            How I measured success
          </h2>
          <ul className="space-y-2">
            {[
              "Time per utterance: an estimated 4.5 minutes to under 30 seconds, a 9x reduction on a workflow researchers repeat dozens of times per study.",
              "Steps in the core flow: nine to four.",
              "Shipped: 7 pull requests merged, 29 distinct components and services touched, designed and implemented by me in the client's Angular codebase.",
              "Qualitative: the researcher who called the workflow painful, in the same session, called the corrected flow \"huge.\"",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-warm-gray dark:text-dark-warm-gray">
                <span className="text-terracotta dark:text-dark-terracotta text-sm leading-relaxed shrink-0">–</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* What this says about how I work */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            What this says about how I work
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            This project required treating "confusing" and "wrong" as two different kinds of design
            problems. A confusing interface costs someone time, which is real but recoverable. A
            wrong one, in this context, risks distorting how a rare disease actually presents. So I
            built friction back in deliberately instead of optimizing it away everywhere for the sake of speed.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            It also shows how I hold a hypothesis. I believed the problem was friction, shipped
            against that belief, and then watched a user prove it was only half the story. The result was a stronger redesign that made the end user's life easier.
          </p>
        </section>

        {/* Request Access */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            Full case study
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-6">
            Screens and additional implementation detail are available on request.
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
