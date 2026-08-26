# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are hiring managers and recruiters at startups evaluating Vanessa Bell for full-time product designer roles. They are scanning case studies to decide whether to move her into an interview loop or make an offer.

## Product Purpose

A personal portfolio site (vanessabell.design) for product designer Vanessa Bell. It exists to get her hired: it presents case studies, background, and contact paths so a hiring manager can quickly assess her fit and reach out.

## Positioning

"Product-minded designer who can code" is real but only half the claim — the other half is research rigor. Vanessa came from six years as a software engineer (AllStripes, Thistle) before transitioning to UX design and research. The differentiator the site should prove end-to-end is: design decisions grounded in real user research, shipped by someone who can also build production code — not a designer who hands off mockups, and not an engineer doing surface-level UX.

## Operating Context

- Case studies span healthcare ops (AllStripes), health tech/AI internal tooling, gaming (Talofa Games / Monster Walk), and a personal 0-to-1 project (SpendLight).
- Contact form submits to Formspree; a downloadable resume PDF and a LinkedIn profile link are both live conversion paths alongside the contact form.
- Site also carries personal/identity content (About page: flamenco dance, hatha yoga, San Francisco) alongside professional case studies.

## Capabilities and Constraints

- Built with React 19, React Router, TypeScript, Vite, and Tailwind v4.
- Supports light/dark theme (ThemeToggle) and respects `prefers-reduced-motion` (swaps video/gif hero media for static fallbacks).
- Case study pages: AllStripes, HealthTech (AI research workflow), MonsterWalk, SpendLight — each with its own media assets under `public/`.

## Brand Commitments

- Name: Vanessa Bell. Title: Product Designer.
- Photo credit on About page flamenco photos must stay attributed to Fred Aube (aubefred.com).
- LinkedIn: linkedin.com/in/vanessajoanbell. Domain: vanessabell.design.

## Evidence on Hand

All current case study metrics, claims, and company names are confirmed accurate as of this writing — treat them as locked fact, not placeholders to "fix" or round up:
- SpendLight: concept validated, MVP spec ready for engineering (0-to-1 personal project).
- AllStripes: medical records processing workflow redesign, 20 min → under 1 min per file (95% reduction).
- Health tech AI research workflow: 9x reduction in time and steps (company is an early-stage health tech startup, not named).
- Monster Walk (Talofa Games): user research on a Welcome Back / streak-milestone flow. Concept validation testing (n=4): 4.8/5 average likelihood to return tomorrow, 4.3/5 average rewarding/motivating rating, both 100% rated 4 or 5 against a 75% target. Sample skewed toward existing, engaged players.

Resume PDF at `public/vanessa-bell-designer-resume-2026.pdf` is current.

## Product Principles

1. Every case study must demonstrate both research rigor and shipped/production outcomes — neither alone is the differentiator.
2. Optimize for a hiring manager skimming fast: lead with the outcome/metric before the process narrative.
3. Never inflate or round up a real metric or invent evidence (testimonials, additional case studies, employer claims) beyond what's confirmed here.
4. Personal identity content (About page) supports credibility and memorability but never displaces the case studies as the primary conversion path.
5. Keep contact paths (Formspree form, resume download, LinkedIn) low-friction and always reachable, not buried behind case study depth.

## Accessibility & Inclusion

Reduced-motion support is an established product requirement, not optional polish: hero media (video/gif) must always have a static fallback, already implemented via `usePrefersReducedMotion`.
