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

function JumpNav() {
  const links = [
    { href: "#the-problem", label: "Problem" },
    { href: "#constraints", label: "Constraints" },
    { href: "#approach", label: "Approach" },
    { href: "#research", label: "Research" },
    { href: "#testimonial", label: "Testimonial" },
    { href: "#final-screens", label: "Final screens" },
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

    // A fast/instant scroll (fling, scrollbar drag, End key) can jump past the
    // observer's active band without firing an intersection change, leaving the
    // nav stuck on the second-to-last section. Force the last link active once
    // the user is effectively at the bottom of the page. Deferred with a short
    // timeout so it runs after any IntersectionObserver callback queued for the
    // same scroll event, rather than racing it.
    let bottomCheckTimeout: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(bottomCheckTimeout);
      bottomCheckTimeout = setTimeout(() => {
        const scrolledToBottom =
          window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
        if (scrolledToBottom) {
          setActiveHref(links[links.length - 1].href);
        }
      }, 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      clearTimeout(bottomCheckTimeout);
    };
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

export default function MonsterWalk() {
  usePageMeta({
    title: "Turning Daily Walks into Daily Wins | Vanessa Bell",
    description: "UX research and redesign of Monster Walk's Welcome Back flow: turning a flat, confusing screen into a motivating streak milestone moment. Validated at 4.8/5 average return intent in concept testing.",
    ogImage: "https://vanessabell.design/monster-walk/monster-walk-hero.gif",
    path: "/monster-walk",
  });

  const prefersReducedMotion = usePrefersReducedMotion();
  const [lightbox, setLightbox] = useState<{ src: string; width: number; height: number; alt: string } | null>(null);
  const lightboxTriggerRef = useRef<HTMLElement | null>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!lightbox) return;
    lightboxCloseRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightbox(null);
      } else if (e.key === "Tab") {
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
            Turning Daily Walks into Daily Wins
          </h1>
          <p className="text-warm-gray dark:text-dark-warm-gray mb-8">
            A cohort externship: researching and testing a redesign of Monster Walk's Welcome Back flow.
          </p>

          <figure className="my-10">
            <img
              src={
                prefersReducedMotion
                  ? "/monster-walk/monster-walk-static.jpg"
                  : "/monster-walk/monster-walk-hero.gif"
              }
              width={prefersReducedMotion ? 278 : 1082}
              height={prefersReducedMotion ? 462 : 1795}
              alt="Animated gif of the Monster Walk app showing the redesigned Welcome Back flow: personalized monster greeting, animated stamina meter, streak counter, and milestone celebration"
              className="max-h-96 w-auto mx-auto block rounded-lg"
            />
          </figure>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-10 rounded-xl border border-clay/20 dark:border-dark-clay/25 bg-clay/[0.06] dark:bg-dark-clay/[0.08] px-5 py-6 sm:px-6">
            {[
              { value: "4.8/5", label: "average likelihood to return tomorrow" },
              { value: "4.3/5", label: "average rating on how rewarding it felt" },
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
              { label: "Role", value: "UX Researcher & User Testing Lead" },
              { label: "Client", value: "Talofa Games (cohort externship)" },
              { label: "Year", value: '2025'},
              { label: "Team", value: "5 designers, each owning a different portion of the design process" },
              { label: "Stack", value: "Figma, Maze, moderated interviews" },
              { label: "Impact", value: "Validated return intent and emotional payoff in concept testing (see stats above)" },
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
            Monster Walk by Talofa Games motivates players to walk in real life to earn in-game stamina
            and save monsters from the "evil fog." During a cohort externship, my team was scoped to one
            specific touchpoint: the "Welcome Back" screen, the first thing players see when they return
            each day, felt flat, confusing, and unrewarding. My role was to lead all user research and
            testing, synthesize findings into design decisions, and deliver a validated prototype direction
            to the client.
          </p>
        </section>

        {/* The Problem */}
        <section id="the-problem" className="mb-12 scroll-mt-[140px] sm:scroll-mt-[130px]">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-6">
            The problem
          </h2>

          <figure className="my-10 w-screen max-w-none ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]">
            <button
              type="button"
              onClick={(e) => {
                lightboxTriggerRef.current = e.currentTarget;
                setLightbox({
                  src: "/monster-walk/old-welcome-back-flow.jpg",
                  width: 1600,
                  height: 654,
                  alt: "The original Monster Walk Welcome Back flow, annotated: a load screen, daily-tasks modal, the flat Welcome Back/streak screen, a resources-added modal, and the map/explore screen, connected by arrows showing minimal visual feedback and no celebration",
                });
              }}
              className="block w-full max-w-[1320px] mx-auto cursor-zoom-in"
              aria-label="View the original Welcome Back flow at full size"
            >
              <img
                src="/monster-walk/old-welcome-back-flow.jpg"
                width={2640}
                height={1079}
                loading="lazy"
                alt="The original Monster Walk Welcome Back flow, annotated: a load screen, daily-tasks modal, the flat Welcome Back/streak screen, a resources-added modal, and the map/explore screen, connected by arrows showing minimal visual feedback and no celebration"
                className="w-full h-auto block rounded-lg"
              />
            </button>
            <figcaption className="mt-3 text-sm text-warm-gray dark:text-dark-warm-gray text-center italic px-6">
              The original Welcome Back flow, the starting point for this engagement. Tap to zoom in.
            </figcaption>
          </figure>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-charcoal dark:text-dark-cream mb-2">
                Stamina cap confusion → loss of trust
              </h3>
              <p className="text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed">
                Players understood step-to-stamina conversion, but many didn't realize stamina is initially
                capped at 500. Steps beyond the cap disappeared without explanation, leaving players feeling
                like they were losing progress they'd already earned.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-charcoal dark:text-dark-cream mb-2">
                No emotional payoff
              </h3>
              <p className="text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed">
                The Welcome Back panel felt static and transactional: no animation, no celebration. The
                "Welcome Back!" text didn't meet WCAG contrast standards. Without personalization or
                narrative framing, the intended habit loop (cue → routine → reward) broke down at every step.
              </p>
            </div>
          </div>

          <figure className="mt-8 max-w-md mx-auto">
            <img
              src="/monster-walk/old-monster-walk-habit-loop.jpg"
              width={1388}
              height={1192}
              loading="lazy"
              alt="Diagram of the old Monster Walk habit loop, showing where the cue-routine-reward cycle broke down at the Welcome Back step"
              className="w-full rounded-lg border border-warm-gray/15 dark:border-dark-warm-gray/15"
            />
            <figcaption className="mt-3 text-sm text-warm-gray dark:text-dark-warm-gray text-center italic">
              Mapping the old habit loop made it clear exactly where it broke down.
            </figcaption>
          </figure>
        </section>

        {/* Constraints */}
        <section id="constraints" className="mb-12 scroll-mt-[140px] sm:scroll-mt-[130px]">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-6">
            Constraints
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="9" cy="7" r="4" />
                    <path d="M3 21v-2a4 4 0 0 1 4-4h4" />
                    <line x1="17" y1="11" x2="17" y2="17" />
                    <line x1="14" y1="14" x2="20" y2="14" />
                  </svg>
                ),
                title: "No social mechanics",
                body: "Designs had to motivate players solo; social features hadn't been built yet.",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 12 20 22 4 22 4 12" />
                    <rect x="2" y="7" width="20" height="5" />
                    <line x1="12" y1="22" x2="12" y2="7" />
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                  </svg>
                ),
                title: "Existing rewards only",
                body: "No new items or art; rewards were limited to existing in-game resources.",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                ),
                title: "Existing design system",
                body: "All flows had to reuse existing patterns and assets; no new components.",
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
          <p className="mt-5 text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed italic">
            These limits forced focus onto emotional payoff, clarity, and sequencing, rather than entirely new systems.
          </p>
        </section>

        {/* My Approach */}
        <section id="approach" className="mb-12 scroll-mt-[140px] sm:scroll-mt-[130px]">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-6">
            My approach
          </h2>
          <div className="space-y-4">
            <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
              I started with a competitive review, looking at Zwift and SelfQuest for strong progress
              visualization patterns, and an audit of the existing app to flag clarity and pacing issues.
              Unmoderated tests via Maze that I designed and ran surfaced the stamina cap confusion and
              exposed gaps in how players understood core game mechanics.
            </p>

            <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
              Once the clarity issues were mapped, I proposed a pivot: rather than continuing to document
              what confused players, I wanted to understand what motivated them to return. I planned and
              led moderated 1:1 interviews with both new and experienced players, which gave the team a
              much richer picture, one centered on monster personality, daily streaks, milestones, and
              the pull of hidden rewards.
            </p>
          </div>

          <figure className="mt-8 max-w-lg mx-auto">
            <img
              src="/monster-walk/ideation-sketches.jpg"
              width={1400}
              height={1050}
              loading="lazy"
              alt="Early ideation sketches on paper: a streak-fire celebration, an 'up next' map teaser, a stamina-cap explore prompt, a monsters-found collection grid, a daily step history bar chart, a map overview with percent explored, a monster-growth celebration, and a daily tasks checklist"
              className="w-full rounded-lg border border-warm-gray/15 dark:border-dark-warm-gray/15"
            />
            <figcaption className="mt-3 text-sm text-warm-gray dark:text-dark-warm-gray text-center italic">
              Pre-concept ideation sketches exploring streaks, exploration, and celebration — before we narrowed to three directions to test.
            </figcaption>
          </figure>

          <div className="space-y-4 mt-8">
            <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
              Based on those sketches and the interview findings, the team designed three distinct concept
              directions: Streak Spotlight (celebrating streak progress with a milestone countdown), Squad
              Leader Welcome (the monster front and center, offering social encouragement), and Hidden
              Monster in Fog (a mystery silhouette teasing discovery). From sketch, each direction went to
              wireframe, with real interaction and animation notes attached to each screen:
            </p>
          </div>

          <figure className="mt-4 w-screen max-w-none ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] px-6">
            <button
              type="button"
              onClick={(e) => {
                lightboxTriggerRef.current = e.currentTarget;
                setLightbox({
                  src: "/monster-walk/early-wireframes-return-flow.jpg",
                  width: 1600,
                  height: 807,
                  alt: "Wireframes of the daily return flow: Welcome Back with a step count, Stamina Increasing with a fill meter and info icon, Daily Streak++ with a streak indicator, and a Reward screen with a star burst and berry count, each annotated below with interaction and animation notes",
                });
              }}
              className="block w-full max-w-[1300px] mx-auto cursor-zoom-in"
              aria-label="View the early wireframes at full size"
            >
              <img
                src="/monster-walk/early-wireframes-return-flow.jpg"
                width={1600}
                height={807}
                loading="lazy"
                alt="Wireframes of the daily return flow: Welcome Back with a step count, Stamina Increasing with a fill meter and info icon, Daily Streak++ with a streak indicator, and a Reward screen with a star burst and berry count, each annotated below with interaction and animation notes"
                className="w-full h-auto block"
              />
            </button>
            <figcaption className="mt-3 text-sm text-warm-gray dark:text-dark-warm-gray text-center italic px-6">
              Early wireframes of the four-step daily return flow, before it was designed up to mid-fidelity. Tap to zoom in.
            </figcaption>
          </figure>

          <p className="mt-8 text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            I planned and moderated a 1:1 concept study with 5–8 participants, testing all three directions
            head-to-head against two thresholds: at least 75% rating their likelihood to return tomorrow a
            4 or 5, and at least 75% describing the experience as fun, exciting, or rewarding.
          </p>

          <div className="mt-8 w-screen max-w-none ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] px-6">
          <div className="grid grid-cols-3 gap-4 max-w-[900px] mx-auto">
            {[
              {
                src: "/monster-walk/moderated-daily-streak.jpg",
                width: 422,
                height: 700,
                alt: "Streak Spotlight concept as tested: a Daily Streak card with a monster mascot, weekday streak indicators, and an upcoming 10-day streak challenge",
                caption: "Streak Spotlight",
              },
              {
                src: "/monster-walk/moderated-monster-greeting.jpg",
                width: 422,
                height: 700,
                alt: "Squad Leader Welcome concept as tested: a full stamina meter with the monster speaking directly to the player, 'Look! Our stamina's full, just like my excitement to see you!'",
                caption: "Squad Leader Welcome",
              },
              {
                src: "/monster-walk/moderated-hidden-monster.jpg",
                width: 422,
                height: 700,
                alt: "Hidden Monster in Fog concept as tested: a silhouetted undiscovered monster behind a step-progress ring, with the message 'I'm almost free! Just a few more steps!'",
                caption: "Hidden Monster in Fog",
              },
            ].map(({ src, width, height, alt, caption }) => (
              <figure key={src}>
                <button
                  type="button"
                  onClick={(e) => {
                    lightboxTriggerRef.current = e.currentTarget;
                    setLightbox({ src, width, height, alt });
                  }}
                  className="block w-full cursor-zoom-in"
                  aria-label={`View the ${caption} concept at full size`}
                >
                  <img
                    src={src}
                    width={width}
                    height={height}
                    loading="lazy"
                    alt={alt}
                    className="w-full rounded-lg border border-warm-gray/15 dark:border-dark-warm-gray/15"
                  />
                </button>
                <figcaption className="mt-2 text-xs text-warm-gray dark:text-dark-warm-gray text-center italic">
                  {caption}
                </figcaption>
              </figure>
            ))}
          </div>
          </div>
          <p className="mt-3 mb-2 text-sm text-warm-gray dark:text-dark-warm-gray text-center italic">
            The three concepts as tested in the moderated study. Tap any screen to zoom in.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            The winning elements from each concept converged into the one-week streak milestone we handed
            off to the client.
          </p>
        </section>

        {/* What Research Revealed */}
        <section id="research" className="mb-12 scroll-mt-[140px] sm:scroll-mt-[130px]">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-6">
            What research revealed
          </h2>
          <div className="space-y-10">
            {[
              {
                n: "01",
                heading: "Monster personality drives emotional connection",
                body: "Players described their monsters as companions, not game objects. Personalized greetings and character-specific copy made returning feel meaningful rather than mechanical.",
                quote: "It's fun and charming, love the monster messages.",
              },
              {
                n: "02",
                heading: "Mystery sustains anticipation",
                body: "Hiding upcoming rewards created a pull to return. Players wanted to know what they'd get next, and that uncertainty was motivating, not frustrating.",
                quote: null,
              },
              {
                n: "03",
                heading: "Streaks need visible progress",
                body: "The old streak calendar was static — the same layout every visit, with no animation or feedback tied to actual progress. Pairing an animated stamina meter with a real-time streak indicator gave players a clear, living sense of where they stood.",
                quote: "Nice! Love streaks and it counteracts the 'incentivizes long breaks' situation.",
              },
              {
                n: "04",
                heading: "Celebration pacing matters",
                body: "The milestone moment needed to feel earned. Slowing the animation created emotional resonance; rushing it made it feel like a loading screen rather than a reward.",
                quote: "The amount of rewards should increase every day instead of being randomly 5 stone, which feels unbalanced.",
              },
            ].map(({ n, heading, body, quote }) => (
              <div key={n}>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono text-xs text-sage dark:text-dark-sage tracking-widest shrink-0">
                    {n}
                  </span>
                  <h3 className="font-medium text-charcoal dark:text-dark-cream">{heading}</h3>
                </div>
                <p className="text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed pl-8">
                  {body}
                </p>
                {quote && (
                  <div className="pl-8">
                    <Quote text={quote} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* What We Designed */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            What we designed
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-6">
            Working as a team of five UX designers, entirely within the existing Monster Walk design system
            and in-game assets, we delivered a prototype direction to the client built around four changes:
          </p>
          <ul className="space-y-2">
            {[
              "Personalized monster greeting with playful, character-specific copy",
              "Animated stamina meter + streak indicator for clear progress visualization",
              "Teasers for upcoming daily rewards to encourage return visits",
              "Rotating hidden monster welcome screen to add novelty on repeat logins",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-warm-gray dark:text-dark-warm-gray">
                <span className="text-clay-dark dark:text-dark-clay text-sm leading-relaxed shrink-0">–</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <figure className="mt-8 max-w-md mx-auto">
            <img
              src="/monster-walk/annotated-welcome-back.jpg"
              width={1094}
              height={1030}
              loading="lazy"
              alt="Annotated dev-handoff spec of the redesigned Welcome Back screen: notes on the customizable monster name, dynamic greeting copy, the animated progress ring tied to step count, and the dynamically-selected monster"
              className="w-full rounded-lg border border-warm-gray/15 dark:border-dark-warm-gray/15"
            />
            <figcaption className="mt-3 text-sm text-warm-gray dark:text-dark-warm-gray text-center italic">
              The annotated handoff spec delivered to the Talofa Games engineering team.
            </figcaption>
          </figure>
        </section>

        {/* How I Measured Success */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            How I measured success
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            The redesigned prototype was validated in moderated testing with real players, both new and
            experienced. This was a research and testing engagement, not a shipped feature, so success
            was measured in clarity and validation rather than usage.
          </p>
          <ul className="space-y-2">
            {[
              "In concept validation testing (n=4), participants rated their likelihood to return tomorrow 4.8/5 on average — 100% at a 4 or 5, against a 75% target.",
              "The redesigned Welcome Back screen rated 4.3/5 on average for how rewarding and motivating it felt — also 100% at a 4 or 5.",
              "Players independently described the new flow as \"fun,\" \"supportive,\" and \"motivating.\"",
              "The team delivered an annotated prototype direction to Talofa Games; whether it shipped was the client's call, not mine to measure.",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-warm-gray dark:text-dark-warm-gray">
                <span className="text-clay-dark dark:text-dark-clay text-sm leading-relaxed shrink-0">–</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            Response counts vary slightly by question below — not everyone answers every prompt in this
            format — but all figures come from the same small group of 5–8 recruited participants.
          </p>

          <figure className="mt-8 max-w-2xl mx-auto">
            <img
              src="/monster-walk/navigation-path-results.jpg"
              width={1230}
              height={900}
              loading="lazy"
              alt="Navigation path results from the prototype usability test: 5 responses, 75.2 second average duration, showing 4 of 5 participants staying on the intended path from Welcome Back through Claim Rewards, Daily Quest, and into Gameplay, with 1 exiting after step 2"
              className="w-full rounded-lg border border-warm-gray/15 dark:border-dark-warm-gray/15"
            />
            <figcaption className="mt-3 text-sm text-warm-gray dark:text-dark-warm-gray text-center italic">
              Real navigation-path data from the prototype test backing the return-intent numbers above.
            </figcaption>
          </figure>

          <p className="mt-8 text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed italic">
            Two caveats: this concept-validation round skewed toward existing, engaged Monster Walk
            players, so a broader launch would need to validate with newer, less-invested users too.
            And not every signal was purely positive — one participant noted that the stamina cap
            "almost incentivizes you to not open the app for long periods of time," a real tension
            worth the client's attention as they iterate further.
          </p>
        </section>

        {/* Testimonial — the transition beat: proof it worked, from a real person, right
            before the visual finale. */}
        <section id="testimonial" className="mb-12 scroll-mt-[140px] sm:scroll-mt-[130px]">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-6">
            Testimonial
          </h2>
          <p className="text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            Jenny Park was one of my cohort's coaches throughout the externship:
          </p>
          <blockquote className="border-l-2 border-clay dark:border-dark-clay pl-6">
            <p className="font-serif text-lg sm:text-xl text-charcoal dark:text-dark-cream leading-snug italic mb-4">
              "Vanessa confidently led both unmoderated and moderated user studies, turned insights into
              actionable next steps, and iterated effectively based on client and user feedback. She's
              flexible and adaptable, revisiting ideas when new insights emerge while keeping the team
              aligned and moving forward. Her reliability, proactive problem-solving, and strategic thinking
              makes her someone the team can always depend on, both as a collaborator and a leader. Anyone
              would benefit from Vanessa's combination of skill, work ethic, and user-focused mindset."
            </p>
            <footer className="text-sm text-warm-gray dark:text-dark-warm-gray font-medium">
              Jenny Park, Coach
            </footer>
          </blockquote>

          <p className="mt-8 text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            And in the players' own words — the research this project was built on:
          </p>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <img
              src="/monster-walk/Anticipation-Quote.jpg"
              width={1200}
              height={842}
              loading="lazy"
              alt="I do like how you don't know what you're gonna get tomorrow. So, you know, you better come back tomorrow to see."
              className="w-full rounded-lg border border-warm-gray/15 dark:border-dark-warm-gray/15"
            />
            <img
              src="/monster-walk/Monster-Connection-Quote.jpg"
              width={1200}
              height={842}
              loading="lazy"
              alt="I love my little guys. It's nice they acknowledge I'm back on the grind to help them clear the fog, so having the monster there to greet you is really nice."
              className="w-full rounded-lg border border-warm-gray/15 dark:border-dark-warm-gray/15"
            />
          </div>
        </section>

        {/* Final Screens — the true finale: the actual redesigned screens are the last
            thing on the page, on purpose. */}
        <section id="final-screens" className="mb-16 scroll-mt-[140px] sm:scroll-mt-[130px]">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-6">
            The final screens
          </h2>
          <div className="w-screen max-w-none ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] px-6">
            <div className="grid grid-cols-3 gap-4 max-w-[900px] mx-auto">
              {[
                {
                  src: "/monster-walk/monster-greeting.jpg",
                  width: 398,
                  height: 660,
                  alt: "Monster Walk redesigned Welcome Back screen showing a personalized monster greeting with stamina meter and daily streak counter",
                  caption: "Personalized monster greeting",
                },
                {
                  src: "/monster-walk/final-daily-streak.jpg",
                  width: 422,
                  height: 700,
                  alt: "Monster Walk final Daily Streak screen: numbered days 1-7 with completed, current, and mystery '?' days ahead, plus a Milestone Bonus teasing an undiscovered monster reward",
                  caption: "Final streak screen, with mystery days ahead",
                },
                {
                  src: "/monster-walk/mystery-monster-welcome-back.jpg",
                  width: 482,
                  height: 800,
                  alt: "Monster Walk Hidden Monster in Fog concept: a silhouetted mystery monster behind a stamina ring, with the caption 'Still lost in the fog...' teasing discovery",
                  caption: "Hidden Monster in Fog concept",
                },
              ].map(({ src, width, height, alt, caption }) => (
                <figure key={src}>
                  <button
                    type="button"
                    onClick={(e) => {
                      lightboxTriggerRef.current = e.currentTarget;
                      setLightbox({ src, width, height, alt });
                    }}
                    className="block w-full cursor-zoom-in"
                    aria-label={`View the ${caption} screen at full size`}
                  >
                    <img
                      src={src}
                      width={width}
                      height={height}
                      loading="lazy"
                      alt={alt}
                      className="w-full rounded-lg border border-warm-gray/15 dark:border-dark-warm-gray/15"
                    />
                  </button>
                  <figcaption className="mt-2 text-xs text-warm-gray dark:text-dark-warm-gray text-center italic">
                    {caption}
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-3 text-sm text-warm-gray dark:text-dark-warm-gray text-center italic">
              Tap any screen to zoom in.
            </p>
          </div>
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
          <img
            src={lightbox.src}
            width={lightbox.width}
            height={lightbox.height}
            alt={lightbox.alt}
            style={{ width: lightbox.width, maxWidth: "100vw" }}
            className="max-w-none h-auto mx-auto my-12"
          />
        </div>
      )}
    </div>
  );
}
