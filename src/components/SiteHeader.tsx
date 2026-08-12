import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const CASE_STUDY_PATHS = ["/ai-research-workflow", "/allstripes", "/spendlight", "/monster-walk"];

export default function SiteHeader() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isWork = isHome || CASE_STUDY_PATHS.includes(pathname);
  const isAbout = pathname === "/about";
  const isContact = pathname === "/contact";

  const linkClass = (active: boolean) =>
    active
      ? "text-terracotta dark:text-dark-terracotta font-medium transition-colors"
      : "text-warm-gray dark:text-dark-warm-gray hover:text-charcoal dark:hover:text-dark-cream transition-colors";

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-terracotta focus:text-cream dark:focus:bg-dark-terracotta dark:focus:text-dark-bg focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-50 w-full bg-cream/90 dark:bg-dark-bg/90 backdrop-blur-sm border-b border-warm-gray/10 dark:border-dark-warm-gray/10 px-6 sm:px-8 py-4 flex justify-between items-center">
        <Link
          to="/"
          aria-label="Home"
          aria-current={isHome ? "page" : undefined}
          className={`font-serif text-lg transition-colors ${
            isHome
              ? "text-terracotta dark:text-dark-terracotta"
              : "text-charcoal dark:text-dark-cream hover:text-terracotta dark:hover:text-dark-terracotta"
          }`}
        >
          VB
        </Link>
        <nav className="flex gap-5 items-center text-sm" aria-label="Primary">
          <Link to="/" aria-current={isWork ? "page" : undefined} className={linkClass(isWork)}>
            Work
          </Link>
          <Link to="/about" aria-current={isAbout ? "page" : undefined} className={linkClass(isAbout)}>
            About
          </Link>
          <Link
              to="https://www.linkedin.com/in/vanessajoanbell/"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 ${linkClass(isContact)}`}
            >
              LinkedIn
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span className="sr-only"> (opens in new tab)</span>
            </Link>
            <a
            href="/vanessa-bell-designer-resume-2026.pdf"
            download="Vanessa Bell Resume.pdf"
            className={`inline-flex items-center gap-1 ${linkClass(isContact)}`}
          >
            Resume
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
          <Link to="/contact" aria-current={isContact ? "page" : undefined} className={linkClass(isContact)}>
            Contact
          </Link>
          <ThemeToggle />
        </nav>
      </header>
    </>
  );
}
