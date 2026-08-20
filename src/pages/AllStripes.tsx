import SiteHeader from "../components/SiteHeader";
import { usePageMeta } from "../hooks/usePageMeta";

export default function AllStripes() {
  usePageMeta({
    title: "Helping Patients Get Their Records Faster | Vanessa Bell",
    description: "A workflow redesign that cut medical records processing time by 95% and directly sped up patient access to their own health data.",
    path: "/allstripes",
  });

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
            Helping Patients Get Their Records Faster
          </h1>
          <p className="text-warm-gray dark:text-dark-warm-gray mb-8">
            A workflow redesign that cut medical records processing time by 95% and directly sped up patient access to their own health data.
          </p>

          <figure className="my-10">
            <img
              src="/allstripes/allstripes-cover.jpg"
              width={474}
              height={426}
              alt="AllStripes medical records workflow redesign"
              className="w-full rounded-lg"
            />
          </figure>

          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 mb-10 rounded-xl border border-clay/20 dark:border-dark-clay/25 bg-clay/[0.06] dark:bg-dark-clay/[0.08] px-5 py-6 sm:px-6">
            {[
              { value: "95%+", label: "reduction in processing time" },
              { value: "100 pages", label: "typical file size processed" },
              { value: "20 min → <1 min", label: "per file, before → after" },
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
              { label: "Role", value: "Senior Software Engineer · UX & Internal Tooling Focus" },
              { label: "Company", value: "AllStripes, now part of PicnicHealth (rare disease research platform)" },
              { label: "Year", value: "2022" },
              { label: "Team", value: "Operations, myself on engineering team" },
              { label: "Scope", value: "Research, UX design, React/TypeScript implementation" },
              { label: "Impact", value: "95% reduction in medical records processing time" },
            ].map(({ label, value }) => (
              <div key={label}>
                <dt className="text-warm-gray dark:text-dark-warm-gray mb-1">{label}</dt>
                <dd className="text-charcoal dark:text-dark-cream font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <hr className="border-warm-gray/20 dark:border-dark-warm-gray/20 mb-12" />

        {/* The Problem */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            The problem
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            AllStripes helped patients with rare diseases connect with researchers and access their own medical records. But processing those records was slow.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            When a patient submitted a 100-page medical document, the operations team had to work through it manually: each file had to be downloaded to a local machine, then split by hand into smaller chunks the system could handle. A seasoned operations associate averaged 20 minutes per 100-page file. Every delay had a human cost: patients with rare diseases waiting longer to understand their own health history.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            Beyond the time problem, there was a security risk: downloading sensitive patient records to personal machines created unnecessary exposure for protected health information.
          </p>
        </section>

        {/* My Approach */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            My approach
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            I started by working closely with the operations team to understand exactly where time was being lost and why. Then I designed and built a file chunking process that broke large medical records into structured segments automatically, triggered as soon as a file was uploaded. No manual steps, no local downloads.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            One of the real challenges wasn't technical. Automating records processing required overcoming organizational resistance, a sensitive area given the nature of patient data. I navigated this by keeping stakeholders closely informed, communicating tradeoffs clearly, and demoing results to the full company once the system was live.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            The interface the ops team used to interact with the system was designed in close collaboration with them. I asked for feedback throughout development, not just at the end.
          </p>
        </section>

        {/* Result */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            Result
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            A 100-page file that previously took ~20 minutes of manual work took under 1 minute after my changes shipped, a 95%+ reduction.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-6">
            Patients got faster access to their records. The ops team recovered hours per week. And sensitive patient data was no longer being downloaded to local machines.
          </p>
          <blockquote className="border-l-2 border-clay dark:border-dark-clay pl-6">
            <p className="font-serif text-lg sm:text-xl text-charcoal dark:text-dark-cream leading-snug italic mb-4">
              "Vanessa's technical and design work speaks for itself in the outcome. I was Senior Director of Engineering at the time; this was her project to drive. The hardest parts she navigated were the tradeoffs, the organizational friction, and earning trust for a change in how patient data was handled. Design sense, technical chops and product judgment rarely live in one person, and this project shows what happens when they do."
            </p>
            <footer className="text-sm text-warm-gray dark:text-dark-warm-gray font-medium">
              Jon Oropeza
            </footer>
          </blockquote>
        </section>

        {/* How I Measured Success */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            How I measured success
          </h2>
          <ul className="space-y-2">
            {[
              "Processing time: a 100-page medical record that took a seasoned ops associate ~20 minutes to process by hand took under a minute after the redesign shipped, a 95%+ reduction, holding across the range of file sizes the team processed.",
              "Ops team hours recovered per week, previously spent on manual downloading and splitting.",
              "Security: sensitive patient records stopped being downloaded to personal machines altogether, closing a real PHI exposure risk.",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-warm-gray dark:text-dark-warm-gray">
                <span className="text-clay-dark dark:text-dark-clay text-sm leading-relaxed shrink-0">–</span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

      </main>
    </div>
  );
}
