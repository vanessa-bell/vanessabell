import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSparkles } from "./useSparkles";
import ThemeToggle from "./components/ThemeToggle";
import { usePageMeta } from "./hooks/usePageMeta";

interface CaseStudy {
  to: string;
  image: string;
  alt: string;
  tags: string;
  company: string;
  impact: string;
  title: string;
}

const caseStudies: CaseStudy[] = [
  {
    to: "/ai-research-workflow",
    image: "/ai-research-workflow/mobile-hero-diagram.svg",
    alt: "Before-and-after: a long manual form reduced to a compact AI-proposed card, with a 9x reduction in time",
    tags: "Health tech · Design Engineer",
    company: "Early-stage health tech startup",
    impact: "9x reduction in time and steps",
    title: "Letting AI Do the Work so Human Experts Can Focus on Review",
  },
  {
    to: "/spendlight",
    image: "/spendlight/hero.png",
    alt: "SpendLight app: home screen with a bonsai plant and the reflective journaling flow",
    tags: "Fintech · UX Research & Design",
    company: "SpendLight",
    impact: "Validated product direction in 6 weeks",
    title: "Designing Mindful Money Habits",
  },
  {
    to: "/monster-walk",
    image: "/monster-walk/monster-walk-hero.gif",
    alt: "Monster Walk Welcome Back screen redesign showing the streak milestone moment",
    tags: "Gaming · UX Research Lead",
    company: "Talofa Games",
    impact: "100% participant clarity in testing",
    title: "Turning Daily Walks into Daily Wins",
  },
];

function CaseStudyCard({ cs, aspectClass, imgPadding = "p-4" }: { cs: CaseStudy; aspectClass: string; imgPadding?: string }) {
  return (
    <Link to={cs.to} className="group block">
      <div className="relative overflow-hidden rounded-xl bg-cream-dark dark:bg-dark-surface">
        <div className={`${aspectClass} overflow-hidden`}>
          <div className={`w-full h-full ${imgPadding}`}>
            <div className="w-full h-full rounded-lg overflow-hidden">
              <img
                src={cs.image}
                alt={cs.alt}
                className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-500 ease-out"
              />
            </div>
          </div>
        </div>
        {/* Overlay: solid band with blur so text is legible over any image */}
        <div
          className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-charcoal/85 backdrop-blur-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          aria-hidden="true"
        >
          <p className="text-xs text-cream/70 uppercase tracking-widest mb-1">{cs.company}</p>
          <p className="text-sm text-cream font-medium leading-snug">{cs.impact}</p>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-xs text-warm-gray dark:text-dark-warm-gray mb-1">{cs.tags}</p>
        <p className="text-sm font-medium text-charcoal dark:text-dark-cream group-hover:text-terracotta dark:group-hover:text-dark-terracotta transition-colors duration-150 leading-snug">
          {cs.title}
        </p>
      </div>
    </Link>
  );
}

export default function App() {
  useSparkles();
  usePageMeta({
    title: "Vanessa Bell — Design Engineer",
    description: "Design engineer based in San Francisco. I design and build healthcare and AI experiences that reduce complexity and friction.",
    path: "/",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "person-schema";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Vanessa Bell",
      jobTitle: "Design Engineer",
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Francisco",
        addressRegion: "CA",
        addressCountry: "US",
      },
      url: "https://vanessabell.design",
      sameAs: ["https://www.linkedin.com/in/vanessajoanbell/"],
    });
    document.head.appendChild(script);
    return () => {
      document.getElementById("person-schema")?.remove();
    };
  }, []);

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

      <main className="max-w-2xl mx-auto px-6 sm:px-8 pt-8 sm:pt-12 pb-16">
        <h1 className="font-serif text-4xl sm:text-5xl text-charcoal dark:text-dark-cream leading-tight">
          Vanessa Bell
        </h1>
        <p className="mt-1 text-lg text-warm-gray dark:text-dark-warm-gray">
          Design Engineer
        </p>
        <p className="mt-5 text-base leading-relaxed text-warm-gray dark:text-dark-warm-gray">
          I design and build experiences that reduce complexity and friction.
        </p>

        <section className="mt-12" aria-label="Case studies">
          <div className="grid sm:grid-cols-2 gap-4 items-start">
            <CaseStudyCard cs={caseStudies[0]} aspectClass="aspect-[3/4]" imgPadding="p-5" />
            <CaseStudyCard cs={caseStudies[1]} aspectClass="aspect-[3/4]" />
            <CaseStudyCard cs={caseStudies[2]} aspectClass="aspect-[3/4]" />
            <Link to="/about" className="group block">
              <div className="relative overflow-hidden rounded-xl aspect-[3/4]">
                <img
                  src="/about/flamenco-3.jpg"
                  alt="Vanessa Bell in a red and gold ruffled flamenco dress, arms raised in an expressive pose against a black background"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-charcoal/85 backdrop-blur-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  aria-hidden="true"
                >
                  <p className="text-xs text-cream/70 uppercase tracking-widest mb-1">About</p>
                  <p className="text-sm text-cream font-medium leading-snug">Design engineer. Flamenco dancer. Yoga teacher.</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-xs text-warm-gray dark:text-dark-warm-gray mb-1">About</p>
                <p className="text-sm font-medium text-charcoal dark:text-dark-cream group-hover:text-terracotta dark:group-hover:text-dark-terracotta transition-colors duration-150 leading-snug">
                  Vanessa Bell
                </p>
              </div>
            </Link>
          </div>
        </section>

        <section className="mt-14" aria-label="Side projects">
          <p className="text-xs text-warm-gray dark:text-dark-warm-gray uppercase tracking-widest mb-5">
            Side projects
          </p>
          <a
            href="https://flamencura.live"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex gap-5 items-start"
          >
            <div className="w-24 sm:w-28 shrink-0 rounded-lg overflow-hidden aspect-[3/4]">
              <img
                src="/flamencura-live-screenshot.png"
                alt="Flamencura.live: a filterable directory of SF Bay Area flamenco shows and workshops, listing upcoming events by date with venue, time, and type"
                className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ease-out"
              />
            </div>
            <div className="pt-1">
              <p className="text-sm font-medium text-charcoal dark:text-dark-cream group-hover:text-terracotta dark:group-hover:text-dark-terracotta transition-colors duration-150 leading-snug mb-2">
                Flamencura.live
                <span className="sr-only"> (opens in new tab)</span>
              </p>
              <p className="text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed">
                A directory of SF Bay Area flamenco shows and workshops. Built in 6 hours one Friday because I wanted it to exist. Now used by the local flamenco community.
              </p>
            </div>
          </a>
        </section>

        <section className="mt-16" aria-label="Contact">
          <p className="text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            Open to staff roles and contract engagements.{" "}
            <Link
              to="/contact"
              className="text-terracotta dark:text-dark-terracotta underline underline-offset-4 hover:underline-offset-6 transition-all duration-150"
            >
              Get in touch
            </Link>
            {" or connect on "}
            <a
              href="https://www.linkedin.com/in/vanessajoanbell/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terracotta dark:text-dark-terracotta underline underline-offset-4 hover:underline-offset-6 transition-all duration-150"
            >
              LinkedIn
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            .
          </p>
        </section>
      </main>

      <footer className="py-6 px-6 text-center text-sm text-warm-gray dark:text-dark-warm-gray">
        &copy; {new Date().getFullYear()} Vanessa Bell
      </footer>
    </div>
  );
}
