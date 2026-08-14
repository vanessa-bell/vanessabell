import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "./components/SiteHeader";
import { usePageMeta } from "./hooks/usePageMeta";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";

function HeroFlipCard({
  to,
  ariaLabel,
  front,
  frontLabel,
  tag,
  company,
  title,
  impact,
}: {
  to: string;
  ariaLabel: string;
  front: ReactNode;
  frontLabel: string;
  tag: string;
  company: string;
  title: string;
  impact: string;
}) {
  const [revealed, setRevealed] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    // Touch devices have no :hover, so the back face (case study name,
    // company, impact) would otherwise be unreachable — require a first
    // tap to reveal it before the second tap navigates.
    if (window.matchMedia("(hover: hover)").matches) return;
    if (!revealed) {
      e.preventDefault();
      setRevealed(true);
    }
  };

  return (
    <Link
      to={to}
      aria-label={ariaLabel}
      onClick={handleClick}
      className="group block w-full [perspective:1200px]"
    >
      <div
        className={`relative w-full transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)] ${
          revealed ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front — media plus a simple label pill, sizes the card to the media's natural height */}
        <div className="relative overflow-hidden [backface-visibility:hidden] bg-charcoal dark:bg-dark-surface">
          {front}
          <span className="absolute top-3 left-3 sm:top-4 sm:left-4 inline-block text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-sage/90 text-cream">
            {frontLabel}
          </span>
        </div>
        {/* Back — overlays the front at whatever height it established */}
        <div className="absolute inset-0 overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] bg-charcoal dark:bg-dark-surface px-4 py-4 sm:px-5 sm:py-5 flex flex-col justify-center items-center text-center gap-2">
          <span className="inline-block text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-sage/90 text-cream w-fit">
            {tag}
          </span>
          <p className="text-xs font-mono uppercase tracking-widest text-cream/60">
            {company}
          </p>
          <p className="font-serif text-base sm:text-lg text-cream leading-snug">
            {title}
          </p>
          <p className="text-xs sm:text-sm text-cream/70 leading-snug">
            {impact}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function App() {
  usePageMeta({
    title: "Vanessa Bell | Product Designer & Builder",
    description: "Product designer who ships production code.",
    path: "/",
  });

  const prefersReducedMotion = usePrefersReducedMotion();

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
        {/* Hero: bento grid of the three case studies */}
        <section className="px-6 sm:px-4 pt-3 sm:pt-4" aria-label="Featured work">
          <h1 className="max-w-[810px] mx-auto font-serif text-xl sm:text-2xl text-charcoal dark:text-dark-cream leading-snug mb-4 sm:mb-6">
            Product-minded designer who can code
          </h1>

          <div className="max-w-[810px] mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
            {/* SpendLight + AllStripes — left column */}
            <div className="w-full sm:flex-[1.2] flex flex-col gap-3 sm:gap-4">
              <HeroFlipCard
                to="/spendlight"
                ariaLabel="View SpendLight case study"
                frontLabel="0 to 1"
                tag="Personal finance"
                company="SpendLight"
                title="A Spending Journal Built on Reflection, Not Budgets"
                impact="Concept validated, MVP spec ready for engineering"
                front={
                  <video
                    autoPlay={!prefersReducedMotion}
                    loop={!prefersReducedMotion}
                    muted
                    playsInline
                    aria-label="SpendLight core flow: mood check-in, logging a purchase reflection, adding context, and receiving the bonsai growth reward"
                    className="block w-full h-auto scale-105"
                  >
                    <source src="/spendlight/spendlight-core-flow.mp4" type="video/mp4" />
                    <source src="/spendlight/spendlight-core-flow.mov" type="video/quicktime" />
                  </video>
                }
              />

              <HeroFlipCard
                to="/allstripes"
                ariaLabel="View AllStripes case study"
                frontLabel="Workflow redesign"
                tag="Healthcare ops"
                company="AllStripes"
                title="Cutting Medical Records Processing by 95%"
                impact="20 min → under 1 min per file"
                front={
                  <img
                    src="/allstripes/allstripes-cover.jpg"
                    alt="AllStripes medical records workflow redesign"
                    className="block w-full h-auto"
                  />
                }
              />
            </div>

            {/* Forma + Monster Walk — stacked right column */}
            <div className="w-full sm:flex-1 flex flex-col gap-3 sm:gap-4">
              <HeroFlipCard
                to="/ai-research-workflow"
                ariaLabel="View health tech case study"
                frontLabel="Internal tool redesign"
                tag="Health tech"
                company="Early-stage health tech startup"
                title="Letting AI Do the Work so Human Experts Can Focus on Review"
                impact="9x reduction in time and steps"
                front={
                  <img
                    src="/ai-research-workflow/mobile-hero-diagram.svg"
                    alt="Before-and-after: a long manual form reduced to a compact AI-proposed card, with a 9x reduction in time"
                    className="block w-full h-auto"
                  />
                }
              />

              <HeroFlipCard
                to="/monster-walk"
                ariaLabel="View Monster Walk case study"
                frontLabel="User research"
                tag="Gaming"
                company="Talofa Games"
                title="Turning Daily Walks into Daily Wins"
                impact="100% participant clarity in testing"
                front={
                  <img
                    src={
                      prefersReducedMotion
                        ? "/monster-walk/monster-walk-static.png"
                        : "/monster-walk/monster-walk-hero.gif"
                    }
                    alt="Monster Walk Welcome Back screen redesign showing the streak milestone moment"
                    className="block w-full h-auto"
                  />
                }
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 px-6 text-center text-sm text-warm-gray dark:text-dark-warm-gray">
        &copy; {new Date().getFullYear()} Vanessa Bell
      </footer>
    </div>
  );
}
