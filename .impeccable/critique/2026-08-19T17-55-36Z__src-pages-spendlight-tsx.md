---
target: spendlight page
total_score: 20
max_score: 24
na_heuristics: 5,7,9,10
p0_count: 0
p1_count: 2
timestamp: 2026-08-19T17-55-36Z
slug: src-pages-spendlight-tsx
---
Method: dual-agent (A: a9bdddf29cbb1aa53 · B: abc20f8d86463a2dc)

Re-critique after the reorder/disclosure/sticky-nav pass. Prior run: 14/20 (70%, 5 heuristics applicable).

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | Stat grid/dl visible immediately; JumpNav has no active-section ("you are here") highlight while scrolling |
| 2 | Match Between System and Real World | 4/4 | Plain language, ledger metaphor consistent throughout |
| 3 | User Control and Freedom | 3/4 | JumpNav is a real improvement but anchors only 5 of 11 live sections, with no signal it's a curated subset |
| 4 | Consistency and Standards | 3/4 | Matches sibling case studies structurally; JumpNav is a pattern unique to this page, untested elsewhere |
| 5 | Error Prevention | n/a | No user input on this page |
| 6 | Recognition Rather Than Recall | 4/4 | Insight numbering, disclosure button state text, nav labels — nothing to memorize |
| 7 | Flexibility and Efficiency of Use | n/a | Static read-mode article |
| 8 | Aesthetic and Minimalist Design | 3/4 | Genuinely improved, but Research still front-loads 4 full insight blocks (203 words) at the page's density valley |
| 9 | Error Recovery | n/a | No error states |
| 10 | Help and Documentation | n/a | Portfolio article, not a task-based app |
| **Total** | | **20/24 (83%)** | **Good, approaching Excellent** |

*Note on comparability:* the prior run scored 5 heuristics applicable (14/20); this run scores 6 (20/24) — heuristic 1 flipped from n/a to applicable now that there's an actual nav state to evaluate. Different denominators, so this isn't a strict like-for-like number, but the qualitative movement (70% → 83%) reflects real, verified fixes below.

## Design Specificity Verdict

**LLM assessment:** Still grounded, not category-interchangeable — the bonsai mechanic, real quotes, the photographed affinity board, and the A/B-tested value props are all irreplaceable specifics. No change here; this was never the problem.

**Deterministic scan:** `detect.mjs` → `[]`, clean. As before, the real issues live outside what a token/pattern detector checks.

**Manual structural evidence (Assessment B):** 735 lines, **11 live sections** (a 12th "Final Product" section exists but is commented out — correctly not live). 9 rendered media elements. Longest unbroken text run that *terminates in a visual break*: ~274 words (hero → Problem image). Longest run overall: **365 words, and it does NOT terminate in a visual break — it's the tail of the document.** The last visual element on the page is the 4th IterationGrid image inside "Testing & iteration"; everything after that (Testimonial + How I measured success + What this says about how I work) runs to the end with zero images.

**Visual overlays:** Unavailable, same as before — no browser tool this session.

## Overall Impression

The reorder pass worked — Outcome verifiably moved to position 2, the insight-count bug is fixed everywhere it was previously wrong, and the disclosure toggle is a real, correctly-built accessible pattern. But two things slipped in during the same pass: a leftover "five" in the affinity-board alt text that now contradicts its own caption two lines below ("six"), and a page-wide dark-mode bug where `dark-clay` and `dark-sage` are the exact same hex value — silently collapsing the one semantic color distinction DESIGN.md built specifically for this page's insight blocks. Both assessments independently converged on the Research section still being the density valley, and the page still ending on 365 words of unbroken text after its last visual.

## What's Working

1. **Outcome-first fix verified working end-to-end.** Outcome is now section 2 of 11, immediately after Project Snapshot — a confirmed, real compliance win against PRODUCT.md's skim-fast principle.
2. **Progressive disclosure is a correctly-built pattern**, not just a CSS toggle: labeled button, `aria-expanded`, rotating chevron, 4 shown / 2 behind "Show 2 more."
3. **The insight-count bug from the last critique is genuinely fixed** — "6 insights" is now correct everywhere it was previously wrong ("4 insights" and "four concrete research insights" both corrected).
4. **JumpNav's sticky offset math is exactly correct** — both assessments independently verified `top-[69px] sm:top-[61px]` precisely matches SiteHeader's real rendered height at both breakpoints. No overlap, no collision, even accounting for the mobile menu's expanded state.

## Priority Issues

**[P1] `dark-clay` and `dark-sage` are the identical hex value (`#92A683`), silently breaking the page's core semantic device.** Verified directly in `src/index.css` (lines 24-25) and `DESIGN.md` (lines 16-17) — not a hallucinated finding. This is the one page DESIGN.md's "One Accent Rule" was written for (clay = action, sage = synthesis), and in dark mode the two render identically: `InsightBlock`'s numbered index (clay) sits directly beside its "Design implication" label (sage) in the same component, and they're now the same color. **Fix:** differentiate `dark-sage` from `dark-clay` in the token file — this is a sitewide token change, not SpendLight-local, so it touches every page using either color in dark mode. → `/impeccable colorize` or a direct token fix

**[P1] The research-synthesis image's alt text contradicts its own caption two lines below.** Line 525's `alt` says "five themed clusters"; line 529's `figcaption`, on the same `<figure>`, says "six themes below." This is the exact same class of bug as the "4 insights" vs. "6 shown" contradiction fixed last round — a leftover from when the affinity board had 5 sections, before insights 05-06 were added to the case study text, never updated. **Fix:** correct the alt text to "six themed clusters." → `/impeccable clarify`

**[P2] Research is still the density valley, at the worst position in the read.** 4 full insight blocks (~203 words) render by default at lines 533-537, mid-page, exactly where a fast-skimming reader is most likely to disengage before reaching Testimonial. **Fix:** consider dropping the default to 3 visible insights, or trimming insight body copy. → `/impeccable distill`

**[P2] JumpNav has real execution gaps.** It anchors only 5 of 11 sections (Constraints, IA & Screens, Testing, How I Measured Success, and What This Says About How I Work have no shortcut) with no signal that it's a curated subset rather than a full table of contents. Separately, both the nav links and the "Show 2 more insights" button fall under the 44×44px touch-target minimum — text-only links with no per-link padding. **Fix:** either add a visual/textual cue that JumpNav is curated ("Jump to:"), or accept the partial coverage as intentional and pad the tap targets regardless. → `/impeccable adapt`

**[P2] The page still ends on 365 words of unbroken text after its last visual.** The last image on the page is buried inside the Testing section's IterationGrid; Testimonial, How I Measured Success, and What This Says About How I Work — the emotional peak and the entire closing arc — run to the end with zero visual support. This is the same peak-end concern from the last critique, now precisely quantified. **Fix:** not necessarily another image — could be as simple as visual treatment on the testimonial itself, or accepting this is a legitimate place for the page to just read as prose. → `/impeccable layout`

## Persona Red Flags

**Hiring manager (PRODUCT.md's defined persona, skimming fast):** If she scrolls top-down (most first-time visitors, per Assessment A), Outcome now arrives at section 2 — the fix genuinely works for this path. If she uses JumpNav instead, "Testimonial" is the highest-value link (skips ~9 sections straight to social proof) — a real win. But the stat block she sees in the first 3 seconds still leads with **process** metrics ("6 weeks / 6 insights"), not an outcome number like AllStripes' "95%+ reduction" — inherent to a validated-concept project, not fixable without fabricating a metric PRODUCT.md doesn't support, but worth naming as a structural tradeoff of this case study specifically.

## Minor Observations

- The commented-out "Final Product" placeholder (lines 714-731) is correctly non-live, with clear inline instructions for filling it in later — good hygiene, no issue.
- "Weeks 1-2" style labels in "My approach" are decorative spans, not real headings (same pattern as the "01" insight index numbers) — consistent with the established design language, not a defect.
- Testing section's paired "what worked" (sage checks) / "what we improved" (clay-dark arrows) sits in one two-column composition using both accents as visually co-equal — doesn't hard-violate the One Accent Rule (they're separate lists, not one card) but reads close to the line the rule warns about.
- Disclosure button (line 550) has `aria-expanded` but no `aria-controls` linking it to the collapsible content's `id` — the standard disclosure-widget pattern is incomplete.

## Questions to Consider

1. The stat block leads with "6 weeks / 6 insights" — process metrics, not proof. Given PRODUCT.md won't let you fabricate an outcome number for a validated-but-unshipped concept, is there a truthful *framing* of those same two numbers that reads more like proof at a 3-second glance?
2. If JumpNav is worth having at 735 lines, is "page length" or "research density" the real threshold for when a case study earns one — and should that become a documented DESIGN.md pattern rather than a one-off?
3. Testimonial is the emotional peak, but two more analytical sections follow it before the page ends. Does closing on "What this says about how I work" actually serve the hiring-manager persona better than ending on the testimonial itself would?
