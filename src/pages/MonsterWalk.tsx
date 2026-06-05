import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import ContactForm from "../components/ContactForm";
import { usePageMeta } from "../hooks/usePageMeta";


export default function MonsterWalk() {
  usePageMeta({
    title: "Turning Daily Walks into Daily Wins | Vanessa Bell",
    description: "UX research and redesign of Monster Walk's Welcome Back flow: turning a flat, confusing screen into a motivating streak milestone moment. 100% participant clarity in testing.",
    ogImage: "https://vanessabell.design/monster-walk/monster-walk-hero.gif",
    path: "/monster-walk",
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
            Turning Daily Walks into Daily Wins
          </h1>
          <p className="text-warm-gray dark:text-dark-warm-gray mb-8">
            A cohort externship: researching and testing a redesign of Monster Walk's Welcome Back flow.
          </p>

          <figure className="my-10">
            <img
              src="/monster-walk/monster-walk-hero.gif"
              alt="Animated gif of the Monster Walk app showing the redesigned Welcome Back flow: personalized monster greeting, animated stamina meter, streak counter, and milestone celebration"
              className="max-h-96 w-auto mx-auto block rounded-lg"
            />
          </figure>

          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5 text-sm mt-8 mx-auto">
            {[
              { label: "Role", value: "UX Researcher & User Testing Lead" },
              { label: "Client", value: "Talofa Games (cohort externship)" },
              { label: "Scope", value: "Welcome Back flow: research, testing, and redesign" },
              { label: "Stack", value: "Figma, Maze, moderated interviews" },
              { label: "Impact", value: '100% clarity in moderated testing: "fun, supportive, motivating"' },
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
            Project Snapshot
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
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-6">
            The Problem
          </h2>

          <figure className="my-10">
            <img
              src="/monster-walk/old-welcome-back-flow.png"
              alt="The original Monster Walk Welcome Back screen: a static panel with minimal visual feedback, no celebration, and no streak or progress indicators"
              className="max-w-[220px] mx-auto block rounded-lg"
            />
            <figcaption className="mt-3 text-sm text-warm-gray dark:text-dark-warm-gray text-center italic">
              The original Welcome Back screen, the starting point for this engagement
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
        </section>

        {/* Constraints */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-6">
            Constraints
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
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
                <span className="inline-flex text-terracotta dark:text-dark-terracotta mb-3">
                  {icon}
                </span>
                <p className="font-medium text-charcoal dark:text-dark-cream mb-1">{title}</p>
                <p className="text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed italic">
            These limits forced focus onto emotional payoff, clarity, and sequencing, rather than entirely new systems.
          </p>
        </section>

        {/* My Approach */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-6">
            My Approach
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
            <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
              Based on those findings, we developed mid-fidelity designs as a team, emphasizing a one-week
              streak milestone as the core motivational anchor. I then ran a second round of moderated
              testing to validate the direction before we handed off to the client.
            </p>
          </div>
        </section>

        {/* What Research Revealed */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-6">
            What Research Revealed
          </h2>
          <div className="space-y-10">
            {[
              {
                n: "01",
                heading: "Monster personality drives emotional connection",
                body: "Players described their monsters as companions, not game objects. Personalized greetings and character-specific copy made returning feel meaningful rather than mechanical.",
              },
              {
                n: "02",
                heading: "Mystery sustains anticipation",
                body: "Hiding upcoming rewards created a pull to return. Players wanted to know what they'd get next, and that uncertainty was motivating, not frustrating.",
              },
              {
                n: "03",
                heading: "Streaks need visible progress",
                body: "A stamina meter combined with a streak indicator gave players a clear sense of where they stood and what they were working toward. Without it, the habit loop had no visible momentum.",
              },
              {
                n: "04",
                heading: "Celebration pacing matters",
                body: "The milestone moment needed to feel earned. Slowing the animation created emotional resonance; rushing it made it feel like a loading screen rather than a reward.",
              },
            ].map(({ n, heading, body }) => (
              <div key={n}>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono text-xs text-terracotta dark:text-dark-terracotta tracking-widest shrink-0">
                    {n}
                  </span>
                  <h3 className="font-medium text-charcoal dark:text-dark-cream">{heading}</h3>
                </div>
                <p className="text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed pl-8">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* What We Designed */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            What We Designed
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-6">
            Working as a team of five UX designers, entirely within the existing Monster Walk design system
            and in-game assets, we delivered a prototype direction to the client built around four changes:
          </p>
          <ul className="space-y-2 mb-8">
            {[
              "Personalized monster greeting with playful, character-specific copy",
              "Animated stamina meter + streak indicator for clear progress visualization",
              "Teasers for upcoming daily rewards to encourage return visits",
              "Rotating hidden monster welcome screen to add novelty on repeat logins",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-warm-gray dark:text-dark-warm-gray">
                <span className="text-terracotta dark:text-dark-terracotta mt-1 shrink-0">–</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-2 gap-4 my-8">
            <figure>
              <img
                src="/monster-walk/monster-greeting.png"
                alt="Monster Walk redesigned Welcome Back screen showing a personalized monster greeting with stamina meter and daily streak counter"
                className="w-full rounded-lg"
              />
              <figcaption className="mt-2 text-xs text-warm-gray dark:text-dark-warm-gray text-center italic">
                Personalized monster greeting
              </figcaption>
            </figure>
            <figure>
              <img
                src="/monster-walk/streak-milestone.png"
                alt="Monster Walk redesigned seven-day streak milestone screen with a celebratory moment and a teaser for the next upcoming reward"
                className="w-full rounded-lg"
              />
              <figcaption className="mt-2 text-xs text-warm-gray dark:text-dark-warm-gray text-center italic">
                Streak milestone moment
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Outcome */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            Outcome
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-6">
            The redesigned prototype was validated in moderated testing with real players, both new and
            experienced. Results were clear:
          </p>
          <ul className="space-y-2 mb-8">
            {[
              "100% of participants understood rewards and streaks clearly",
              "Players described the experience as \"fun,\" \"supportive,\" and \"motivating\"",
              "Design direction and annotated prototype delivered to Talofa Games",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-warm-gray dark:text-dark-warm-gray">
                <span className="text-terracotta dark:text-dark-terracotta mt-1 shrink-0">–</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed italic">
            This was a scoped research and testing engagement. Whether these designs shipped is the client's decision.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <img
              src="/monster-walk/Anticipation-Quote.png"
              alt="I do like how you don't know what you're gonna get tomorrow. So, you know, you better come back tomorrow to see."
              className="w-full rounded-lg"
            />
            <img
              src="/monster-walk/Monster-Connection-Quote.png"
              alt="I love my little guys. It's nice they acknowledge I'm back on the grind to help them clear the fog, so having the monster there to greet you is really nice."
              className="w-full rounded-lg"
            />
          </div>
        </section>

        {/* Testimonial */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-6">
            Testimonial
          </h2>
          <blockquote className="border-l-2 border-terracotta dark:border-dark-terracotta pl-6">
            <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed italic mb-4">
              "Vanessa confidently led both unmoderated and moderated user studies, turned insights into
              actionable next steps, and iterated effectively based on client and user feedback. She's
              flexible and adaptable, revisiting ideas when new insights emerge while keeping the team
              aligned and moving forward. Her reliability, proactive problem-solving, and strategic thinking
              makes her someone the team can always depend on, both as a collaborator and a leader. Anyone
              would benefit from Vanessa's combination of skill, work ethic, and user-focused mindset."
            </p>
            <footer className="text-sm text-charcoal dark:text-dark-cream font-medium">
              Jenny Park, Coach
            </footer>
          </blockquote>
        </section>

        <section className="mb-16" aria-label="Contact">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            Get in Touch
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
