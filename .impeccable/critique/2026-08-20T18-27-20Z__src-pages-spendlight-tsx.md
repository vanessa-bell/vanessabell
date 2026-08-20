---
target: spendlight case study
total_score: 23
max_score: 24
na_heuristics: 5,9,10
p0_count: 0
p1_count: 0
timestamp: 2026-08-20T18-27-20Z
slug: src-pages-spendlight-tsx
---
Method: dual-agent (A: a4b689127ab55c319 · B: a04a5b2a583441f01) — pre-publish readiness check, real Puppeteer/Chrome verification.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | JumpNav, accordion chevron, lightbox states all clear. |
| 2 | Match System / Real World | 4 | Ledger metaphor, plain research language, real named testimonial. |
| 3 | User Control and Freedom | 4 | Lightbox close paths and focus return all verified working. |
| 4 | Consistency and Standards | 3 | Docked for the journalling/journaling slip and a heading-semantics gap vs. DESIGN.md's own spec. |
| 5 | Error Prevention | n/a | No form inputs. |
| 6 | Recognition Rather Than Recall | 4 | JumpNav labels, italic captions, no reliance on memory. |
| 7 | Flexibility and Efficiency | 3 | No quick back-to-top on a long page. |
| 8 | Aesthetic and Minimalist Design | 4 | Disciplined, matches the system tightly. |
| 9 | Error Recovery | n/a | No error states applicable. |
| 10 | Help and Documentation | n/a | Static case study. |
| Total | | 23/24 | Good (96%) |

## Design Specificity Verdict

High - ledger metaphor, accent-color role discipline, accordion payoff-preview pattern all specific and intentional, matching DESIGN.md closely after six prior rounds of polish.

## Build / Console / Network Check (the actual pre-publish gate)

tsc, eslint, detect.mjs, and npm run build all clean/exit 0 - production build succeeds. Zero JS errors, zero React warnings, zero non-2xx responses, zero broken image requests across all 12 static assets (cross-referenced against public/spendlight/ on disk). The Figma external link correctly pairs target="_blank" with rel="noopener noreferrer". All 13 img elements have real alt text in every code path that actually renders.

## Fixed This Round (found and corrected before this report was finalized)

1. "journalling" -> "journaling" spelling inconsistency in the Outcome section's finale paragraph (9 other instances on the page already used the correct spelling).
2. Nested identical-glyph quotation marks in insight 05's second quote - the Quote component wraps every string in its own quote marks, and this string also contained an embedded "the spender" in straight double-quotes, rendering as an ambiguous double-quote collision. Switched the inner pair to single quotes.
3. bonsai-growth-celebration.jpg aspect-ratio mismatch: code declared height={1630} but the actual file on disk is 786x810 - a 2x-too-tall declared box causing visible vertical stretching via object-fit: fill on the case study's emotional-payoff image. Corrected to height={810}; verified rendered aspect now matches natural aspect exactly (0.971 vs 0.970).

## Remaining Priority Issues (not fixed - genuine scope calls)

[P2] Research-insight headings and constraint-card titles aren't real heading elements
- Why it matters: DESIGN.md explicitly documents these as h3-tier content, but the code renders them as a plain span/p. A screen-reader user navigating by heading skips all five insights and all four constraint cards entirely - ironic on a page whose core claim is research rigor.
- Assessment A's own verdict: pre-existing (not a regression), accessibility-only (no sighted-user or console impact), does not warrant holding today's publish.

[P3] Hero video weight (4.0MB, autoplaying above the fold)
- Why it matters: meaningful above-the-fold payload on a portfolio page that may be opened on mobile data.
- Not new this round, not blocking.

## What's Working

1. Accordion closed-state preview genuinely earns its keep - verified at both breakpoints, line-clamp-1 truncation reads cleanly.
2. Focus-trap lightbox works correctly end-to-end - focus to close button on open, Tab trapped, Escape/click-outside both dismiss, focus returns to the exact trigger on close.
3. Reduced-motion fallback is real, not just documented - verified via prefers-reduced-motion emulation that video swaps for the static image.

## Persona Red Flags

Accessibility-literate reviewer: hits the h3 gap directly when tabbing through headings.
Careful copy-editor: would have caught "journalling" in the first 10 seconds of reading the Outcome section (now fixed).
Fast-skimming mobile hiring manager: never opens accordions, so never saw the nested-quote issue, but does read the Outcome paragraph (now fixed).

## Minor Observations

- Quote's attribution prop is wired but never populated in the insights data - dead code, harmless.
- og:image (hero.png, 948KB) is sizeable for a social-preview asset; not a same-day concern.

## Questions to Consider

1. If "journalling" sat in a collapsed accordion instead of the always-visible Outcome paragraph, would it still have surfaced in round 6's proofread? Worth a standing pre-publish grep habit.
2. Was the span/p choice in InsightBlock and the constraint grid a deliberate call, or drift from DESIGN.md's own h3 spec?
3. Has this page been tested on a throttled connection given the "Speed = Trustworthiness" principle and the 4MB hero video?

## Publish-Readiness Verdict

Ship today. Build/lint/typecheck/detector all clean, production build succeeds, zero console errors, zero broken assets, zero missing security attributes. The three real defects found this round (spelling inconsistency, colliding quote marks, stretched image) were all fixed and verified before this report was finalized. The one remaining gap (P2, heading semantics) is real but pre-existing, accessibility-scoped, and explicitly not a blocker per the reviewing agent's own judgment - appropriate as the first item in a future round rather than something to hold today's launch for.
