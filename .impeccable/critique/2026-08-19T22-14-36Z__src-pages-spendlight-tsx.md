---
target: spendlight page
total_score: 25
max_score: 28
na_heuristics: 5,9,10
p0_count: 1
p1_count: 2
timestamp: 2026-08-19T22-14-36Z
slug: src-pages-spendlight-tsx
---
Method: dual-agent (A: aa4808d6b2828d63d · B: a0e6918380ef15e29)

Third pass, after the Outcome/Key Screens reorder. Prior runs: 14/20 (70%) → 20/24 (83%).

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | JumpNav active-highlight goes stale through "IA & Screens" and "Testing" (unanchored) — freezes on "Research" |
| 2 | Match Between System and Real World | 4/4 | Icon-to-concept mapping legible without a legend |
| 3 | User Control and Freedom | 4/4 | Disclosure toggles cleanly, no traps |
| 4 | Consistency and Standards | 3/4 | Constraint-card titles break DESIGN.md's own documented h3 rule |
| 5 | Error Prevention | n/a | No inputs on this page |
| 6 | Recognition Rather Than Recall | 4/4 | JumpNav always visible with active state |
| 7 | Flexibility and Efficiency of Use | 4/4 | JumpNav serves skimmers, disclosure serves readers — same content, two paths |
| 8 | Aesthetic and Minimalist Design | 3/4 | Real progress (3-of-6 default insights), but still the longest page on the site and closes on a dense text-only tail |
| 9 | Error Recovery | n/a | No error states |
| 10 | Help and Documentation | n/a | Portfolio article |
| **Total** | | **25/28 (89%)** | **Good, approaching Excellent** |

## Design Specificity Verdict

Unchanged and confirmed again: grounded, not category-interchangeable. Named A/B variants, real founder attribution, verbatim idiosyncratic quotes, and the bonsai mechanic referenced consistently across sections all hold up under independent re-review.

## Overall Impression

**The peak-end fix didn't fully land — both assessments independently found the same thing.** The code comment at the Outcome section says "moved to the end... Key Screens carries the taste and craft scan." But tracing actual document order: Outcome → Testimonial → **How I measured success**, and that last section is a plain bulleted recap with zero visuals — a confirmed 273-word unbroken text run from the last image (Key Screens) all the way to the end of the document. The intent was right; the execution stopped one section short. Assessment B also flagged that AllStripes has the identical pattern (Result/Testimonial → "How I measured success" last), suggesting this is a sitewide habit, not a SpendLight-specific slip.

## What's Working

1. Research insights remain genuinely evidence-linked — quote → named design implication, the strongest proof of the site's research-rigor claim.
2. The 3-then-3 disclosure + JumpNav combination is a well-executed pair of cognitive-load fixes serving two different reading modes without duplicating content.
3. Cross-page consistency held up under re-review: testimonial treatment, `text-balance` h1s, and the stat-block pattern are all confirmed intact and correct.

## Priority Issues

**[P0] "How I measured success" is the true trailing section, not Testimonial or Key Screens.** Confirmed by both assessments: a 273-word, zero-visual run closes the page. **Fix:** move "How I measured success" ahead of Testimonial (or fold its 3 bullets into Outcome's existing list), so Testimonial is the actual closing beat.

**[P1] Constraint-card titles use `<p>`, not `<h3>` — violates DESIGN.md's own documented rule.** DESIGN.md explicitly assigns constraint-card titles to the h3 level; the file follows this correctly for research-insight headings but not here. A screen-reader user navigating by heading skips all 4 constraint titles entirely. → `/impeccable clarify`

**[P1] JumpNav's active-highlight goes silently stale for two of the longest sections on the page.** The IntersectionObserver only tracks the 5 anchored sections; while scrolling through "IA & Screens" or "Testing & iteration" (no ids), the highlight freezes on "Research," misrepresenting position for a substantial stretch. → fix the observer logic

**[P2] Key Screens — the stated "taste and craft" scan — sits at position 9 of 10.** This is the real tension worth naming, not just a bug: you told me the strategy is "hiring manager scans for taste and craft first, then reads if it passes." A linear top-to-bottom reader hits ~500 lines of process and research before any finished-product image appears. JumpNav is a real escape hatch to it, but nothing in the hero signals it exists for that purpose.

**[P3] Sage used in a third, undocumented role.** The Testing section's "what worked" checkmarks use sage, beside a clay-colored arrow list in the same section. DESIGN.md restricts sage to two named roles. Not a hard violation (separate list columns), but a drift worth a deliberate call.

## Minor Observations

- The Figma prototype link has correct `target="_blank" rel="noopener noreferrer"` but no screen-reader "(opens in new tab)" indicator — SiteHeader's own LinkedIn link has one; this is an inconsistent pattern within the same codebase.
- Hero stat block claims "6 insights," but only 3 render by default — a skimmer who never clicks "Show 3 more" sees the claim without seeing it substantiated on-page.
- Confirmed fixed from the last two runs: dark-clay/dark-sage are distinct, the affinity-board alt/caption agree on "six," and the color-palette figure is correctly narrowed to `max-w-sm`.
- Scroll-margin math checks out: ~25-27px of buffer above the combined sticky-header + jump-nav stack at both breakpoints — the two mechanisms (scroll anchor and active-link detection) were tuned together correctly.

## Questions to Consider

1. Key Screens is your strongest "scan fast, see craft" asset, but it's buried at position 9. Is JumpNav's discoverability enough, or does the hero need to signal "there's finished work below" more directly?
2. "How I measured success" trails the testimonial on both SpendLight and AllStripes but not HealthTech — worth fixing sitewide in one pass rather than page by page?
3. Is the sage-on-checkmarks drift intentional enough to write into DESIGN.md as a third sanctioned role, or should it move to clay for consistency?
