import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import ContactForm from "../components/ContactForm";
import { usePageMeta } from "../hooks/usePageMeta";

function Quote({ text, attribution }: { text: string; attribution?: string }) {
  return (
    <figure className="my-3">
      <div className="rounded-2xl bg-terracotta/[0.06] dark:bg-dark-terracotta/[0.08] px-5 py-4">
        <div className="flex gap-3 items-start">
          <svg
            className="text-terracotta dark:text-dark-terracotta shrink-0 mt-0.5"
            width="15" height="15" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="1.75"
            strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <blockquote className="text-sm text-warm-gray dark:text-dark-warm-gray italic leading-relaxed">
            "{text}"
          </blockquote>
        </div>
        {attribution && (
          <figcaption className="mt-2 pl-6 text-xs text-warm-gray/50 dark:text-dark-warm-gray/50">
            {attribution}
          </figcaption>
        )}
      </div>
    </figure>
  );
}

function Carousel({ slides }: { slides: { filename: string; caption: string }[] }) {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const slide = slides[current];

  return (
    <div className="my-10" role="region" aria-label="Journaling flow iterations">
      <div className="relative rounded-lg overflow-hidden bg-cream-dark dark:bg-dark-surface">
        <img
          src={`/${slide.filename}`}
          alt={slide.caption}
          className="w-full max-h-96 object-contain block"
        />

        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cream dark:bg-dark-bg border border-warm-gray/20 dark:border-dark-warm-gray/20 flex items-center justify-center text-warm-gray dark:text-dark-warm-gray hover:text-charcoal dark:hover:text-dark-cream transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cream dark:bg-dark-bg border border-warm-gray/20 dark:border-dark-warm-gray/20 flex items-center justify-center text-warm-gray dark:text-dark-warm-gray hover:text-charcoal dark:hover:text-dark-cream transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {slide.caption && (
        <p className="mt-3 text-sm text-warm-gray dark:text-dark-warm-gray text-center italic">
          {slide.caption}
        </p>
      )}

      <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Slides">
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i === current
                ? "bg-terracotta dark:bg-dark-terracotta"
                : "bg-warm-gray/30 dark:bg-dark-warm-gray/30 hover:bg-warm-gray/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function SpendLight() {
  usePageMeta({
    title: "Designing Mindful Money Habits | Vanessa Bell",
    description: "A six-week lean UX sprint to validate SpendLight: a spending journal that builds mindful money habits through emotional reflection rather than budget control.",
    ogImage: "https://vanessabell.design/spendlight/hero.png",
    path: "/spendlight",
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
            Designing Mindful Money Habits
          </h1>
          <p className="text-warm-gray dark:text-dark-warm-gray mb-8">
            A six-week lean UX sprint to validate the concept of a spending journal.
          </p>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-10 rounded-xl border border-terracotta/20 dark:border-dark-terracotta/25 bg-terracotta/[0.06] dark:bg-dark-terracotta/[0.08] px-5 py-6 sm:px-6">
            {[
              { value: "6 weeks", label: "concept → build-ready spec" },
              { value: "4 insights", label: "research insights → design decisions" },
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
            src="/spendlight/hero.png"
            alt="SpendLight app screens showing the home screen with a bonsai plant and the reflection journaling flow"
            className="max-w-md mx-auto rounded-lg"
          />
        </figure>

          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5 text-sm mt-8 mx-auto">
            {[
              { label: "Role", value: "UX Researcher & Product Designer" },
              { label: "Client", value: "SpendLight (David Larsen, Founder)" },
              { label: "Year", value: "2025" },
              { label: "Scope", value: "Discovery through MVP specification" },
              { label: "Stack", value: "Figma, Figma Make" },
              { label: "Impact", value: "Validated product direction: concept desirable, MVP spec ready for engineering" },
            ].map(({ label, value }) => (
              <div key={label}>
                <dt className="text-warm-gray dark:text-dark-warm-gray mb-1">{label}</dt>
                <dd className="text-charcoal dark:text-dark-cream font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <hr className="border-warm-gray/20 dark:border-dark-warm-gray/20 mb-12" />

        {/* Project Snapshot */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            Project snapshot
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            A founder and former colleague approached me with an early idea for a "spending journal" to improve
            discretionary spending habits. The concept was promising but lacked design direction or validation.
            In six weeks, I transformed his idea into a validated product direction, a mindful journaling flow,
            and a complete MVP specification ready for engineering.
          </p>
        </section>

        {/* Core Experience */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            The core experience: SpendLight's journaling loop
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            To make journaling about discretionary spending effortless, I designed a fast, calming flow built
            around three principles: minimal friction, emotional clarity, and positive reinforcement. The flow
            goes from onboarding to a mood check-in, logging a purchase reflection, capturing context, and
            receiving encouragement through the bonsai micro-animation.
          </p>
          <div className="overflow-hidden rounded-lg my-10 max-w-md mx-auto">
          <video
            autoPlay
            loop
            muted
            playsInline
            aria-label="SpendLight core flow: mood check-in, logging a purchase reflection, adding context, and receiving the bonsai growth reward"
            className="w-full -mt-px"
          >
            <source src="/spendlight/spendlight-core-flow.mp4" type="video/mp4" />
            <source src="/spendlight/spendlight-core-flow.mov" type="video/quicktime" />
          </video>
          </div>
        </section>

        {/* The Problem */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            The problem
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            Traditional budgeting tools focus on categorization and control, which often triggers guilt and
            avoidance. The people I interviewed were not looking for stricter budgets; they wanted emotional
            awareness around their discretionary spending.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            The founder's hypothesis: a spending journal could help people spend more mindfully, just like
            food journaling aids weight loss. To validate this, we needed to know:
          </p>
          <ul className="space-y-2 text-warm-gray dark:text-dark-warm-gray">
            {[
              "Will people actually log discretionary spending manually?",
              "Does reflective journaling provide emotional value?",
              "What is the simplest possible version worth building?",
            ].map((q) => (
              <li key={q} className="flex gap-3">
                <span className="text-terracotta dark:text-dark-terracotta mt-1">–</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* My Approach */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-6">
            My approach
          </h2>
          <div className="space-y-4">
            <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
              I opened the sprint by getting close to users quickly. A screener survey helped recruit the right
              participants, and four 1:1 interviews gave a direct window into real spending habits and emotional
              patterns. In parallel, I set up a landing page messaging test for SpendLight and built an early AI
              prototype in Figma Make to explore what a fast, frictionless reflection flow could feel like,
              before we had validated the core concept.
            </p>
            <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
              With research in hand I shifted into shaping. I explored journal prompting approaches, settled on
              the information architecture, and defined the core habit loop. To pressure-test positioning I ran
              an A/B test on two value propositions: "Find Your Calm" versus "Your Spending Is a Story,"
              gathering signal on which framing resonated before committing to a direction.
            </p>
            <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
              Week five was all about learning under real conditions. Two moderated usability tests with the AI
              prototype revealed friction around clarity, motivation, and the entry experience. I iterated
              between sessions rather than waiting until the end, so fixes could be tested while the insights
              were still fresh.
            </p>
            <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
              The final week brought everything together. I synthesized research and testing into a validated
              product direction and translated it into a complete MVP specification: annotated designs, a
              component inventory, and an event schema ready for engineering handoff.
            </p>
          </div>
        </section>

        {/* Constraints */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-6">
            Constraints & tradeoffs
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                    <line x1="8" y1="15" x2="16" y2="15" />
                  </svg>
                ),
                title: "No bank linking",
                body: 'Focused on discretionary purchases, intentionally excluding bank linking to reduce friction and privacy risk. Yet early feedback was clear: "I don\'t want to have to input all my transaction data!"',
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="12" y1="3" x2="12" y2="6" />
                    <line x1="12" y1="18" x2="12" y2="21" />
                    <line x1="3" y1="12" x2="6" y2="12" />
                    <line x1="18" y1="12" x2="21" y2="12" />
                  </svg>
                ),
                title: "Discretionary focus",
                body: "Chose not to support full expense tracking to avoid recreating budgeting fatigue. This narrowed the journaling experience but improved clarity.",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="12 7 12 12 15.5 12" />
                  </svg>
                ),
                title: "Six-week timeline",
                body: "Opted for parallel validation of messaging and prototype, requiring iterative decisions with incomplete data.",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="4" rx="1" />
                    <rect x="3" y="10" width="12" height="4" rx="1" />
                    <rect x="3" y="17" width="7" height="4" rx="1" />
                  </svg>
                ),
                title: "Scope tradeoffs",
                body: "Analytics, social features, and in-depth coaching were intentionally excluded from MVP to keep the experience focused and buildable.",
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="rounded-lg border border-warm-gray/15 dark:border-dark-warm-gray/15 bg-cream-dark/40 dark:bg-dark-surface/40 p-5">
                <span className="inline-flex text-terracotta dark:text-dark-terracotta mb-3">
                  {icon}
                </span>
                <p className="font-medium text-charcoal dark:text-dark-cream mb-1">{title}</p>
                <p className="text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What Research Revealed */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-6">
            What research revealed
          </h2>

          <div className="space-y-10">
            {[
              {
                n: "01",
                heading: "Journaling works, but only when the purpose is explicit",
                body: "Without context, the app felt too open-ended. Clarifying the focus on discretionary spending became central to onboarding.",
                quotes: [
                  "If it feels like work, I'm not gonna do it.",
                  "Typing into Notes becomes a job I don't want to do.",
                ],
                implication: "Minimal reflection-first flow with optional details only.",
              },
              {
                n: "02",
                heading: "Encouragement, not judgment",
                body: "People wanted context and interpretation, not budgeting alarms or scolding.",
                quotes: [
                  "I want an AI coach I can tell everything to, and it helps me understand what's essential.",
                  "Just show me what changed this month.",
                ],
                implication: "Inspired the bonsai growth reward, the emotional anchor of the app's home screen.",
              },
              {
                n: "03",
                heading: "Money is emotional",
                body: "Participants linked money to mood, self-worth, and family roles. Emotional triggers disproportionately shaped financial decisions.",
                quotes: [
                  "Money is emotional as much as it is numerical.",
                  "When it's the last days before payday I'm like AAAAH constant anxiety.",
                ],
                implication: "Use warm, non-judgmental language and reflection prompts that normalize emotion.",
              },
              {
                n: "04",
                heading: "Awareness over budgets",
                body: "Participants rejected prescriptive budget styles. They wanted to understand patterns without being judged.",
                quotes: [
                  "I know some people have a specific amount they can spend on food. That would stress me out.",
                  "I want to know if I'm living below my means.",
                ],
                implication: "Prioritize awareness snapshots over prescriptive budgets.",
              },
            ].map(({ n, heading, body, quotes, implication }) => (
              <div key={n}>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono text-xs text-terracotta dark:text-dark-terracotta tracking-widest shrink-0">
                    {n}
                  </span>
                  <h3 className="font-medium text-charcoal dark:text-dark-cream">{heading}</h3>
                </div>
                <p className="text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-3 pl-8">
                  {body}
                </p>
                <div className="pl-8">
                  {quotes.map((q) => <Quote key={q} text={q} />)}
                  <div className="border-l-2 border-olive/40 dark:border-dark-olive/40 pl-5 mt-2">
                    <p className="text-xs font-mono text-olive dark:text-dark-olive uppercase tracking-wider mb-0.5">
                      Design implication
                    </p>
                    <p className="text-sm text-olive dark:text-dark-olive leading-relaxed">
                      {implication}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* <ImagePlaceholder
            filename="spendlight/research-synthesis.png"
            caption="Research synthesis: themes and insights from four 45–60 min interviews"
          /> */}
        </section>

        {/* IA & Screens */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            Information architecture & core experience
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-6">
            SpendLight needed to support a daily reflection habit without feeling like a budgeting tool.
            Primary screens: Home (bonsai, emotional anchor, entry point), Reflection Flow (purchase or
            no-spend day), History (feed + calendar), and Insights (pattern cards revealed after enough entries).
          </p>
          <p className="text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-2">
            <span className="font-medium text-charcoal dark:text-dark-cream">Core loop:</span>{" "}
            Add reflection → add emotional context → receive bonsai growth feedback → review patterns in Insights.
          </p>
          {/* <ImagePlaceholder
            filename="spendlight/screens-overview.png"
            caption="Primary screens: Home, Reflection Flow, History, Insights"
          /> */}
        </section>

        {/* Testing */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            Testing & iteration
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-8">
            I conducted two moderated usability tests using a high-fidelity prototype.
          </p>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <p className="font-medium text-charcoal dark:text-dark-cream mb-3">What worked</p>
              <ul className="space-y-2">
                {[
                  "Reflection prompts felt meaningful and calming",
                  "Emotional framing resonated immediately",
                  "Bonsai animation provided gentle motivation and a delight factor",
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-warm-gray dark:text-dark-warm-gray">
                    <span className="text-olive dark:text-dark-olive mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-charcoal dark:text-dark-cream mb-3">What we improved</p>
              <ul className="space-y-2">
                {[
                  "Purpose clarity: Reworked onboarding to emphasize discretionary focus",
                  "Tag complexity: Kept tags optional to reduce cognitive load",
                  "No-spend days: Created a dedicated flow so users felt rewarded",
                  "Celebration pacing: Slowed bonsai animation for better emotional impact",
                  "Insights visibility: Added insight cards directly to the feed",
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-warm-gray dark:text-dark-warm-gray">
                    <span className="text-terracotta dark:text-dark-terracotta mt-0.5">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Carousel
            slides={[
              { filename: "spendlight/sketch.png", caption: "Early concept sketch: mapping the core journaling loop" },
              { filename: "spendlight/old-2-step-journal-flow.jpg", caption: "V1: Original two-step journal flow before usability testing" },
              { filename: "spendlight/final-reflection.jpg", caption: "Final reflection screen: simplified prompts, reduced cognitive load" },
              { filename: "spendlight/bonsai-growth-celebration.jpg", caption: "Bonsai growth celebration: the emotional reward at the heart of the app" },
            ]}
          />
        </section>

        {/* Outcome */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            Outcome
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-6">
            The six-week sprint delivered a validated product strategy and a complete MVP specification.
            Research confirmed that the spending journal concept was desirable when scoped to discretionary
            purchases and framed around emotional awareness rather than budget control.
          </p>
          <ul className="space-y-2">
            {[
              "Validated product direction backed by user research",
              "Full MVP specification ready for engineering",
              "Annotated design package with event schema",
              "A/B tested value propositions with a clear winner",
              "Usability-tested prototype with two rounds of iteration",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-warm-gray dark:text-dark-warm-gray">
                <span className="text-terracotta dark:text-dark-terracotta text-sm leading-relaxed shrink-0">–</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Testimonial */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-6">
            Testimonial
          </h2>
          <blockquote className="border-l-2 border-terracotta dark:border-dark-terracotta pl-6">
            <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed italic mb-4">
              "Vanessa functioned as an invaluable partner to help take a lot of scattered concepts and really
              develop a cohesive product concept for SpendLight. While I came to the table with a ton of possible
              directions, Vanessa brought us to that necessary point of convergence… From the first day, she felt
              like a true partner in our project. I very highly recommend Vanessa to any organization in need of
              excellent product development work."
            </p>
            <footer className="text-sm text-charcoal dark:text-dark-cream font-medium">
              David Larsen, Founder, SpendLight
            </footer>
          </blockquote>
        </section>

        {/* How I Measured Success */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            How I measured success
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            Success here wasn't a usage metric. There was no live product yet. I measured it against
            the sprint's actual goal: did we know, at the end of six weeks, whether this was worth
            building.
          </p>
          <ul className="space-y-2">
            {[
              "Four 1:1 interviews and two moderated usability tests turned into four concrete research insights, each of which changed a specific design decision, from the onboarding framing to the pacing of the bonsai animation.",
              "An A/B test on two value propositions gave the founder a clear, evidence-backed answer instead of a guess.",
              "The sprint ended with a complete MVP specification ready to hand to engineering: annotated designs, a component inventory, and an event schema.",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-warm-gray dark:text-dark-warm-gray">
                <span className="text-terracotta dark:text-dark-terracotta text-sm leading-relaxed shrink-0">–</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* What This Says About How I Work */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            What this says about how I work
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            This project was about resisting the urge to design the whole product on day one. The
            founder came in with a wide set of possible directions, and the temptation with six weeks
            and no live users is to pick one and start pushing pixels. Instead I spent the first two
            weeks getting close to real people's spending habits before committing to a direction,
            then used the remaining time to test and narrow rather than build wider.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            The output wasn't a finished app. It was confidence, backed by research, about which
            narrower thing was worth building next.
          </p>
        </section>

        <section className="mb-16" aria-label="Contact">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            Get in touch
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-6">
            Open to contract engagements.
          </p>
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
