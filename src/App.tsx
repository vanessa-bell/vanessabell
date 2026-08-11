import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSparkles } from "./useSparkles";
import SiteHeader from "./components/SiteHeader";
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
    tags: "Health tech · Product Designer",
    company: "Early-stage health tech startup",
    impact: "9x reduction in time and steps",
    title: "Letting AI Do the Work so Human Experts Can Focus on Review",
  },
  {
    to: "/allstripes",
    image: "/allstripes/allstripes-cover.jpg",
    alt: "AllStripes medical records workflow redesign",
    tags: "Health tech · UX & Internal Tooling",
    company: "AllStripes",
    impact: "95% reduction in processing time",
    title: "Helping Patients Get Their Records Faster",
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

function ScrollRow({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollability = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollability();
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => updateScrollability();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateScrollability);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScrollability);
    };
  }, []);

  const scrollBy = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar max-w-5xl mx-auto pb-1"
      >
        <div className="shrink-0 w-6 sm:w-8 snap-start" aria-hidden="true" />
        {children}
        <div className="shrink-0 w-2 sm:w-4" aria-hidden="true" />
      </div>
      {canScrollLeft && (
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
          className="absolute left-2 sm:left-4 top-[38%] -translate-y-1/2 w-9 h-9 rounded-full bg-cream dark:bg-dark-bg border border-warm-gray/20 dark:border-dark-warm-gray/20 flex items-center justify-center text-warm-gray dark:text-dark-warm-gray hover:text-charcoal dark:hover:text-dark-cream transition-colors shadow-sm"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
          className="absolute right-2 sm:right-4 top-[38%] -translate-y-1/2 w-9 h-9 rounded-full bg-cream dark:bg-dark-bg border border-warm-gray/20 dark:border-dark-warm-gray/20 flex items-center justify-center text-warm-gray dark:text-dark-warm-gray hover:text-charcoal dark:hover:text-dark-cream transition-colors shadow-sm"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
    </div>
  );
}

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
          className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-charcoal/85 backdrop-blur-sm pointer-events-none"
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
    title: "Vanessa Bell | Product Designer & Builder",
    description: "Product designer who ships production code. Research, design, and the pull request. Complex clinical workflows in health tech. React, TypeScript, Claude Code.",
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
      jobTitle: "Product Designer",
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
      <SiteHeader />

      <main id="main-content" className="pb-16">
        <div className="max-w-2xl mx-auto px-6 sm:px-8">
          <h1 className="font-serif text-4xl sm:text-5xl text-charcoal dark:text-dark-cream leading-tight">
            Vanessa Bell
          </h1>
          <p className="mt-1 text-lg text-warm-gray dark:text-dark-warm-gray">
            Product Designer
          </p>
          <p className="mt-5 text-base leading-relaxed text-warm-gray dark:text-dark-warm-gray">
            User research to design to shipped code in no time at all.
          </p>

          <p className="mt-5 text-sm text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            end to end · ships production code · complex clinical workflows · AI-native, human-in-the-loop · 0 to 1 · design systems · React and TypeScript
          </p>
        </div>

        <section className="mt-8 sm:mt-10" aria-label="Case studies">
          <ScrollRow>
            <div className="shrink-0 w-60 sm:w-72 snap-start">
              <CaseStudyCard cs={caseStudies[0]} aspectClass="aspect-[3/4]" imgPadding="p-5" />
            </div>
            <div className="shrink-0 w-60 sm:w-72 snap-start">
              <CaseStudyCard cs={caseStudies[1]} aspectClass="aspect-[3/4]" />
            </div>
            <div className="shrink-0 w-60 sm:w-72 snap-start">
              <CaseStudyCard cs={caseStudies[2]} aspectClass="aspect-[3/4]" />
            </div>
              <div className="shrink-0 w-60 sm:w-72 snap-start">
              <CaseStudyCard cs={caseStudies[3]} aspectClass="aspect-[3/4]" />
            </div>
            {/* <Link to="/about" className="group block shrink-0 w-60 sm:w-72 snap-start">
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
                  <p className="text-sm text-cream font-medium leading-snug">Product Designer. Flamenco dancer. Yoga teacher.</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-xs text-warm-gray dark:text-dark-warm-gray mb-1">About</p>
                <p className="text-sm font-medium text-charcoal dark:text-dark-cream group-hover:text-terracotta dark:group-hover:text-dark-terracotta transition-colors duration-150 leading-snug">
                  Vanessa Bell
                </p>
              </div>
            </Link> */}
          </ScrollRow>
        </section>

        <div className="max-w-2xl mx-auto px-6 sm:px-8">
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

          <div className="mt-6 text-center">
            <a
              href="/vanessa-bell-designer-resume-2026.pdf"
              download="Vanessa Bell Resume.pdf"
              className="inline-block px-5 py-2.5 rounded-lg bg-terracotta dark:bg-dark-terracotta text-cream dark:text-dark-bg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Download my resume
            </a>
          </div>

          <section className="mt-16 text-center" aria-label="Contact">
            <p className="text-sm">
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
        </div>
      </main>

      <footer className="py-6 px-6 text-center text-sm text-warm-gray dark:text-dark-warm-gray">
        &copy; {new Date().getFullYear()} Vanessa Bell
      </footer>
    </div>
  );
}
