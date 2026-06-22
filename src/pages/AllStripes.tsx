import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import ContactForm from "../components/ContactForm";
import { usePageMeta } from "../hooks/usePageMeta";

export default function AllStripes() {
  usePageMeta({
    title: "Helping Patients Get Their Records Faster — Vanessa Bell",
    description: "A workflow redesign that cut medical records processing time by 95% and directly sped up patient access to their own health data.",
    path: "/allstripes",
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
            Helping Patients Get Their Records Faster
          </h1>
          <p className="text-warm-gray dark:text-dark-warm-gray mb-8">
            A workflow redesign that cut medical records processing time by 95% and directly sped up patient access to their own health data.
          </p>

          <figure className="my-10">
            <img
              src="/allstripes/allstripes-cover.jpg"
              alt="AllStripes medical records workflow redesign"
              className="w-full rounded-lg"
            />
          </figure>

          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5 text-sm mt-8 mx-auto">
            {[
              { label: "Role", value: "Senior Software Engineer · UX & Internal Tooling Focus" },
              { label: "Company", value: "AllStripes, now part of PicnicHealth (rare disease research platform)" },
              { label: "Timeline", value: "2022" },
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
            The Problem
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            AllStripes helps patients with rare diseases connect with researchers and access their own medical records. But processing those records was slow.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            When a patient submitted a 100-page medical document, the operations team had to work through it manually — each file had to be downloaded to a local machine, then split by hand into smaller chunks the system could handle. A seasoned ops associate averaged 20 minutes per 100-page file. Every delay had a human cost: patients with rare diseases waiting longer to understand their own health history.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            Beyond the time problem, there was a security risk: downloading sensitive patient records to personal machines created unnecessary exposure for protected health information.
          </p>
        </section>

        {/* My Approach */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            My Approach
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            I started by working closely with the operations team to understand exactly where time was being lost and why. Then I designed and built a file chunking process that broke large medical records into structured segments automatically, triggered as soon as a file was uploaded — no manual steps, no local downloads.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            One of the real challenges wasn't technical. Automating records processing required overcoming organizational resistance — a sensitive area given the nature of patient data. I navigated this by keeping stakeholders closely informed, communicating tradeoffs clearly, and demoing results to the full company once the system was live.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            The interface the ops team used to interact with the system was designed in close collaboration with them — I asked for feedback throughout development, not just at the end.
          </p>
        </section>

        {/* Result */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            Result
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            A 100-page file that previously took ~20 minutes of manual work took under 1 minute after my changes shipped — a 95%+ reduction.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-6">
            Patients got faster access to their records. The ops team recovered hours per week. And sensitive patient data was no longer being downloaded to local machines.
          </p>
          <blockquote className="border-l-2 border-terracotta dark:border-dark-terracotta pl-6">
            <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed italic mb-4">
              "Vanessa's technical and design work speaks for itself in the outcome. I was Senior Director of Engineering at the time; this was her project to drive. The hardest parts she navigated were the tradeoffs, the organizational friction, and earning trust for a change in how patient data was handled. Design sense, technical chops and product judgment rarely live in one person, and this project shows what happens when they do."
            </p>
            <footer className="text-sm text-charcoal dark:text-dark-cream font-medium">
              Jon Oropeza
            </footer>
          </blockquote>
        </section>

        <section className="mb-16">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-4">
            What This Project Taught Me
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-4">
            This was one of the first times I experienced the full arc of a workflow problem in healthcare: talking to the people doing the work, understanding why the friction existed, designing the system change, building it, and presenting the outcome to the people it affected.
          </p>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            That arc — from the ops team's frustration to the patient's faster access — is the thread that runs through everything I do now.
          </p>
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
