import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import ContactForm from "../components/ContactForm";

const photos = [
  { src: "/about/flamenco-1.jpg", alt: "Vanessa Bell performing flamenco" },
  { src: "/about/flamenco-2.jpg", alt: "Vanessa Bell performing flamenco" },
  { src: "/about/flamenco-3.jpg", alt: "Vanessa Bell performing flamenco" },
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
                ? "bg-terracotta dark:bg-dark-terracotta"
                : "bg-warm-gray/30 dark:bg-dark-warm-gray/30 hover:bg-warm-gray/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function About() {
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

        <header className="mb-12">
          <p className="text-sm text-warm-gray dark:text-dark-warm-gray uppercase tracking-widest mb-3">
            About
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-charcoal dark:text-dark-cream leading-tight mb-1">
            Vanessa Bell
          </h1>
          <p className="text-warm-gray dark:text-dark-warm-gray">
            Design Engineer
          </p>
        </header>

        <hr className="border-warm-gray/20 dark:border-dark-warm-gray/20 mb-12" />

        <div className="space-y-5 mb-12">
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            I'm a Design Engineer based in San Francisco, interested in working at the intersection of healthcare, AI, and human-centered research.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            I came to design from software engineering. After six years building production systems at startups like AllStripes (a rare disease research platform) and Thistle, I transitioned to UX design during a sabbatical I took in 2023. The years I spent helping my parents navigate serious illness made me want to build for the people most underserved by the tools they have to use.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            I work best embedded in small teams where I can run user research, design, and ship production code in the same week. Right now I'm open to staff roles and contract engagements.
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
          <p className="mt-1 px-8 text-xs text-warm-gray/50 dark:text-dark-warm-gray/50">
            Photos: <a href="https://www.aubefred.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-warm-gray dark:hover:text-dark-warm-gray transition-colors">Fred Aube</a>
          </p>
        </div>

        <section className="mb-12" aria-label="Resume and contact">
          <a
            href="/vanessa-bell-design-engineer-resume-2026.pdf"
            download="Vanessa Bell Resume.pdf"
            className="inline-block mb-10 px-5 py-2.5 rounded-lg bg-terracotta dark:bg-dark-terracotta text-cream dark:text-dark-bg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Download resume
          </a>
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            Get in Touch
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-6">
            Open to staff roles and contract engagements.
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
