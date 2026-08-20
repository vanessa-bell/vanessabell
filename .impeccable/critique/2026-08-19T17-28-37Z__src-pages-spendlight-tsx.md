---
target: spendlight page
total_score: 14
max_score: 20
na_heuristics: 1,5,7,9,10
p0_count: 1
p1_count: 2
timestamp: 2026-08-19T17-28-37Z
slug: src-pages-spendlight-tsx
---
Method: dual-agent (A: a1aa8ab4888252e2b · B: a4431fe36e6fc2f5a)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | n/a | Static article, no system actions/feedback loop |
| 2 | Match Between System and Real World | 4/4 | Ledger/bonsai metaphors land; plain language throughout |
| 3 | User Control and Freedom | 2/4 | No in-page anchor nav on a 13-section, 621-line page — a skimmer wanting "Outcome" has to scroll past everything |
| 4 | Consistency and Standards | 3/4 | Matches DESIGN.md tokens well, but the stat block says "4 insights" while the page visibly shows 6 |
| 5 | Error Prevention | n/a | No user input on this page |
| 6 | Recognition Rather Than Recall | 4/4 | Each section is self-contained; no cross-section recall burden |
| 7 | Flexibility and Efficiency of Use | n/a | No accelerators apply to a static article |
| 8 | Aesthetic and Minimalist Design | 1/4 | ~1,464 words against 9 visuals, heavily backloaded — the core finding of this critique |
| 9 | Error Recovery | n/a | No error states on this page |
| 10 | Help and Documentation | n/a | Static article, no help affordance needed |
| **Total** | | **14/20 (70%)** | **Good, at the low end** |

## Design Specificity Verdict

**LLM assessment:** The evidence is specific — the research quotes, the bonsai metaphor, the discretionary-spending framing, and the named testimonial couldn't drop into an unrelated case study unchanged. The *skeleton* (stat block → dl → Testimonial → How I measured success → What this says about how I work) is shared verbatim with AllStripes and HealthTech, which is deliberate systemic consistency, not a flaw. The real specificity gap is "Project snapshot" and "Core experience," which mostly restate what the hero video already shows and could sit in almost any 0-to-1 case study with light edits.

**Deterministic scan:** `node detect.mjs --json src/pages/SpendLight.tsx` → `[]`, exit 0. Clean mechanical scan, nothing to report as false positive since the finding set is empty. This is expected — the actual problem here is structural/density, which sits outside what a token/pattern detector checks.

**Manual structural evidence (Assessment B):** 621 lines, 12 `<section>` blocks, ≈1,464 words of prose against 9 visual elements (1 hero video + 4 standalone figures + 4 IterationGrid images). **7 of 12 sections (58%) contain zero images.** Longest unbroken text run before a visual break: **598 words** (spans Constraints through all 6 numbered research insights). The page ends on a second unbroken run of **349 words** with no visuals at all (Outcome → Testimonial → How I measured success → What this says about how I work). For comparison, AllStripes runs ~600 words against 1 image across 171 lines — SpendLight is roughly 3.6x the length for a project whose actual scope (a 6-week validation sprint) is smaller than AllStripes' shipped production feature.

**Visual overlays:** Unavailable — no browser-automation tool is exposed in this session and no dev server was started. No visual overlay ran; this is a source-level critique only.

## Overall Impression

The content is genuinely good — real research, real testimonial, real design implications tied to real quotes. The problem is entirely structural: the page shows every finding at full weight with no prioritization, so the strongest proof (Outcome, Testimonial) sits 10 sections and ~1,150 words deep, and a persona whose defining trait is skimming fast (per PRODUCT.md) never reliably reaches it. The single biggest opportunity is not cutting content — it's re-sequencing what's already there and adding the chunking/disclosure the Research section proves you already know how to do (its numbered, self-contained insight blocks are the best-structured content on the page; "My approach" and the section ordering don't get the same treatment).

## What's Working

1. **Hero video/static pairing with rich alt text** (lines 94-117) — shows the product immediately instead of describing it, with a real `usePrefersReducedMotion` fallback. Strongest asset on the page.
2. **Quote → sage "Design implication" pattern** (404-427) — concrete, specific proof of research rigor tied directly to PRODUCT.md's positioning claim. This is what "research-grounded" should look like everywhere on the page.
3. **Constraints & tradeoffs section** (272-334) — a clean 2×2 chunked card grid that shows exactly the disclosure discipline the rest of the page is missing.

## Priority Issues

**[P0] Stat block contradicts the page's own content.** The hero stat block says "4 insights" (line 122) and "How I measured success" repeats "four concrete research insights" (line 589), but "What research revealed" numbers **six** entries, 01 through 06 (lines 345-403). Both assessments independently caught this — a detail-oriented hiring manager can catch it by literally counting. **Why it matters:** this is exactly the kind of internal inconsistency that undermines the "rigorous, detail-oriented" impression a research-heavy case study is trying hardest to build. **Fix:** either trim to the 4 strongest insights or correct "4" to "6" everywhere it appears. **Suggested command:** `/impeccable clarify`

**[P1] Outcome is buried behind ~1,150+ words and 10 sections of process, inverting the page's own stated audience principle.** PRODUCT.md Principle #2: "optimize for a hiring manager skimming fast: lead with the outcome/metric before the process narrative." SpendLight runs Snapshot → Core Experience → Problem → Approach → Constraints → Research (6 insights, 423 words) → IA → Testing before "Outcome" appears. **Why it matters:** the persona this page is built for (per your own product definition) is specifically the one least likely to reach the proof. **Fix:** add anchor/jump navigation so a skimmer can reach Outcome directly, and/or surface a condensed outcome earlier (the stat block is a start, but doesn't carry the "validated direction" framing). **Suggested command:** `/impeccable layout`

**[P1] Zero progressive disclosure on the two heaviest sections.** "My approach" (212 words, 4 unbroken paragraphs, lines 224-269) and "What research revealed" (423 words — the single largest section on the page, lines 338-443) show everything fully expanded by default, for a persona whose defining trait is skimming. **Why it matters:** the Research section already proves you know how to chunk this well (numbered, self-contained insight blocks) — that discipline just isn't applied consistently. **Fix:** cap visible insights at 3-4 with the rest reachable via "+2 more," or give "My approach" the same numbered/weekly treatment already working in Research. **Suggested command:** `/impeccable distill`

**[P2] "Core experience" section is redundant with the hero video 90 lines above it.** Lines 169-179 narrate in prose the exact flow the hero video (and its alt text) already demonstrated. **Why it matters:** this is the first point in the page where a skimmer gets zero new information for the scroll effort spent — a likely early bail point. **Fix:** fold into "Project snapshot" or cut entirely. **Suggested command:** `/impeccable distill`

**[P2] The orienting research-synthesis image is placed after, not before, the 6 detailed insights it summarizes.** The affinity-board image (line 430) — which gives a reader the big-picture view of all research themes at a glance — sits at the very end of the 598-word longest unbroken text run on the page, instead of at the top where it could let a fast reader choose which insight to read in depth. **Why it matters:** this is a Gutenberg/Z-pattern miss — the summary visual is exactly what a skimming persona needs first. **Fix:** move it to the top of "What research revealed," directly under the h2. **Suggested command:** `/impeccable layout`

## Persona Red Flags

**Priya (Hiring Manager — PRODUCT.md's actual defined user: reviewing several portfolios in one sitting, deciding interview-or-pass fast).** Hero and stat block work well. By the end of "The problem" (4 straight paragraphs since the hero, zero new visual payoff), she's hit the most likely bail point — roughly a third down the page. If she continues into "My approach," she's now deep in process narrative, which Product Principle #2 says should come *after* outcome, not before. If she reaches "What research revealed," she's likely to fully read insights 01-02 and scroll-skim 03-06 — meaning insight 06 ("people wanted a coach, not a ledger," arguably the most product-strategic finding on the page) sits in the weakest scan position. She reaches Outcome, Testimonial, and the real proof points only after clearing 10 sections.

**Jordan (confused first-timer, no context on your project vocabulary).** "Bonsai" is referenced repeatedly in prose (hero alt text, Core Experience, insight 02's implication, Testing's "what worked" list) well before it's ever actually shown — the reward image doesn't appear until line 527, deep in the Testing grid.

**Casey (distracted mobile user).** The 4-paragraph "My approach" block and the `pl-8`-indented 6-insight Research section become long thumb-scroll sequences with no anchor nav to skip ahead — mobile fatigue compounds the desktop bail risk above.

## Minor Observations

- **Section spacing outlier (caught by Assessment B, not A):** 10 of 12 sections use `mb-12` (48px, DESIGN.md's documented dominant rhythm value); "Testimonial" and "What this says about how I work" use `mb-16` (64px) instead — a value with no corresponding token in DESIGN.md's scale.
- 7-item `dl` metadata block (lines 135-150) vs. 6 items on both AllStripes and HealthTech — breaks the sibling-page pattern and exceeds the documented ≤5-per-group chunking guideline.
- All alt text is specific and content-descriptive (verified across all 6 image definitions) — no generic alt text found, a genuinely strong accessibility baseline.
- Heading hierarchy (h1 → h2 → h3) is correct throughout with no skipped levels.
- `IterationGrid` captions are dense enough to double as analysis — could be trimmed since the adjacent "what we improved" list already covers most of that ground.

## Questions to Consider

1. If AllStripes proves a 95% reduction in ~600 words, why does SpendLight need 2,800+ words to prove a 6-week validation? Is the length doing rhetorical work ("look how thorough this research is"), or working against it?
2. What happens if Outcome and the stat block trade places with "My approach" and "What research revealed" — proof first, process available to whoever keeps scrolling?
3. Does the case study need a separate prose "Core experience" section at all, given the hero video already answers "what does this look like"?
