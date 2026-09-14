// AnalyticsEvents.tsx
//
// Portfolio analytics: the Forma request-access funnel, plus two high-intent
// secondary events.
//
// Deliberately ONE self-contained file with no path aliases and no imports
// beyond react and react-router-dom, so it drops into any folder in the Vite
// project without touching tsconfig or vite.config.
//
// Mount it once, INSIDE the <Router>, as a sibling of <Routes>. It must be
// inside the router or useLocation() throws.
//
// Funnel definitions: 6-month-plan/01-weekly-tracker.md, Funnel C.

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type UmamiProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    umami?: {
      track: (
        name: string | ((props: UmamiProps) => UmamiProps),
        data?: UmamiProps,
      ) => void;
    };
  }
}

const EV = {
  FORM_VIEWED: 'vb-forma-form-viewed',
  FORM_START: 'vb-forma-form-start',
  FORM_SUBMIT: 'vb-forma-form-submit',
  RESUME_DOWNLOAD: 'vb-resume-download',
  LINKEDIN_CLICK: 'vb-linkedin-click',
} as const;

const FORMA_PATH = '/ai-research-workflow';

/** Analytics must never break the page. */
function track(name: string, data?: UmamiProps): void {
  if (typeof window === 'undefined') return;
  try {
    const clean = data
      ? Object.fromEntries(
          Object.entries(data).filter(([, v]) => v !== undefined && v !== ''),
        )
      : undefined;
    window.umami?.track(name, clean as UmamiProps | undefined);
  } catch {
    /* blocked, not loaded, or offline. All normal. */
  }
}

const fired = new Set<string>();

function trackOnce(key: string, name: string, data?: UmamiProps): void {
  if (fired.has(key)) return;
  fired.add(key);
  track(name, data);
}

export default function AnalyticsEvents() {
  const { pathname } = useLocation();

  // Route changes do not reload the page, so the once-per-view guards have to
  // be cleared by hand. Without this, a visitor who leaves the Forma page and
  // comes back is counted as reaching the form only once.
  useEffect(() => {
    fired.clear();
  }, [pathname]);

  // ---- Step 2: scrolled far enough to reach the form ----------------------
  //
  // An IntersectionObserver on the form itself, not a percentage scroll depth.
  // The form currently sits about 62% down the page, but that number changes
  // the moment the case study gains or loses a paragraph. Observing the
  // element keeps the measurement meaningful across content edits, which
  // matters when the baseline has to stay comparable for months.
  useEffect(() => {
    if (pathname !== FORMA_PATH) return;

    let io: IntersectionObserver | null = null;
    let mo: MutationObserver | null = null;

    const attach = () => {
      const form = document.querySelector('form');
      if (!form) return false;
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              trackOnce('form-viewed', EV.FORM_VIEWED);
              io?.disconnect();
            }
          }
        },
        { threshold: 0.5 },
      );
      io.observe(form);
      return true;
    };

    if (!attach()) {
      mo = new MutationObserver(() => {
        if (attach()) {
          mo?.disconnect();
          mo = null;
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      io?.disconnect();
      mo?.disconnect();
    };
  }, [pathname]);

  // ---- Step 3: started filling it in --------------------------------------
  useEffect(() => {
    const onInput = (e: Event) => {
      const el = e.target as HTMLInputElement | null;
      if (!el || !el.closest?.('form')) return;
      if (el.id !== 'name' && el.id !== 'email') return;
      if (location.pathname !== FORMA_PATH) return;
      trackOnce('form-start', EV.FORM_START, { field: el.id });
    };

    document.addEventListener('input', onInput, true);
    return () => document.removeEventListener('input', onInput, true);
  }, []);

  // ---- Step 4: submitted ---------------------------------------------------
  //
  // Caught from the form's own submit event, so no change to your form
  // component is needed.
  //
  // Read this as ATTEMPTS, not confirmed successes. It fires the moment submit
  // happens, before your handler knows whether the request worked. At portfolio
  // traffic levels the difference is almost certainly zero, which is why this
  // is not worth an edit today. If it ever matters, move the call into your
  // success branch and delete this effect.
  useEffect(() => {
    const onSubmit = () => {
      if (location.pathname !== FORMA_PATH) return;
      track(EV.FORM_SUBMIT);
    };

    document.addEventListener('submit', onSubmit, true);
    return () => document.removeEventListener('submit', onSubmit, true);
  }, []);

  // ---- Secondary: the two highest-intent actions on the whole site ---------
  //
  // Not in the brief, added because they cost nothing here and they answer the
  // question the portfolio actually exists to answer. A resume download is the
  // strongest hiring-intent signal available on this site, and neither of these
  // fires a pageview, so today they are invisible.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target as Element | null;
      const a = el?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;

      const href = a.getAttribute('href') || '';

      if (href.endsWith('.pdf')) {
        track(EV.RESUME_DOWNLOAD, { from: location.pathname });
        return;
      }

      if (href.includes('linkedin.com')) {
        track(EV.LINKEDIN_CLICK, { from: location.pathname });
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
