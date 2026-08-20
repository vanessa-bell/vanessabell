import SiteHeader from "../components/SiteHeader";
import { usePageMeta } from "../hooks/usePageMeta";

const photos = [
  { src: "/about/flamenco-1.jpg", width: 640, height: 426, alt: "Vanessa Bell in a red sleeveless dress with black fringe necklace performing flamenco, center stage with other dancers softly out of focus behind her" },
  { src: "/about/flamenco-2.jpg", width: 640, height: 426, alt: "Vanessa Bell mid-spin in a red and orange ruffled flamenco dress, arms extended wide, performing on stage with musicians and dancers seated behind her" },
  { src: "/about/flamenco-3.jpg", width: 640, height: 853, alt: "Vanessa Bell in a red and gold ruffled flamenco dress, arms raised in an expressive pose, photographed against a black background" },
];

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
            <h1 className="font-serif text-4xl sm:text-5xl text-charcoal dark:text-dark-cream leading-tight text-balance">
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

        {/* Photos: one responsive masonry grid at every breakpoint */}
        <div className="-mx-6 sm:-mx-8 mb-16">
          <div className="columns-2 gap-3 px-6 sm:px-8">
            {photos.map((photo, i) => (
              <figure key={photo.src} className="break-inside-avoid mb-3">
                <img
                  src={photo.src}
                  width={photo.width}
                  height={photo.height}
                  loading={i === 0 ? undefined : "lazy"}
                  alt={photo.alt}
                  className="w-full rounded-lg"
                />
              </figure>
            ))}
          </div>
          <p className="mt-1 px-6 sm:px-8 text-xs text-warm-gray/50 dark:text-dark-warm-gray/50">
            Photos: <a href="https://www.aubefred.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-warm-gray dark:hover:text-dark-warm-gray transition-colors">Fred Aube</a>
          </p>
        </div>

      </main>
    </div>
  );
}
