---
target: spendlight case study
total_score: 23
max_score: 28
na_heuristics: 5,9,10
p0_count: 0
p1_count: 2
timestamp: 2026-08-19T23-45-17Z
slug: src-pages-spendlight-tsx
---
Method: dual-agent (A: a94046f1ab9003428 · B: af3fa5cfea97cf0a5) — real Puppeteer/Chrome screenshots and DOM measurements this round, not source-only.

## Design Health Score

Mode: Read/Persuade/Experience hybrid static case-study page. Heuristic 7 (Flexibility/Efficiency) is scored this round rather than marked n/a — JumpNav is a real efficiency shortcut for a returning/skimming reader, which makes it fair game, and the measured mobile discoverability gap directly undermines it.

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | JumpNav active-state highlighting confirmed working via screenshot. |
| 2 | Match System / Real World | 4 | Ledger/notebook language consistent throughout. |
| 3 | User Control and Freedom | 3 | Docked for the JumpNav discoverability gap limiting real control at common widths. |
| 4 | Consistency and Standards | 3 | Docked for the five/six-theme image-vs-caption contradiction. |
| 5 | Error Prevention | n/a | Static read-only page, nothing destructive. |
| 6 | Recognition Rather Than Recall | 4 | Numbered insights, sticky JumpNav, persistent headers. |
| 7 | Flexibility and Efficiency | 2 | JumpNav-as-shortcut undermined by the mobile discoverability failure. |
| 8 | Aesthetic and Minimalist Design | 4 | Ledger aesthetic held rigorously, confirmed across every screenshot. |
| 9 | Error Recovery | n/a | No error states exist. |
| 10 | Help and Documentation | n/a | Static content. |
| **Total** | | **23/28** | **Good (82%)** |

Round 4 scored 22/24 with heuristic 7 marked n/a — this round's 23/28 is not directly comparable (different heuristic set scored).

## Design Specificity Verdict

**LLM assessment**: Still earns its research-notebook identity — accents stay role-locked, hierarchy holds, no stray shadows. One real crack this round: an evidence image's own baked-in text contradicts the page copy sitting directly beneath it, which is exactly the kind of failure this page can least afford given "research rigor" is the stated differentiator.

**Deterministic scan**: CLI `detect.mjs` returns `[]` (clean) — but the browser runtime detector (real rendered DOM, injected live) found 13 anti-patterns at desktop / 2 at mobile. Verified the two suspicious ones directly:
- `gradient-text` — confirmed false positive. Grepped the entire `src/` tree for `bg-gradient`/`background-clip`/`bg-clip-text` — zero matches anywhere. Nothing to fix.
- `kicker-above-heading` (flagging "Case Study" above the h1) — confirmed false positive. DESIGN.md explicitly documents this eyebrow/kicker as an intentional named typographic role used identically across every case-study page.
- `line-length` at ~206 chars/line (3x) — likely a container-capacity measurement (full-bleed figcaptions have no max-width of their own), not actual wrapped text — captions are short single-line sentences that never approach that length in practice.
- `line-length` at 87-97 chars/line (8x) — corroborates round 4's own finding that `text-sm` content sits above the 75ch ideal at the current column width. Already known, already judged systemic-and-accepted, not a new issue.

The CLI-vs-browser gap is expected methodology (CLI reads JSX source; browser detector sees fully-rendered, computed CSS), not itself a defect.

## Overall Impression

Round 4's fixes hold up well under real measurement — the three-tier width system (608px prose -> 960px evidence breakout -> full-bleed Key Screens) reads as genuinely intentional, confirmed by measuring a symmetric 144px reveal on the breakout figures. But this round surfaced two real problems neither prior round could have caught without actual screenshots: a factual mismatch baked into an image, and a mobile interaction pattern that silently fails at the exact viewport widths most readers will actually be on.

## What's Working

1. The three-tier width system measures as coherent, not noisy — 672px prose column -> 960px evidence breakout (symmetric 144px reveal each side) -> full edge-to-edge Key Screens.
2. The accordion hint fix from round 4 is well-executed — sage-on-cream contrast measures ~5.3:1 (clears AA even at 12px), sits quietly under the heading, disappears cleanly on open.
3. The dark-mode accent-collision bug hasn't regressed — screenshot-confirmed `dark-sage` and `dark-clay` render as visually distinct hues on the exact component (`InsightBlock`) where they once collided.

## Priority Issues

**[P1] The research-synthesis image's own baked-in header contradicts the page's caption directly beneath it**
- Why it matters: The image reads "affinity-mapped into five themes"; the page's figcaption says "six themes," matching the six numbered accordion insights. This is the single most credibility-sensitive spot on the page for a hiring manager scanning specifically for research rigor.
- Fix: Needs the site owner's call — re-export the affinity board with the header corrected to "six," or adjust the page's own caption/framing so it stops asserting a count the image contradicts.
- Suggested command: /impeccable clarify (page-copy-only fix) — a re-export is outside any command's scope.

**[P1] JumpNav's horizontal scroll is undiscoverable at the two most common iPhone widths**
- Why it matters: Measured peek-through: 320px -> 59px visible (fine); 360px -> 9px (marginal); 375px -> 1px (reads as complete); 390px -> 16px (faint sliver); 414px -> 40px (fine). 375/390px cover a large share of real iPhones. With the scrollbar now hidden and no fade affordance, a touch user gets zero signal that Testimonial/Outcome exist.
- Fix: Add a fade-out gradient mask on the trailing edge (standard overflow-scroll affordance) so "more content" is signaled without a visible scrollbar.
- Suggested command: /impeccable adapt

**[P3] Accordion hint text truncates mid-word for insights 05 and 06**
- Why it matters: `line-clamp-1` cuts by character, not word. Minor polish issue, known CSS tradeoff.
- Fix: Accept as-is, or hand-author shorter preview strings for just these two insights.
- Suggested command: /impeccable clarify

## Persona Red Flags

**Time-pressed hiring manager on an iPhone (390px)**: Sees JumpNav, never realizes Testimonial/Outcome exist past Constraints because the row looks complete — never reaches the two strongest closing beats.

**Detail-oriented research-rigor evaluator**: Catches the five/six theme mismatch in the same eye-span as reading the caption — a small but real dent in the "this person is rigorous" impression.

**Return visitor comparing case studies side by side**: Relies on JumpNav to re-locate "Testimonial" quickly; on a 375px device that link is functionally hidden without knowing to swipe blind.

## Minor Observations

- The "Jump to:" label eats ~88px (23% of the 375px row) before any link starts — the single biggest lever for shifting the mobile cutoff to a safer spot, alongside the fade mask.
- Mobile browser-detector console group showed a count/label mismatch (header said "2 anti-patterns," 5 lines logged) — a discrepancy in the detector's own reporting, not a page issue.
- Constraint-card icon set has no notes — clean, consistent stroke weight.

## Questions to Consider

1. If the research-synthesis image needs re-exporting anyway, is a static JPG the right format for a "living" affinity board that can drift from the copy around it, or is this the moment to consider something that can't silently go stale again?
2. What other touch-only failure modes might be hiding in the site's other sticky/overflow patterns — this one was invisible without actual screenshots?
3. Is horizontally-scrolling JumpNav even the right pattern at 6 items, or would 2 rows of 3 (wrapping, no scroll) trade a little vertical space for guaranteed discoverability at every width?
