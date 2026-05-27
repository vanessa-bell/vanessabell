import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import ContactForm from "../components/ContactForm";

export default function Contact() {
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

        <header className="mb-10">
          <h1 className="font-serif text-4xl sm:text-5xl text-charcoal dark:text-dark-cream leading-tight mb-3">
            Get in Touch
          </h1>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
            Available for contract engagements. Open to the right full-time role.
          </p>
        </header>

        <section className="mb-12" aria-label="How I work">
          <h2 className="font-serif text-2xl text-charcoal dark:text-dark-cream mb-3">
            How I work
          </h2>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed mb-8">
            I take three kinds of engagements.
          </p>

          <div className="space-y-6 mb-10">
            <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
              <strong className="text-charcoal dark:text-dark-cream font-medium">Embedded design and build.</strong>{" "}
              8 to 12 weeks, typically 20 to 30 hours per week. I run research, design, and ship production code alongside your engineering team. Best fit: you have a tool that needs structural rework and you do not have a full-time designer. Example: my{" "}
              <Link
                to="/ai-research-workflow"
                className="text-terracotta dark:text-dark-terracotta underline underline-offset-4 hover:underline-offset-6 transition-all duration-150"
              >
                health tech engagement
              </Link>.
            </p>
            <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
              <strong className="text-charcoal dark:text-dark-cream font-medium">Heuristic audit and design roadmap.</strong>{" "}
              2 to 4 weeks, project-based. I assess your current product against UX heuristics, surface the highest-leverage opportunities, and deliver a prioritized roadmap. Best fit: you know something is off but want an outside read before committing to a longer engagement.
            </p>
            <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
              <strong className="text-charcoal dark:text-dark-cream font-medium">Focused design sprint.</strong>{" "}
              1 to 2 weeks, project-based. We pick one workflow or feature and I move it from problem definition to design through working prototype. Best fit: you have a specific decision to make and want fast, well-researched answers.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-xs text-warm-gray dark:text-dark-warm-gray uppercase tracking-widest mb-3">
                What I need from your team
              </p>
              <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
                One product contact who can answer questions and connect me to users for research. If relevant, an engineering contact who I can work closely with. Weekly check-in with whoever owns the product decision.
              </p>
            </div>
            <div>
              <p className="text-xs text-warm-gray dark:text-dark-warm-gray uppercase tracking-widest mb-3">
                What I do not do
              </p>
              <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
                Pure visual design or brand work. Work that does not include user research.
              </p>
            </div>
            <div>
              <p className="text-xs text-warm-gray dark:text-dark-warm-gray uppercase tracking-widest mb-3">
                Pricing
              </p>
              <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
                Rates depend on scope and engagement length. Reach out below or email me directly and I will send a proposal within a few days of our first call.
              </p>
              <p className="mt-2 text-sm text-charcoal dark:text-dark-cream font-medium">
                Currently booking July 2026 starts.
              </p>
            </div>
          </div>
        </section>

        <ContactForm />

        <a
          href="https://www.linkedin.com/in/vanessajoanbell/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-5 text-sm text-olive dark:text-dark-olive hover:text-olive-dark dark:hover:text-dark-cream transition-all duration-150 underline underline-offset-4 hover:underline-offset-6"
        >
          LinkedIn
          <span className="sr-only"> (opens in new tab)</span>
        </a>

        <div className="mt-4">
          <a
            href="/vanessa-bell-design-engineer-resume-2026.pdf"
            download="Vanessa Bell Resume.pdf"
            className="text-sm text-terracotta dark:text-dark-terracotta underline underline-offset-4 hover:underline-offset-6 transition-all duration-150"
          >
            Download resume
          </a>
        </div>

        <div className="mt-10">
          <Link
            to="/"
            className="text-sm text-warm-gray dark:text-dark-warm-gray hover:text-charcoal dark:hover:text-dark-cream transition-colors"
          >
            <span aria-hidden="true">←</span> Back to work
          </Link>
        </div>

      </main>
    </div>
  );
}
