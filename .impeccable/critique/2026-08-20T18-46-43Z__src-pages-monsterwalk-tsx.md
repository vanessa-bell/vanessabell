---
target: monster walk case study
total_score: 22
max_score: 28
na_heuristics: 5,9,10
p0_count: 1
p1_count: 2
timestamp: 2026-08-20T18-46-43Z
slug: src-pages-monsterwalk-tsx
---
Method: dual-agent (A: a96c66031a5f4145c · B: ac7edff0f8bbbc509) - first critique of this page, real Puppeteer/Chrome verification.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Sticky nav correctly highlights active state. |
| 2 | Match System / Real World | 4 | Plain, jargon-free research language throughout. |
| 3 | User Control and Freedom | 3 | Standard affordances only, nothing broken. |
| 4 | Consistency and Standards | 2 | Two confirmed divergences from the documented system plus the heading-semantics gap. |
| 5 | Error Prevention | n/a | No forms/inputs. |
| 6 | Recognition Rather Than Recall | 4 | Icon+label constraint cards, numbered research insights. |
| 7 | Flexibility and Efficiency | 3 | N/A-heavy for a read-mode page. |
| 8 | Aesthetic and Minimalist Design | 3 | Clean and on-brand, but hero-to-metadata handoff feels flatter than sibling pages. |
| 9 | Error Recovery | n/a | No error states possible. |
| 10 | Help and Documentation | n/a | Not applicable to a case study. |
| Total | | 22/28 | Good (79%) |

## Design Specificity Verdict

Specific and evidence-grounded at the sentence level - but structurally generic relative to its own siblings. It's the one case study of four that doesn't give its headline metric (100%, the strongest number on the site) a distinct visual moment.

## Reconciling the two assessments

Assessment A said heading semantics were fully correct. Assessment B's grep evidence contradicted that - verified by orchestrator: the three constraint-card titles render as <p className="font-medium...">, not <h3>, while the near-identical card-title pattern two sections earlier and the research-insight headings correctly use real <h3>. Same bug class just fixed on SpendLight's constraint cards.

## Priority Issues

[P0] Headline metric has no visual weight, contradicting the site's own skim-first principle
- Why it matters: AllStripes, HealthTech, and SpendLight all place a stat block directly under the hero, before the metadata grid. Monster Walk has none - its 100% figure is the 6th of 6 small cells in a plain dl.
- Fix: Add the same stat-block component the other three pages use.
- Suggested command: /impeccable layout

[P1] Image/caption mismatch on the "original flow" figure
- Why it matters: old-welcome-back-flow.jpg is a 5-screen annotated composite, but alt/caption describe it as one static panel.
- Fix: Rewrite alt/caption to describe the actual annotated flow.
- Suggested command: /impeccable clarify

[P1] That same image is illegible on mobile
- Why it matters: at 375px the 5-phone composite renders at ~65px per phone - no on-screen text readable in any frame.
- Fix: Stack/carousel below sm:, or drop to 2-3 representative frames on mobile.
- Suggested command: /impeccable adapt

[P2] Constraint grid uses 3 columns, diverging from DESIGN.md's documented 2-column pattern
- Why it matters: DESIGN.md states constraint-card grids stay grid-cols-2 throughout; SpendLight's identical component does. No documented reason for the divergence here.
- Fix: Match the system (2-col) or document the exception in DESIGN.md.
- Suggested command: /impeccable layout

[P3] Minor copy issues: missing article ("the design process"), a caveat repeated three times across two sections.

## What's Working

1. All 7 images have exactly-correct width/height attributes matching the real files on disk.
2. The numbered research-insight section is genuinely well-crafted and scannable.
3. Testimonial styling matches the sitewide spec exactly, in both themes.

## Persona Red Flags

Time-pressed hiring manager: has to actively read a 6-cell grid to find "100%."
Mobile hiring manager: hits the illegible flow image, has to trust an inaccurate caption instead of verifying visually.
Design-literate reviewer comparing all four case studies: notices Monster Walk is structurally the odd one out.

## Minor Observations

- Quote-string formatting inconsistent between the dl Impact field and the Outcome list (cosmetic).
- The two outcome quote images have alt text that's just the raw quote with no speaker attribution.

## Questions to Consider

1. If the stat-block pattern exists so a skimming reader sees the number first, why does the page built around the strongest figure on the site skip it?
2. Every other case study ends on Testimonial as the peak-end moment; this one puts "How I measured success" after it. Deliberate, or should it match the other three?
