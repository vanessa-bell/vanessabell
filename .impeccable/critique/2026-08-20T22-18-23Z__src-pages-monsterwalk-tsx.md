---
target: monster walk case study
total_score: 26
max_score: 32
na_heuristics: 9,10
p0_count: 1
p1_count: 2
timestamp: 2026-08-20T22-18-23Z
slug: src-pages-monsterwalk-tsx
---
Method: dual-agent (A: a014b12bf55a4f227 · B: a7ad0fbf54f9ad33f) - round 2, real Puppeteer/Chrome verification.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | JumpNav highlighting works on gradual scroll/click, fails on fast/instant scroll to the finale. |
| 2 | Match System / Real World | 4 | Game screenshots, habit-loop diagram, plain language ground abstract claims. |
| 3 | User Control and Freedom | 4 | Lightbox close paths and focus handling all verified working. |
| 4 | Consistency and Standards | 3 | Components match the system; docked for Outcome/How-I-measured content duplication. |
| 5 | Error Prevention | 2 | The n=4 vs 5-8 vs 5-responses mismatch is exactly what this heuristic exists to catch. |
| 6 | Recognition Rather Than Recall | 4 | JumpNav removes need to remember section order. |
| 7 | Flexibility and Efficiency | 3 | Lightbox 1600px cap still overflows at reference desktop width and is untamed on mobile. |
| 8 | Aesthetic and Minimalist Design | 3 | Strong system adherence; docked for redundant bulk in Outcome. |
| 9 | Error Recovery | n/a | No error states on static content. |
| 10 | Help and Documentation | n/a | Not applicable to a case study. |
| Total | | 26/32 | Good (81%) |

## Reconciling the two assessments

Both agree the page is mechanically solid: build/lint/typecheck/detector all clean, zero console errors, zero broken images, all 14 images match coded dimensions exactly. Assessment B's apparent grep failures (Quote count of 1, no href="#" matches) were false alarms from pattern-matching data-driven JSX rather than literal strings - orchestrator confirmed the actual wiring is correct.

## Priority Issues

[P0] Research participant counts don't reconcile across the page
- Verified directly: "My approach" cites "5-8 participants" (recruitment target from the study plan); "How I measured success" cites "n=4" (actual response count); the nav-path chart caption says "5 responses" (a different question's response count, normal Maze attrition).
- Why it matters: not actually a factual error, but a careful reader has no way to know that and will read it as inconsistency - exactly the persona this page's research-rigor claim exists to convince.
- Fix: add a small clarifying phrase reconciling the numbers.

[P1] Outcome and How I Measured Success repeat the same four facts almost verbatim
- Both sections state 4.8/5, 4.3/5, "fun/supportive/motivating," and "delivered to Talofa Games" in immediate succession, just reworded.
- Why it matters: doubles a content chunk right before the peak-end sequence.
- Fix: trim Outcome to headline facts only; let How I Measured Success carry the unique material.

[P1] JumpNav's "Final Screens" link never activates on a fast/instant scroll to the bottom
- Confirmed programmatically at both viewports: scrollTo(0, document.body.scrollHeight) lands at max-scroll but aria-current stays on #testimonial. Works on gradual scroll, fails on fling/scrollbar-drag/End-key jumps.
- Why it matters: this is the page's true finale section; nav failing to confirm arrival on a real access pattern is a functional bug in newly-ported code.
- Fix: fallback - if scroll position is within ~2% of max scroll, force-activate the last link.

[P2] Nested quotation marks render ambiguously in the streak quote
- The quote string contains embedded straight double-quotes, wrapped again by the Quote component - four total double-quote glyphs with no visual distinction. Same bug class already fixed once on SpendLight.
- Fix: switch inner phrase to single quotes.

[P2] Lightbox still overflows the viewport it was supposed to fit
- The 1600px cap still overflows 1440px by 160px, and is completely unconstrained on mobile (1600px fixed on a 375px viewport).
- Fix: add a max-width: 100vw ceiling so the cap becomes responsive.

## What's Working

1. Research narrative well-scaffolded structurally - unmoderated Maze -> moderated 1:1s -> concept study -> validation, each with its own artifact.
2. The deliberate gap in research finding 02 (left unquoted) is a mature editorial signal the other three quotes are real.
3. Final Screens 3-image grid renders cleanly at both viewports/themes, even sizing, no stretching.

## Minor Observations

- Three new images have solid white backgrounds baked in from source tool screenshots - stark against dark mode, not code-fixable without re-cropping.
- lo-fi-daily-return-flow.jpg has a visible stock-photo watermark under the strawberry icon.

## Questions to Consider

1. Does this much granular research detail serve the page, or would one clearly-labeled number per claim reduce mismatch surface area?
2. Now that Testimonial and Final Screens both compete for peak-end weight, does cutting Outcome's redundant bullets give both remaining beats more room?
