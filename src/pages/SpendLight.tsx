import { useEffect, useRef, useState } from "react";
import SiteHeader from "../components/SiteHeader";
import { usePageMeta } from "../hooks/usePageMeta";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

function Quote({ text, attribution }: { text: string; attribution?: string }) {
  return (
    <figure className="my-3">
      <div className="rounded-2xl bg-clay/[0.06] dark:bg-dark-clay/[0.08] px-5 py-4">
        <div className="flex gap-3 items-start">
          <svg
            className="text-clay-dark dark:text-dark-clay shrink-0 mt-0.5"
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

type InsightImage = { src: string; width: number; height: number; alt: string; caption: string; label?: string };

type Insight = {
  n: string;
  heading: string;
  body: string;
  quotes: string[];
  implication: string;
  images?: InsightImage[];
};

function InsightBlock({ n, heading, body, quotes, implication, images }: Insight) {
  return (
    <details className="group border-b border-warm-gray/15 dark:border-dark-warm-gray/15 py-5 first:pt-0">
      <summary className="flex items-center justify-between gap-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span className="min-w-0">
          <span className="flex items-baseline gap-3">
            <span className="font-mono text-xs text-clay-dark dark:text-dark-clay tracking-widest shrink-0">
              {n}
            </span>
            <h3 className="font-medium text-charcoal dark:text-dark-cream">{heading}</h3>
          </span>
          <p className="mt-1 pl-8 text-xs text-sage dark:text-dark-sage leading-snug line-clamp-1 group-open:hidden">
            {implication}
          </p>
        </span>
        <svg
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.75"
          strokeLinecap="round" strokeLinejoin="round"
          className="shrink-0 text-warm-gray dark:text-dark-warm-gray transition-transform group-open:rotate-180"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </summary>
      <div className="pl-8 pt-4">
        <p className="text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-3">
          {body}
        </p>
        {quotes.map((q) => <Quote key={q} text={q} />)}
        <div className="border-l-2 border-sage/40 dark:border-dark-sage/40 pl-5 mt-2 mb-4">
          <p className="text-xs font-mono text-sage dark:text-dark-sage uppercase tracking-wider mb-0.5">
            Design implication
          </p>
          <p className="text-sm text-sage dark:text-dark-sage leading-relaxed">
            {implication}
          </p>
        </div>
        {images && images.length > 0 && (
          <div className={images.length > 1 ? "grid grid-cols-2 gap-4 max-w-md" : "max-w-xs"}>
            {images.map((image) => (
              <figure key={image.src}>
                {image.label && (
                  <p className="text-xs font-mono uppercase tracking-wider text-warm-gray dark:text-dark-warm-gray mb-2">
                    {image.label}
                  </p>
                )}
                <img
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  alt={image.alt}
                  className="w-full rounded-lg border border-warm-gray/15 dark:border-dark-warm-gray/15"
                />
                <figcaption className="mt-3 text-sm text-warm-gray dark:text-dark-warm-gray italic">
                  {image.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </details>
  );
}

const insights: Insight[] = [
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
    heading: "Awareness over budgets",
    body: "Participants rejected prescriptive budget styles. They wanted to understand patterns without being judged.",
    quotes: [
      "I know some people have a specific amount they can spend on food. That would stress me out.",
      "I want to know if I'm living below my means.",
    ],
    implication: "Prioritize awareness snapshots over prescriptive budgets.",
  },
  {
    n: "03",
    heading: "The invisible spending is small, cash, and forgettable",
    body: "Big recurring bills already track themselves through autopay. What people actually lost track of was smaller and less visible: bus fare change, a snack, a subscription renewal — cash-based or too minor to leave a bank-app trail.",
    quotes: [
      "I want to know where it's going — those little amounts too.",
      "I don't get a statement or balance — I just need to know what I'm spending.",
    ],
    implication: "Prioritized a fast, cash-friendly capture path over bank-linked automation — the app had to be the place for spending too small or too informal for a bank app to ever show.",
  },
  {
    n: "04",
    heading: "People wanted a coach, not a ledger",
    body: "Unprompted, several participants described wanting the app to interpret their spending, not just record it — flagging what was essential versus impulsive, or weighing what a purchase meant for a longer-term goal.",
    quotes: [
      "It takes this information and coaches me on how to manage my money — this is how I can cut out these expenses going forward.",
      "What's more important to you — coffee now, or retirement later?",
    ],
    implication: "Flagged as a roadmap signal beyond the six-week scope — the validated core loop stayed a reflection log, with AI-assisted coaching noted as the natural next layer to spec once the log itself was proven.",
  },
  {
    n: "05",
    heading: "Money is emotional",
    body: "Money wasn't just numbers — it was tangled up in identity, guilt, and relationship dynamics, from self-care spending to who's really \"the spender\" in a household.",
    quotes: [
      "Spending on myself feels like an escape — but it comes with guilt.",
      "We used a month of tracking data just to settle who's really 'the spender' in our house.",
    ],
    implication: "Use warm, non-judgmental language and reflection prompts that normalize emotion.",
  },
];

function JumpNav() {
  const links = [
    { href: "#the-problem", label: "Problem" },
    { href: "#approach", label: "Approach" },
    { href: "#constraints", label: "Constraints" },
    { href: "#research", label: "Research" },
    { href: "#testimonial", label: "Testimonial" },
    { href: "#outcome", label: "Outcome" },
  ];
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const elements = links
      .map(({ href }) => document.getElementById(href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      // Thin band just below the stacked sticky header + jump nav, so a section
      // counts "active" once its heading clears both bars.
      { rootMargin: "-140px 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const link = activeHref ? linkRefs.current[activeHref] : null;
    if (!scroller || !link) return;
    const scrollerRect = scroller.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    if (linkRect.left < scrollerRect.left || linkRect.right > scrollerRect.right) {
      const target = link.offsetLeft - scroller.clientWidth / 2 + link.clientWidth / 2;
      scroller.scrollTo({ left: target, behavior: "smooth" });
    }
  }, [activeHref]);

  return (
    <nav
      aria-label="Jump to a section (not every section is listed)"
      className="sticky top-[69px] sm:top-[61px] z-40 -mx-6 sm:-mx-8 mb-12 border-y border-warm-gray/15 dark:border-dark-warm-gray/15 bg-cream/95 dark:bg-dark-bg/95 backdrop-blur-sm"
    >
      <div className="relative">
        <div
          ref={scrollerRef}
          className="flex items-center gap-x-1 px-4 sm:px-6 text-xs font-mono uppercase tracking-widest overflow-x-auto no-scrollbar"
        >
          <span className="text-warm-gray dark:text-dark-warm-gray pr-2 shrink-0" aria-hidden="true">
            Jump to:
          </span>
          {links.map(({ href, label }) => {
            const isActive = activeHref === href;
            return (
              <a
                key={href}
                ref={(el) => {
                  linkRefs.current[href] = el;
                }}
                href={href}
                aria-current={isActive ? "true" : undefined}
                className={`inline-flex items-center px-2 py-3.5 shrink-0 transition-colors ${
                  isActive
                    ? "text-clay-dark dark:text-dark-clay font-medium"
                    : "text-charcoal dark:text-dark-cream hover:text-clay-dark dark:hover:text-dark-clay"
                }`}
              >
                {label}
              </a>
            );
          })}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-cream dark:from-dark-bg to-transparent"
        />
      </div>
    </nav>
  );
}

export default function SpendLight() {
  usePageMeta({
    title: "Designing Mindful Money Habits | Vanessa Bell",
    description: "A six-week lean UX sprint to validate SpendLight: a spending journal that builds mindful money habits through emotional reflection rather than budget control.",
    ogImage: "https://vanessabell.design/spendlight/hero.png",
    path: "/spendlight",
  });

  const prefersReducedMotion = usePrefersReducedMotion();
  const [lightbox, setLightbox] = useState<{ src: string; width: number; height: number; alt: string; hint?: string } | null>(null);
  const lightboxTriggerRef = useRef<HTMLElement | null>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!lightbox) return;
    lightboxCloseRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightbox(null);
      } else if (e.key === "Tab") {
        // The dialog has exactly one focusable element (the close button),
        // so trapping just means Tab never leaves it.
        e.preventDefault();
        lightboxCloseRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      lightboxTriggerRef.current?.focus();
    };
  }, [lightbox]);

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
            Designing Mindful Money Habits
          </h1>
          <p className="text-warm-gray dark:text-dark-warm-gray mb-8">
            A six-week lean UX sprint to validate the concept of a spending journal.
          </p>

          <div className="overflow-hidden rounded-lg my-10 max-w-md mx-auto">
            {prefersReducedMotion ? (
              <img
                src="/spendlight/hero-static.jpg"
                width={893}
                height={900}
                alt="SpendLight core flow: mood check-in, logging a purchase reflection, adding context, and receiving the bonsai growth reward"
                className="w-full -mt-px"
              />
            ) : (
              <video
                autoPlay
                loop
                muted
                playsInline
                width={900}
                height={1072}
                aria-label="SpendLight core flow: mood check-in, logging a purchase reflection, adding context, and receiving the bonsai growth reward"
                className="w-full -mt-px"
              >
                <source src="/spendlight/spendlight-core-flow.mp4" type="video/mp4" />
              </video>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-10 rounded-xl border border-clay/20 dark:border-dark-clay/25 bg-clay/[0.06] dark:bg-dark-clay/[0.08] px-5 py-6 sm:px-6">
            {[
              { value: "6 weeks", label: "concept → build-ready spec" },
              { value: "5 insights", label: "research insights → design decisions" },
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

          <p className="mb-8">
            <a
              href="#outcome"
              className="text-sm text-clay-dark dark:text-dark-clay underline underline-offset-4 hover:underline-offset-6 transition-all duration-150"
            >
              See the final screens →
            </a>
          </p>

          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5 text-sm mt-8 mx-auto">
            {[
              { label: "Role", value: "UX Researcher & Product Designer" },
              { label: "Client", value: "SpendLight (David Larsen, Founder)" },
              { label: "Year", value: "2025" },
              { label: "Team", value: "Solo designer" },
              { label: "Scope", value: "Discovery through MVP specification (Figma, Figma Make)" },
              { label: "Impact", value: "Validated product direction: MVP spec ready for engineering" },
            ].map(({ label, value }) => (
              <div key={label}>
                <dt className="text-warm-gray dark:text-dark-warm-gray mb-1">{label}</dt>
                <dd className="text-charcoal dark:text-dark-cream font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <hr className="border-warm-gray/20 dark:border-dark-warm-gray/20 mb-12" />

        <JumpNav />

        {/* Project Snapshot */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            Project snapshot
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            A founder and former colleague approached me with an early idea for a "spending journal" to improve
            discretionary spending habits. The concept was promising but lacked design direction or validation.
            In six weeks, I transformed his idea into a validated product direction — a fast, calming journaling
            flow built around minimal friction, emotional clarity, and positive reinforcement — and a complete
            MVP specification ready for engineering.
          </p>
        </section>

        {/* The Problem */}
        <section id="the-problem" className="mb-12 scroll-mt-[140px] sm:scroll-mt-[130px]">
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
              "Will people actually log discretionary spending manually (the founder's constraint ruled out bank linking)?",
              "Would a spending journal — framed around emotional insight, not budgets — actually feel appealing and actionable?",
              "What would make people stick with logging day to day, and what would make them quit?",
            ].map((q) => (
              <li key={q} className="flex gap-3">
                <span className="text-clay-dark dark:text-dark-clay mt-1">–</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>

          <figure className="mt-8">
            <button
              type="button"
              onClick={(e) => {
                lightboxTriggerRef.current = e.currentTarget;
                setLightbox({
                  src: "/spendlight/existing-prototype-annotated.jpg",
                  width: 1098,
                  height: 874,
                  alt: "Heuristic critique of the founder's early prototype: an atypical spot for the FAB, an unnecessary credit-vs-debit distinction, repetitive mood 'decision' tags, and an unclear overflow menu",
                });
              }}
              className="block w-full cursor-zoom-in"
              aria-label="View the prototype critique at full size"
            >
              <img
                src="/spendlight/existing-prototype-annotated.jpg"
                width={1098}
                height={874}
                loading="lazy"
                alt="Heuristic critique of the founder's early prototype: an atypical spot for the FAB, an unnecessary credit-vs-debit distinction, repetitive mood 'decision' tags, and an unclear overflow menu"
                className="w-full rounded-lg border border-warm-gray/15 dark:border-dark-warm-gray/15"
              />
            </button>
            <figcaption className="mt-3 text-sm text-warm-gray dark:text-dark-warm-gray text-center italic">
              A heuristic critique of the founder's early prototype — the redesign started by naming exactly what wasn't working. Tap to zoom in.
            </figcaption>
          </figure>
        </section>

        {/* My Approach */}
        <section id="approach" className="mb-12 scroll-mt-[140px] sm:scroll-mt-[130px]">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-6">
            My approach
          </h2>
          <div className="space-y-8">
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-xs text-clay-dark dark:text-dark-clay tracking-widest shrink-0">
                  Weeks 1–2
                </span>
                <h3 className="font-medium text-charcoal dark:text-dark-cream">Getting close to users</h3>
              </div>
              <p className="text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed pl-8 mb-6">
                A screener survey helped recruit the right participants, and four 1:1 interviews gave a direct
                window into real spending habits and emotional patterns. In parallel, I set up a landing page
                messaging test for SpendLight and built an early AI prototype in Figma Make to explore what a
                fast, frictionless reflection flow could feel like, before we had validated the core concept.
              </p>
              <figure className="max-w-xs mx-auto pl-8">
                <img
                  src="/spendlight/transaction-reflection-sketch.jpg"
                  width={501}
                  height={700}
                  loading="lazy"
                  alt="Early sketch of the transaction entry and reflection card sequence, working out where auto-complete and a sticky save button would live"
                  className="w-full rounded-lg border border-warm-gray/15 dark:border-dark-warm-gray/15"
                />
                <figcaption className="mt-3 text-sm text-warm-gray dark:text-dark-warm-gray text-center italic">
                  Sketching what "fast and frictionless" could actually look like.
                </figcaption>
              </figure>
            </div>

            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-xs text-clay-dark dark:text-dark-clay tracking-widest shrink-0">
                  Weeks 3–4
                </span>
                <h3 className="font-medium text-charcoal dark:text-dark-cream">Shaping the concept</h3>
              </div>
              <p className="text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed pl-8 mb-6">
                I explored journal prompting approaches, settled on the information architecture, and defined
                the core habit loop. To pressure-test positioning I ran an A/B test on two value propositions:
                "Find Your Calm" versus "Your Spending Is a Story," gathering signal on which framing resonated
                before committing to a direction.
              </p>
              <figure>
                <img
                  src="/spendlight/landing-page-desktop.jpg"
                  width={1200}
                  height={666}
                  loading="lazy"
                  alt="SpendLight landing page desktop hero: headline 'Most spending happens on autopilot,' a subhead on awareness, a 'Join the Waitlist' CTA, and a phone mockup of the Insights screen comparing spending by mood"
                  className="w-full rounded-lg border border-warm-gray/15 dark:border-dark-warm-gray/15"
                />
                <figcaption className="mt-3 text-sm text-warm-gray dark:text-dark-warm-gray text-center italic">
                  The landing page's desktop hero — built to test messaging before committing to a design direction.
                </figcaption>
              </figure>
            </div>

            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-xs text-clay-dark dark:text-dark-clay tracking-widest shrink-0">
                  Week 5
                </span>
                <h3 className="font-medium text-charcoal dark:text-dark-cream">Learning under real conditions</h3>
              </div>
              <p className="text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed pl-8">
                Two moderated usability tests with the AI prototype revealed friction around clarity,
                motivation, and the entry experience. I iterated between sessions rather than waiting until
                the end, so fixes could be tested while the insights were still fresh.
              </p>
            </div>

            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-xs text-clay-dark dark:text-dark-clay tracking-widest shrink-0">
                  Week 6
                </span>
                <h3 className="font-medium text-charcoal dark:text-dark-cream">Bringing it together</h3>
              </div>
              <p className="text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed pl-8">
                I synthesized six weeks of research and testing into a build-ready MVP spec: annotated designs and an event schema for engineering handoff.
              </p>
            </div>
          </div>
        </section>

        {/* Constraints */}
        <section id="constraints" className="mb-12 scroll-mt-[140px] sm:scroll-mt-[130px]">
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
                body: 'Intentionally excluded bank linking to keep spending data private. Yet early feedback was clear: "I don\'t want to have to input all my transaction data!"',
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
                <span className="inline-flex text-clay-dark dark:text-dark-clay mb-3">
                  {icon}
                </span>
                <h3 className="font-medium text-charcoal dark:text-dark-cream mb-1">{title}</h3>
                <p className="text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What Research Revealed */}
        <section id="research" className="mb-12 scroll-mt-[140px] sm:scroll-mt-[130px]">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-6">
            What research revealed
          </h2>

          <figure className="mb-10 w-screen max-w-none ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]">
            <img
              src="/spendlight/research-synthesis.jpg"
              width={1381}
              height={1400}
              loading="lazy"
              alt="Affinity board synthesizing four 1:1 interviews into five themed clusters, each with a design-impact insight and supporting quotes"
              className="w-full max-w-[960px] mx-auto h-auto block rounded-lg border border-warm-gray/15 dark:border-dark-warm-gray/15"
            />
            <figcaption className="mt-3 text-sm text-warm-gray dark:text-dark-warm-gray text-center italic px-6">
              Research synthesis: four interviews affinity-mapped into the five themes below, ranked by design impact.
            </figcaption>
          </figure>

          <div>
            {insights.map((insight) => (
              <InsightBlock key={insight.n} {...insight} />
            ))}
          </div>
        </section>

        {/* IA & Screens */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            Information architecture & core experience
          </h2>
          <div className="grid sm:grid-cols-2 gap-8 items-start mb-10">
            <div>
              <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-6">
                SpendLight comes down to one loop, repeated daily:
              </p>
              <div className="space-y-6">
                {[
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                      </svg>
                    ),
                    n: "1",
                    title: "Add a purchase",
                    body: "Type or speak what you bought, plus any optional details.",
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9 18h6" />
                        <path d="M10 22h4" />
                        <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2Z" />
                      </svg>
                    ),
                    n: "2",
                    title: "Reflect on a journal prompt",
                    body: "A moment to understand the why behind the spending, not just the what.",
                  },
                  {
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="3 17 9 11 13 15 21 7" />
                        <polyline points="14 7 21 7 21 14" />
                      </svg>
                    ),
                    n: "3",
                    title: "See insights over time",
                    body: "Patterns in spending and emotional triggers surface gently, without judgment. The more purchases you log, the richer the insights.",
                  },
                ].map(({ icon, n, title, body }) => (
                  <div key={n} className="flex gap-4 items-start">
                    <span className="shrink-0 w-10 h-10 rounded-xl bg-clay/10 dark:bg-dark-clay/15 text-clay-dark dark:text-dark-clay flex items-center justify-center">
                      {icon}
                    </span>
                    <div>
                      <p className="font-medium text-charcoal dark:text-dark-cream mb-1">
                        <span className="font-mono text-xs text-clay-dark dark:text-dark-clay tracking-widest mr-2">{n}</span>
                        {title}
                      </p>
                      <p className="text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <figure className="max-w-xs mx-auto sm:mx-0">
              <img
                src="/spendlight/no-spend-reflection-screen.jpg"
                width={750}
                height={1404}
                loading="lazy"
                alt="The no-spend day reflection screen: a prompt to reflect on choosing not to spend, without a purchase to log"
                className="w-full rounded-lg border border-warm-gray/15 dark:border-dark-warm-gray/15"
              />
              <figcaption className="mt-3 text-sm text-warm-gray dark:text-dark-warm-gray text-center italic">
                The other half of the loop — reflecting on a no-spend day gets the same weight as logging a purchase.
              </figcaption>
            </figure>
          </div>
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
                    <span className="text-sage dark:text-dark-sage mt-0.5">✓</span>
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
                  "Insights visibility: Added insight cards directly to the home screen feed",
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-warm-gray dark:text-dark-warm-gray">
                    <span className="text-clay-dark dark:text-dark-clay mt-0.5">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8 max-w-xl mx-auto">
            <figure>
              <img
                src="/spendlight/old-2-step-journal-flow.jpg"
                width={393}
                height={850}
                loading="lazy"
                alt="V1: the original two-step journal flow, before usability testing exposed its friction"
                className="w-full rounded-lg border border-warm-gray/15 dark:border-dark-warm-gray/15"
              />
              <figcaption className="mt-3 text-sm text-warm-gray dark:text-dark-warm-gray text-center italic">
                Before: in user testing, the v1 flow caused friction due to too many form fields per entry.
              </figcaption>
            </figure>
            <figure>
              <img
                src="/spendlight/purchase-reflection-screen.png"
                width={704}
                height={1258}
                loading="lazy"
                alt="The final reflection screen: an editable purchase note, one AI-generated prompt at a time, and an optional details field"
                className="w-full rounded-lg border border-warm-gray/15 dark:border-dark-warm-gray/15"
              />
              <figcaption className="mt-3 text-sm text-warm-gray dark:text-dark-warm-gray text-center italic">
                After: the form became much simpler by hiding optional fields by default, reducing cognitive load. 
              </figcaption>
            </figure>
            <figure>
              <img
                src="/spendlight/home-mood-chart.jpg"
                width={393}
                height={850}
                loading="lazy"
                alt="An early Home screen exploration showing a spending total and a mood trend chart"
                className="w-full rounded-lg border border-warm-gray/15 dark:border-dark-warm-gray/15"
              />
              <figcaption className="mt-3 text-sm text-warm-gray dark:text-dark-warm-gray text-center italic">
                Considered: a mood-tracking Home screen — too close to a budgeting dashboard.
              </figcaption>
            </figure>
            <figure>
              <img
                src="/spendlight/bonsai-growth-celebration.jpg"
                width={786}
                height={810}
                loading="lazy"
                alt="The bonsai growth celebration screen, the emotional reward at the heart of the app"
                className="w-full rounded-lg border border-warm-gray/15 dark:border-dark-warm-gray/15"
              />
              <figcaption className="mt-3 text-sm text-warm-gray dark:text-dark-warm-gray text-center italic">
                Shipped: the bonsai reward instead — focused on emotional reinforcement.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Testimonial — the transition beat: proof it worked, from a real person, right
            before the visual finale. */}
        <section id="testimonial" className="mb-12 scroll-mt-[140px] sm:scroll-mt-[130px]">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-6">
            Testimonial
          </h2>
          <blockquote className="border-l-2 border-clay dark:border-dark-clay pl-6">
            <p className="font-serif text-lg sm:text-xl text-charcoal dark:text-dark-cream leading-snug italic mb-4">
              "Vanessa functioned as an invaluable partner to help take a lot of scattered concepts and really
              develop a cohesive product concept for SpendLight. While I came to the table with a ton of possible
              directions, Vanessa brought us to that necessary point of convergence… From the first day, she felt
              like a true partner in our project. I very highly recommend Vanessa to any organization in need of
              excellent product development work."
            </p>
            <footer className="text-sm text-warm-gray dark:text-dark-warm-gray font-medium">
              David Larsen, Founder, SpendLight
            </footer>
          </blockquote>
        </section>

        {/* Outcome — the true finale: Key Screens is the last thing on the page, on purpose.
            The stat block up top already covers the fast-skim job. */}
        <section id="outcome" className="mb-12 scroll-mt-[140px] sm:scroll-mt-[130px]">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-6">
            Outcome
          </h2>

          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-6">
            What the research confirmed: people wanted emotional clarity, not budgeting mechanics. Scoping to discretionary spending and rewarding journaling consistency over judging purchases as "good" vs "bad" is what made the concept land.
          </p>
          <ul className="space-y-2 mb-8">
            {[
              "Validated product direction backed by user research",
              "Usability-tested prototype with two rounds of iteration",
              "Annotated design package with event schema",
              "Full MVP specification ready for engineering",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-warm-gray dark:text-dark-warm-gray">
                <span className="text-clay-dark dark:text-dark-clay text-sm leading-relaxed shrink-0">–</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <figure className="mb-4 w-screen max-w-none ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]">
            <button
              type="button"
              onClick={(e) => {
                lightboxTriggerRef.current = e.currentTarget;
                setLightbox({
                  src: "/spendlight/key-screens.jpg",
                  width: 1600,
                  height: 840,
                  alt: "Four key SpendLight screens: Today's home feed with the bonsai and mood check-in, the Purchase Reflection prompt, History with monthly insights, and the Insights screen connecting mood to spending",
                  hint: "Swipe to see all four screens",
                });
              }}
              className="block w-full cursor-zoom-in"
              aria-label="View the four key screens at full size"
            >
              <img
                src="/spendlight/key-screens.jpg"
                width={1600}
                height={840}
                loading="lazy"
                alt="Four key SpendLight screens: Today's home feed with the bonsai and mood check-in, the Purchase Reflection prompt, History with monthly insights, and the Insights screen connecting mood to spending"
                className="w-full max-w-[1600px] mx-auto h-auto block rounded-lg"
              />
            </button>
            <figcaption className="mt-3 text-sm text-warm-gray dark:text-dark-warm-gray text-center italic px-6">
              Today, Purchase Reflection, History, and Insights — the four screens the spec was built around. Tap to zoom in.
            </figcaption>
          </figure>

          <p>
            <a
              href="https://www.figma.com/proto/r0qMiIVKp2MWuQiZi4FWq6/Designs---SpendLight-UX?node-id=326-58&p=f&t=HL8fHSmadCi23G5o-1&scaling=scale-down&content-scaling=fixed&page-id=326%3A2&starting-point-node-id=326%3A58"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-clay-dark dark:text-dark-clay underline underline-offset-4 hover:underline-offset-6 transition-all duration-150"
            >
              View the interactive prototype in Figma →
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </p>
        </section>

      </main>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          className="fixed inset-0 z-50 overflow-auto bg-charcoal/95 dark:bg-dark-bg/98"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightbox(null);
          }}
        >
          <button
            ref={lightboxCloseRef}
            type="button"
            onClick={() => setLightbox(null)}
            className="fixed top-4 right-4 z-10 rounded-full bg-charcoal/60 text-cream p-2.5 hover:bg-charcoal/80 transition-colors"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          {lightbox.hint && (
            <p className="sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-10 text-xs text-cream/80 bg-charcoal/60 rounded-full px-3 py-1.5 pointer-events-none">
              {lightbox.hint}
            </p>
          )}
          <img
            src={lightbox.src}
            width={lightbox.width}
            height={lightbox.height}
            alt={lightbox.alt}
            style={{ width: lightbox.width }}
            className="max-w-none h-auto mx-auto my-12"
          />
        </div>
      )}
    </div>
  );
}
