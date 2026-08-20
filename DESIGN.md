---
name: Vanessa Bell — Product Designer Portfolio
description: A research-grounded product design portfolio, designed and shipped in React + Tailwind.
colors:
  cream: "#FAF6F1"
  cream-dark: "#F0E8DE"
  clay: "#C2714F"
  clay-dark: "#A85D3F"
  sage: "#5C6B50"
  sage-dark: "#4A5641"
  charcoal: "#2C2926"
  warm-gray: "#6B6560"
  dark-bg: "#1C1917"
  dark-surface: "#292524"
  dark-cream: "#E7DDD3"
  dark-clay: "#92A683"
  dark-sage: "#B4A064"
  dark-warm-gray: "#A8A29E"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.15
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Work Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.1em"
  label-badge:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.625rem"
    fontWeight: 400
    letterSpacing: "0.08em"
rounded:
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  full: "9999px"
spacing:
  xs: "12px"
  sm: "16px"
  md: "20px"
  lg: "24px"
  xl: "32px"
  2xl: "40px"
  3xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.clay}"
    textColor: "{colors.cream}"
    rounded: "{rounded.lg}"
    padding: "10px 20px"
  input-text:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.lg}"
    padding: "10px 14px"
---

# Design System: Vanessa Bell — Product Designer Portfolio

## Overview

**Creative North Star: "The Terracotta Ledger"**

Earthy minimalism with a research-notebook feel: warm paper tones, a serif voice for headlines, and a monospace hand for labels — like a field ledger where the numbers and evidence carry the page, not the decoration. Every case study reads as an entry in that ledger: eyebrow label, real metric, real testimonial, nothing dressed up beyond what's true.

The system explicitly rejects cold corporate minimalism. Warmth is structural, not decorative — it comes from the cream/clay/sage palette itself, not from illustration or personality flourishes. Density stays low: one idea per section, generous vertical rhythm, and a single primary breakpoint (`sm:`, 640px) that's the only layout decision the system makes.

**Key Characteristics:**
- Warm neutral ground (cream paper, never white or gray) with two earth-tone accents in fixed roles
- Serif display type paired with a geometric sans for body and a monospace for labels/data — three families, each with one job
- Flat by default — depth comes from borders and tonal tinting, never `box-shadow`
- Generous whitespace and a strict single-breakpoint responsive model
- Every accent color is load-bearing (state, role, or data), never applied for variety alone

## Colors

Two earth-tone accents anchor a warm neutral base; each color has exactly one role across the whole site.

### Primary
- **Burnt Sienna** (`#C2714F` / `--color-clay`): the site's one accent for action and emphasis — active nav state, links, hero stat numbers, primary buttons, focus rings, icon strokes. Its dark-mode counterpart shifts hue rather than just lightening: `dark-clay` (`#92A683`) is a muted sage-green, not a lightened terracotta — a deliberate two-tone swap between themes, not a mechanical inversion.

### Secondary
- **Olive Moss** (`#5C6B50` / `--color-sage`): a second, rarer accent reserved for two specific roles — the "tag" pill on homepage case-study cards and the "Design implication" callout label on research-heavy case studies (SpendLight). It marks *synthesis* (a conclusion drawn from evidence), where Burnt Sienna marks *action or outcome*. Its dark-mode counterpart also swaps hue rather than lightening: `dark-sage` (`#B4A064`) is a warm khaki-gold, not a lightened olive — kept deliberately hue-distinct from `dark-clay`'s sage-green so the two accents never collide when both render in dark mode.

### Neutral
- **Cream** (`#FAF6F1` / `--color-cream`): page background, light mode. The paper the ledger is written on.
- **Cream Dark** (`#F0E8DE` / `--color-cream-dark`): light-mode surface tint, used sparingly (e.g. carousel media backing).
- **Charcoal** (`#2C2926` / `--color-charcoal`): primary text, light mode.
- **Warm Gray** (`#6B6560` / `--color-warm-gray`): secondary/body text, light mode — nearly all paragraph copy runs in this color, not charcoal.
- **Dark BG** (`#1C1917` / `--color-dark-bg`): page background, dark mode.
- **Dark Surface** (`#292524` / `--color-dark-surface`): card/input backgrounds, dark mode.
- **Dark Cream** (`#E7DDD3` / `--color-dark-cream`): primary text, dark mode.
- **Dark Warm Gray** (`#A8A29E` / `--color-dark-warm-gray`): secondary/body text, dark mode.

### Named Rules
**The Text-Weight Clay Rule.** `clay` (`#C2714F`) measures 3.39:1 against `cream` — it fails WCAG AA (4.5:1) as regular-weight body-sized text, even though it reads fine as a border, icon stroke, or background tint (3:1 threshold). Any *readable text* use of the accent in light mode — nav links, logo, stat numbers below the `sm:` breakpoint — must use `clay-dark` (`#A85D3F`, 4.54:1 against cream) instead. `dark-clay` needs no such substitution; at 6.66:1 against `dark-bg` it already passes comfortably.

**The One Accent Rule.** Only one of `clay`/`sage` appears as a foreground accent per component. Never mix both as co-equal colors in the same card or button — sage marks synthesis, clay marks everything else.

**The Distinct Dark-Swap Rule.** `dark-clay` and `dark-sage` were once both `#92A683` — an identical-hex bug that silently collapsed the One Accent Rule for any dark-mode reader (found on SpendLight's `InsightBlock`, where the two accents sit directly beside each other). Whenever an accent's dark-mode counterpart is chosen by hue-swapping rather than lightening, verify the resulting hex against every other token's dark-mode value, not just against its own light-mode source — a swap that lands on another token's color is the same bug as never swapping at all.

## Typography

**Display Font:** Newsreader (with Georgia, serif fallback) — loaded at weights 500/600 only; there is no 400 weight available, so serif text always renders at its nearest loaded weight.
**Body Font:** Work Sans (with system-ui, sans-serif fallback) — loaded at 400/500/600.
**Label/Mono Font:** IBM Plex Mono (with ui-monospace, monospace fallback) — loaded at 400/500.

**Character:** A literary serif for anything that names or titles, a plain geometric sans for everything read at length, and a monospace exclusively for labels, eyebrows, and data — the monospace is what gives the "ledger" its notebook feel; it never appears in a sentence.

### Hierarchy
- **Display** (600, `text-4xl sm:text-5xl` / 36px→48px, `leading-tight`): Case study, About, and Contact page `h1`.
- **Headline** (600, `text-2xl` / 24px): Section headings (`h2`) within a case study — "The problem", "My approach", "Outcome", etc.
- **Title** (500, unset size / ~16px, sans not serif): Subsection headings (`h3`) — numbered research-insight headings, constraint-card titles. Deliberately sans, not serif, to read as a label rather than a heading.
- **Body** (400, `text-base`/16px or `text-sm`/14px, `leading-relaxed`, `text-warm-gray`): Narrative paragraphs. No line-length constraint is enforced by the layout beyond the `max-w-2xl` (672px) column, which keeps measure close to 75ch.
- **Label** (400, `text-xs`–`text-sm` / 12–14px, `font-mono uppercase tracking-widest`): Eyebrows ("Case Study"), form field labels' sibling text, "Design implication" callouts.
- **Label Badge** (400, `text-[10px]` / 10px, `font-mono uppercase tracking-widest`): The one deliberately smaller label step, reserved for the flip-card pill badges that sit directly on top of media (front-face `frontLabel` and back-face `tag`) — small enough not to compete with the image underneath it.

**Homepage is the exception:** its `h1` runs at `text-xl sm:text-2xl` (20px→24px), far smaller than every other page's `h1`. This is deliberate — the homepage leads with the work grid, not a headline; the case-study pages lead with the claim.

### Named Rules
**The One-Weight-Family Rule.** Never introduce a fourth font family or a bold (700+) weight. The system's entire hierarchy is built from three families at their loaded weights (Newsreader 500/600, Work Sans 400/500/600, IBM Plex Mono 400/500) — weight jumps come from family switches (serif → sans → mono), not from bolding within a family.

## Layout

Mobile-first with exactly one breakpoint, `sm:` (640px) — no `md:`/`lg:` usage anywhere in the codebase; wide viewports are handled by capping content width, not by adding layout complexity.

**Containers:** `max-w-2xl` (672px) for case study/About/Contact body copy; `max-w-[810px]` for the homepage bento grid; `max-w-md` (448px) for video/carousel/hero media blocks.

**Page margins:** `px-6` (24px) mobile → `sm:px-8` (32px) desktop, horizontally; `pt-6 sm:pt-8` top, `pb-12 sm:pb-16` bottom.

**Rhythm:** Sections within a case study are separated by `mb-12` (48px) — the single dominant spacing value in the system. Tighter groups (label above value, icon beside text) use `gap-3`/`mb-1` to `mb-3` (12px or less). Media blocks (hero images, videos) get `my-10` (40px) top and bottom.

**Grid model:** Card grids default to `grid-cols-2` on mobile widening to `grid-cols-3` at `sm:` for metadata (`dl` role/company/year), or stay `grid-cols-2` throughout for stat blocks and constraint cards. The homepage bento grid is the one asymmetric layout: a 1.2fr/1fr two-column split at `sm:`, single column below it, with `order` utilities (not DOM position) driving the mobile stacking sequence independently of the desktop column pairing.

## Elevation & Depth

**Flat, explicitly.** There is no `box-shadow` anywhere in the codebase — confirmed by direct search, not inferred. Depth is conveyed entirely through borders (`border-warm-gray/15` to `/25`) and tonal background tinting (`bg-clay/[0.06]` — a 6% opacity wash of the accent color, used for stat grids, NDA notices, and quote cards). `transition-shadow` appears only on form inputs, animating the focus *ring* (which Tailwind implements via box-shadow), not a resting shadow.

### Named Rules
**The No-Shadow Rule.** Never add `box-shadow` for resting-state depth. If a component needs to read as "raised" or "grouped," reach for a border and/or a tonal background tint at 4–8% opacity of the nearest accent — not a shadow.

## Shapes

Radius scale, largest-to-most-used: `rounded-full` (pills, toggle, carousel dots — anything meant to read as a control), `rounded-2xl`/16px (the single largest card radius, reserved for quote callouts), `rounded-xl`/12px (stat-grid containers), `rounded-lg`/8px (the default — buttons, inputs, images, video, most cards; by far the most common value in the codebase). Nothing in the system uses a sharp (0px) corner.

One deliberate exception to "borders, not lines-as-accent": testimonial blockquotes and the SpendLight "Design implication" callouts use a 2px colored left border (`border-l-2 border-clay` or `border-sage/40`) with no background fill — this is the system's one accepted colored-rule device, reserved specifically for "this is a quoted voice or a drawn conclusion," and should not be generalized to ordinary cards or list items.

## Components

Component character: **tactile and confident** — solid fills on primary actions, a real state change on hover (not just a subtle tint shift), rings rather than default outlines on focus. This is the target for new components; existing ones lean slightly quieter (opacity-based hover) and should be nudged toward this when touched.

### Buttons
- **Shape:** `rounded-lg` (8px), no exceptions observed.
- **Primary:** `bg-clay` / `dark:bg-dark-clay`, `text-cream` / `dark:text-dark-bg`, `text-sm font-medium`, `px-5 py-2.5` (20px/10px).
- **Hover / Focus:** `hover:opacity-90`, `transition-opacity`. No focus-ring class observed on buttons specifically (inputs get one — see below); this is a gap worth closing when a button is next touched, per the "tactile and confident" direction.
- **Disabled:** `disabled:opacity-60 disabled:cursor-not-allowed`.

### Cards / Containers
- **Stat block:** `rounded-xl`, `border border-clay/20`, `bg-clay/[0.06]`, `px-5 py-6`. Big numbers in `font-serif text-clay` (use `clay-dark` in light mode per the Text-Weight Clay Rule), small caption in `text-warm-gray`.
- **Constraint / icon card:** `rounded-lg`, `border border-warm-gray/15`, `bg-cream-dark/40`, `p-5`. Icon (20px stroke, `text-clay`) above a `font-medium` title above `text-sm text-warm-gray` body.
- **Quote card:** `rounded-2xl`, `bg-clay/[0.06]`, `px-5 py-4`, quote-mark icon + italic text.
- **Notice / callout (NDA, disclosure):** `rounded-lg`, `border border-clay/20`, `bg-clay/[0.06]`, `px-4 py-3`, lock icon + text — this is the one component pattern worth extracting into a shared component wherever it repeats within a page; it should never be hand-copied twice in the same file.
- **Testimonial:** `border-l-2 border-clay` (light) / `dark:border-dark-clay`, no background fill, `pl-6`. Quote text is the peak-end moment of a case study, not body copy — set it `font-serif text-lg sm:text-xl text-charcoal leading-snug italic`, not the muted `text-warm-gray` body treatment. Attribution footer is secondary: `text-sm text-warm-gray font-medium`. Consistent across all four case studies.

### Inputs / Fields
- **Style:** `rounded-lg`, `border border-warm-gray/25`, `bg-cream` / `dark:bg-dark-surface`, `px-3.5 py-2.5`, `text-sm`.
- **Focus:** `focus:outline-none focus:ring-2 focus:ring-clay/40` — a ring, never the browser default outline, and never `outline: none` without this replacement.
- **Labels:** always persistent, positioned above the field (`block text-sm mb-1.5`) — never a placeholder standing in for a label.

### Navigation
Sticky header, `bg-cream/90 backdrop-blur-sm`, `border-b`. Active route: `text-clay font-medium` (should be `text-clay-dark` in light mode per the Text-Weight Clay Rule). Inactive: `text-warm-gray`, `hover:text-charcoal`. Mobile: hamburger toggling a slide-down panel via `max-height` transition, not a full-screen overlay.

### Hero Flip Card (signature component)
The homepage's case-study cards: a 3D flip on hover (`perspective: 1200px`, `rotateY(180deg)` on `group-hover`/`group-focus-within`), front face showing case-study media plus a small sage tag pill, back face (on `bg-charcoal`) revealing tag/company/title/impact in cream text. Touch devices get a tap-to-reveal fallback (`hover: hover` media query check) since `:hover` alone would strand the back face on mobile. This is the site's one piece of real motion personality — reserve flip-on-hover for exactly this "preview → reveal" pattern; don't reuse it for anything that isn't a two-sided reveal.

## Do's and Don'ts

### Do:
- **Do** use `clay-dark` (`#A85D3F`), not `clay`, for any light-mode text below 24px/regular-weight — the Text-Weight Clay Rule.
- **Do** convey depth with a border and/or a 4–8% accent-tint background, never a `box-shadow`.
- **Do** keep the monospace face (IBM Plex Mono) exclusive to labels/eyebrows/data — never body prose.
- **Do** set explicit `width`/`height` (or an equivalent aspect-ratio reservation) on every image, and `loading="lazy"` below the first viewport.
- **Do** wire `usePrefersReducedMotion` into any new autoplaying video or GIF, matching the static-fallback pattern already used across the site.
- **Do** add `text-balance` to every `h1` — real page titles wrap unpredictably across viewports, and an orphaned single word on its own line is a genuine typographic defect, not a hardcoded-`&nbsp;` problem. Applied sitewide (home, About, Contact, all four case studies).

### Don't:
- **Don't** add a fourth font family or a bold (700+) weight — the hierarchy is built from family switches, not weight jumps.
- **Don't** use `md:`/`lg:` breakpoints; the system's one responsive decision is `sm:`. Wide viewports get width caps, not new layout logic.
- **Don't** generalize the 2px colored left-border device beyond blockquotes and "design implication" callouts — it marks a quoted voice or a drawn conclusion, not a generic card accent.
- **Don't** mix `clay` and `sage` as co-equal accents in one component. Sage marks synthesis; clay marks everything else.
- **Don't** hand-copy a notice/callout block twice in the same file — extract it locally the moment it repeats.
