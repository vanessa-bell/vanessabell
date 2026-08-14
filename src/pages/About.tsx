import { useState } from "react";
import SiteHeader from "../components/SiteHeader";
import { usePageMeta } from "../hooks/usePageMeta";

const photos = [
  { src: "/about/flamenco-1.jpg", alt: "Vanessa Bell in a red sleeveless dress with black fringe necklace performing flamenco, center stage with other dancers softly out of focus behind her" },
  { src: "/about/flamenco-2.jpg", alt: "Vanessa Bell mid-spin in a red and orange ruffled flamenco dress, arms extended wide, performing on stage with musicians and dancers seated behind her" },
  { src: "/about/flamenco-3.jpg", alt: "Vanessa Bell in a red and gold ruffled flamenco dress, arms raised in an expressive pose, photographed against a black background" },
];

function PhotoCarousel() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + photos.length) % photos.length);
  const next = () => setCurrent((c) => (c + 1) % photos.length);

  return (
    <div>
      <div className="relative">
        <img
          src={photos[current].src}
          alt={photos[current].alt}
          className="w-full"
        />
        <button
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cream dark:bg-dark-bg border border-warm-gray/20 dark:border-dark-warm-gray/20 flex items-center justify-center text-warm-gray dark:text-dark-warm-gray hover:text-charcoal dark:hover:text-dark-cream transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cream dark:bg-dark-bg border border-warm-gray/20 dark:border-dark-warm-gray/20 flex items-center justify-center text-warm-gray dark:text-dark-warm-gray hover:text-charcoal dark:hover:text-dark-cream transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
      <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Photos">
        {photos.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Photo ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i === current
                ? "bg-clay dark:bg-dark-clay"
                : "bg-warm-gray/30 dark:bg-dark-warm-gray/30 hover:bg-warm-gray/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function About() {
  usePageMeta({
    title: "About | Vanessa Bell",
    description: "Product Designer based in San Francisco, working at the intersection of healthcare, AI, and human-centered research. Former software engineer. Flamenco dancer. Yoga teacher.",
    path: "/about",
  });

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg text-charcoal dark:text-dark-cream">
      <SiteHeader />
      <main id="main-content" className="max-w-2xl mx-auto px-6 sm:px-8 pt-6 sm:pt-8 pb-12 sm:pb-16">

        <header className="mb-12">
          <p className="text-sm text-warm-gray dark:text-dark-warm-gray font-mono uppercase tracking-widest mb-3">
            About
          </p>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-serif text-4xl sm:text-5xl text-charcoal dark:text-dark-cream leading-tight">
              Vanessa Bell
            </h1>
          </div>
          <p className="text-warm-gray dark:text-dark-warm-gray">
            Product Designer
          </p>
        </header>

        <hr className="border-warm-gray/20 dark:border-dark-warm-gray/20 mb-12" />

        <div className="space-y-5 mb-12">
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            I'm a UX researcher and designer based in San Francisco. I design products and then I build them.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            I came to design from software engineering. After six years building production systems at startups like AllStripes (a rare disease research platform) and Thistle, I transitioned to UX design during a sabbatical I took in 2023.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            I also teach hatha yoga and perform flamenco dance.
          </p>
        </div>

        {/* Mobile: carousel */}
        <div className="sm:hidden -mx-6 mb-16">
          <PhotoCarousel />
          <p className="mt-3 px-6 text-xs text-warm-gray/50 dark:text-dark-warm-gray/50 text-center">
            Photos: <a href="https://www.aubefred.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-warm-gray dark:hover:text-dark-warm-gray transition-colors">Fred Aube</a>
          </p>
        </div>

        {/* Desktop: masonry */}
        <div className="hidden sm:block -mx-8 mb-16">
          <div className="columns-2 gap-3">
            {photos.map((photo) => (
              <figure key={photo.src} className="break-inside-avoid mb-3">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full rounded-lg"
                />
              </figure>
            ))}
          </div>
          <p className="justify-self-center mt-1 px-8 text-xs text-warm-gray/50 dark:text-dark-warm-gray/50">
            Photos: <a href="https://www.aubefred.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-warm-gray dark:hover:text-dark-warm-gray transition-colors">Fred Aube</a>
          </p>
        </div>

      </main>
    </div>
  );
}
