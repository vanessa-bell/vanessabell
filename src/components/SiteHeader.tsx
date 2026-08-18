import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const CASE_STUDY_PATHS = ["/ai-research-workflow", "/allstripes", "/spendlight", "/monster-walk"];

export default function SiteHeader() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = pathname === "/";
  const isWork = isHome || CASE_STUDY_PATHS.includes(pathname);
  const isAbout = pathname === "/about";
  const isContact = pathname === "/contact";

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const linkClass = (active: boolean) =>
    active
      ? "text-clay-dark dark:text-dark-clay font-medium transition-colors"
      : "text-warm-gray dark:text-dark-warm-gray hover:text-charcoal dark:hover:text-dark-cream transition-colors";

  const navLinks = (
    <>
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
        className={`inline-flex items-center gap-1 ${linkClass(false)}`}
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
        className={`inline-flex items-center gap-1 ${linkClass(false)}`}
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
    </>
  );

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-clay focus:text-cream dark:focus:bg-dark-clay dark:focus:text-dark-bg focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-50 w-full bg-cream/90 dark:bg-dark-bg/90 backdrop-blur-sm border-b border-warm-gray/10 dark:border-dark-warm-gray/10">
        <div className="px-6 sm:px-8 py-4 flex justify-between items-center">
          <Link
            to="/"
            aria-label="Home"
            aria-current={isHome ? "page" : undefined}
            className={`font-serif text-lg transition-colors ${
              isHome
                ? "text-clay-dark dark:text-dark-clay"
                : "text-charcoal dark:text-dark-cream hover:text-clay-dark dark:hover:text-dark-clay"
            }`}
          >
            Vanessa Bell
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex gap-5 items-center text-sm" aria-label="Primary">
            {navLinks}
            <ThemeToggle />
          </nav>

          {/* Mobile controls */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((open) => !open)}
              className="w-9 h-9 -mr-1.5 flex items-center justify-center rounded-lg text-charcoal dark:text-dark-cream hover:text-clay-dark dark:hover:text-dark-clay transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {mobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <div
          id="mobile-nav"
          className={`sm:hidden overflow-hidden transition-[max-height,opacity] duration-200 ease-out border-t border-warm-gray/10 dark:border-dark-warm-gray/10 ${
            mobileOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <nav aria-label="Primary" className="flex flex-col gap-4 px-6 py-5 text-sm">
            {navLinks}
          </nav>
        </div>
      </header>
    </>
  );
}
