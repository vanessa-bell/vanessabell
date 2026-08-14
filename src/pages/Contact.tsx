import { Link } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";
import ContactForm from "../components/ContactForm";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Contact() {
  usePageMeta({
    title: "Get in Touch | Vanessa Bell",
    description: "Available for embedded design and build, heuristic audits, and focused design sprints.",
    path: "/contact",
  });

  return (
    <div className="relative min-h-screen bg-cream dark:bg-dark-bg text-charcoal dark:text-dark-cream">
      <img
        src="/Olive-Branch.svg"
        alt=""
        aria-hidden="true"
        className="hidden sm:block absolute bottom-4 right-2 w-32 h-32 sm:w-40 sm:h-40 opacity-90 pointer-events-none"
      />
      <SiteHeader />
      <main id="main-content" className="max-w-2xl mx-auto px-6 sm:px-8 pt-6 sm:pt-8 pb-12 sm:pb-16">

        <header className="mb-10">
          <h1 className="font-serif text-4xl sm:text-5xl text-charcoal dark:text-dark-cream leading-tight mb-3">
            Get in Touch
          </h1>
          <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
          Looking forward to hearing from you!
           </p>
        </header>

        {/* "How I work" — engagement types, what I need, what I don't do, pricing.
            Set aside for now per request; kept here verbatim so it's easy to bring back
            or move to another page later.

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
                className="text-clay dark:text-dark-clay underline underline-offset-4 hover:underline-offset-6 transition-all duration-150"
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
              <p className="text-xs text-warm-gray dark:text-dark-warm-gray font-mono uppercase tracking-widest mb-3">
                What I need from your team
              </p>
              <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
                One product contact who can answer questions and connect me to users for research. If relevant, an engineering contact who I can work closely with. Weekly check-in with whoever owns the product decision.
              </p>
            </div>
            <div>
              <p className="text-xs text-warm-gray dark:text-dark-warm-gray font-mono uppercase tracking-widest mb-3">
                What I do not do
              </p>
              <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
                Pure visual design or brand work. Work that does not include user research.
              </p>
            </div>
            <div>
              <p className="text-xs text-warm-gray dark:text-dark-warm-gray font-mono uppercase tracking-widest mb-3">
                Pricing
              </p>
              <p className="text-warm-gray dark:text-dark-warm-gray leading-relaxed">
                Rates depend on scope and engagement length. Reach out below or email me directly and I will send a proposal within a few days of our first call.
              </p>
            </div>
          </div>
        </section>
        */}

        <ContactForm />

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
