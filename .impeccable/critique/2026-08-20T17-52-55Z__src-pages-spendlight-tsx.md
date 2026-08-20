---
target: spendlight case study
total_score: 22
max_score: 28
na_heuristics: 5,9,10
p0_count: 1
p1_count: 1
timestamp: 2026-08-20T17-52-55Z
slug: src-pages-spendlight-tsx
---
Method: dual-agent (A: a611a413237fe2172 · B: ab2deac14cb276011) — real Puppeteer/Chrome verification again this round.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | JumpNav highlight correct in principle, invisible in practice for the back half of the page on mobile. |
| 2 | Match System / Real World | 4 | No issues found. |
| 3 | User Control and Freedom | 2 | Three close mechanisms work, but no focus containment - keyboard users lose control after Tab. |
| 4 | Consistency and Standards | 4 | No new violations; dark mode/spacing/accent rules all hold. |
| 5 | Error Prevention | n/a | No forms/destructive actions. |
| 6 | Recognition Rather Than Recall | 3 | Right intent, execution gap (see P2). |
| 7 | Flexibility and Efficiency | 3 | Zoomable images are a real win; mobile pan friction costs a point. |
| 8 | Aesthetic and Minimalist Design | 4 | System respected, no clutter. |
| 9 | Error Recovery | n/a | No error states. |
| 10 | Help and Documentation | n/a | Static case study. |
| Total | | 22/28 | Good (79%) |

## Design Specificity Verdict

LLM assessment: Grounded - every finding this round is backed by a measured getBoundingClientRect(), a real Tab-sequence capture, or a pixel-level crop of the research-synthesis image compared against page copy.

Deterministic scan: CLI detect.mjs clean ([]). Browser runtime detector found the same recurring, already-triaged false positives as prior rounds (kicker-above-heading, container-capacity line-length). Refactor-specific checks all passed: exactly one lightbox state hook exists, every image file referenced the expected number of times, insight numbering is a clean 01-05 sequence, dialog-count check confirmed only one [role="dialog"] ever exists regardless of trigger sequence.

## Round 5 Re-Verification

Everything from round 5 holds up under real interaction testing: insight order, the dual-lightbox refactor (no stale-state leak, all three close paths work), the 2x2 Testing & Iteration grid (verified via rect measurement at both breakpoints, all four images load), and the JumpNav fade mask.

## Overall Impression

The heavy refactor from last round held together well structurally - no regressions in the mechanics. But this round surfaced a real evidence-sourcing error that predates the refactor (insight 05 citing a quote from the wrong affinity-board cluster) and a genuine accessibility gap in the new lightbox (no focus trap) that this is the first round to actually catch via real keyboard testing.

## What's Working

1. The dual-lightbox refactor is solid at the state-management level - one shared object, verified under real clicks.
2. The 2x2 grid is clean and correctly semantic at both breakpoints with no broken assets.
3. Contrast holds up under direct measurement - sage-on-cream and dark-sage-on-dark-bg both clear AA comfortably (5.31:1 and 6.79:1).

## Priority Issues

[P0] Insight 05's quote is sourced from the wrong affinity-board cluster
- Why it matters: "AAAAH constant anxiety" sits under Theme 2 (Budgets provoke anxiety) on the actual board, not Theme 5 (Money carries identity & relationship weight), which insight 05 is supposed to represent. The other quote doesn't trace to Theme 5's real stickies either. Cannot fully self-resolve without the original transcripts.
- Fix: Swap in real, board-sourced material for insight 05 using Theme 5's actual quoted fragments; confirm with the site owner whether the other line needs source verification too.
- Suggested command: /impeccable clarify

[P1] The lightbox has no focus trap - Tab escapes into invisible background content
- Why it matters: aria-modal="true" promises focus containment; it isn't delivered. A keyboard-only user opening the lightbox and pressing Tab lands in six background SiteHeader links buried under the backdrop.
- Fix: Move focus to the close button on open, trap Tab/Shift+Tab within the dialog, return focus to the trigger on close.
- Suggested command: /impeccable harden

[P2] JumpNav's active-link highlight goes off-screen on mobile for the back half of the page
- Why it matters: Scrolling to Testimonial/Outcome correctly sets aria-current, but the highlighted link sits entirely outside the visible 375px scroll container with nothing to auto-scroll it into view - defeating JumpNav's orientation purpose exactly where it matters most.
- Fix: On activeHref change, scroll the active link into view within the nav's own scroll container.
- Suggested command: /impeccable adapt

[P3] Key Screens/prototype lightbox requires horizontal panning to see the whole image on mobile
- Why it matters: Somewhat inherent to the real-zoom behavior requested earlier - capping the image would recreate the small thumbnail and defeat the point. Optional polish, not a bug.
- Fix: Leave pan behavior as-is; optionally add a one-time "swipe to see all four" hint on mobile.
- Suggested command: /impeccable delight (optional)

## Persona Red Flags

Skimming hiring manager: Glances at sticky nav on mobile near the end of the page, sees nothing highlighted.

Research-literate reviewer: Cross-references the board against insight 05, finds the cited quote sourced from a different cluster.

Keyboard-only/screen-reader user: Opens a lightbox, tabs to explore, lands in an invisible background link stack instead of dialog controls.

## Minor Observations

- The board image's sticky-note "(NEW)" workshop tags are only visible at full zoom, not user-facing at normal resolution.
- Three unreferenced files sit in public/spendlight/ (No-Spend Reflection Modal.jpg, final-reflection.jpg, spendlight-palette.jpg) - harmless leftovers.

## Questions to Consider

1. If insight 05's quotes don't trace to Theme 5, was the round-5 renumbering verified quote-by-quote, or only at the heading-title level?
2. Now that the page has two independent lightboxes, is it worth extracting a shared Lightbox component with the focus trap built in once?
3. Is a horizontally-scrolling JumpNav still the right pattern at six sections, or would an always-fully-visible affordance serve mobile orientation better?
