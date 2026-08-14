import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "./components/SiteHeader";
import { usePageMeta } from "./hooks/usePageMeta";

interface WorkItem {
  to: string;
  image: string;
  alt: string;
  tag: string;
  company: string;
  companyLogo?: string;
  companyLogoAlt?: string;
  title: string;
  impact: string;
}

const workItems: WorkItem[] = [
  {
    to: "/ai-research-workflow",
    image: "/ai-research-workflow/mobile-hero-diagram.svg",
    alt: "Before-and-after: a long manual form reduced to a compact AI-proposed card, with a 9x reduction in time",
    tag: "Health tech",
    company: "Early-stage health tech startup",
    title: "Letting AI Do the Work so Human Experts Can Focus on Review",
    impact: "9x reduction in time and steps",
  },
  {
    to: "/monster-walk",
    image: "/monster-walk/monster-walk-hero.gif",
    alt: "Monster Walk Welcome Back screen redesign showing the streak milestone moment",
    tag: "Gaming",
    company: "Talofa Games",
    companyLogo: "/monster-walk/talofa-games.png",
    companyLogoAlt: "Talofa Games logo",
    title: "Turning Daily Walks into Daily Wins",
    impact: "100% participant clarity in testing",
  },
];

function FlipCard({ item }: { item: WorkItem }) {
  return (
    <Link to={item.to} className="group block aspect-[4/5] [perspective:1200px]">
      <div className="relative w-full h-full transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
        {/* Front — image only */}
        <div className="absolute inset-0 rounded-xl overflow-hidden [backface-visibility:hidden] bg-cream-dark dark:bg-dark-surface">
          <img
            src={item.image}
            alt={item.alt}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Back — info */}
        <div className="absolute inset-0 rounded-xl overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] bg-charcoal dark:bg-dark-surface px-5 py-5 flex flex-col justify-end">
          <span className="inline-block text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 bg-sage/90 text-cream w-fit">
            {item.tag}
          </span>
          {item.companyLogo ? (
            <img
              src={item.companyLogo}
              alt={item.companyLogoAlt ?? item.company}
              className="h-6 sm:h-7 w-auto mb-2 object-contain object-left"
            />
          ) : (
            <p className="text-xs font-mono uppercase tracking-widest text-cream/60 mb-1.5">
              {item.company}
            </p>
          )}
          <p className="font-serif text-lg text-cream leading-snug mb-2">
            {item.title}
          </p>
          <p className="text-sm text-cream/70 leading-snug">
            {item.impact}
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

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayback = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

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
        {/* Full-bleed hero: SpendLight video with overlaid headline */}
        <section className="relative w-full" aria-label="Introduction">
          <Link to="/spendlight" className="group block">
            <div className="relative h-[52vh] sm:h-[80vh] min-h-[360px] sm:min-h-[500px] max-h-[560px] sm:max-h-[760px] overflow-hidden bg-charcoal dark:bg-dark-bg flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                aria-label="SpendLight core flow: mood check-in, logging a purchase reflection, adding context, and receiving the bonsai growth reward"
                className="h-[90%] w-auto max-w-[50%] sm:h-[26%] sm:max-w-[13%] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              >
                <source src="/spendlight/spendlight-core-flow.mp4" type="video/mp4" />
                <source src="/spendlight/spendlight-core-flow.mov" type="video/quicktime" />
              </video>
              <div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal/40 to-charcoal pointer-events-none"
                aria-hidden="true"
              />
              <button
                type="button"
                onClick={togglePlayback}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-charcoal/60 dark:bg-dark-bg/70 backdrop-blur-sm text-cream flex items-center justify-center hover:bg-charcoal/80 dark:hover:bg-dark-bg/90 transition-colors"
              >
                {isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M7 5v14l12-7z" />
                  </svg>
                )}
              </button>
              <div className="absolute left-6 right-6 sm:left-10 sm:right-10 bottom-6 sm:bottom-8 pointer-events-none">
                <h1 className="font-serif text-2xl sm:text-3xl text-cream leading-tight max-w-md">
                  Are you looking for a product-minded designer who can code?
                </h1>
                 <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-cream/80 mb-2">
                  Read case study →
                </p>
              </div>
            </div>
          </Link>
        </section>

        {/* Additional work */}
        <section className="mt-10 sm:mt-12 max-w-2xl mx-auto px-6 sm:px-8" aria-label="Additional work">
          <p className="text-xs text-warm-gray dark:text-dark-warm-gray font-mono uppercase tracking-widest mb-5">
            Additional work
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {workItems.map((item) => (
              <FlipCard key={item.to} item={item} />
            ))}
          </div>
        </section>
      </main>

      <footer className="py-6 px-6 text-center text-sm text-warm-gray dark:text-dark-warm-gray">
        &copy; {new Date().getFullYear()} Vanessa Bell
      </footer>
    </div>
  );
}
