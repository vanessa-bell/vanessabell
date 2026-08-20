---
target: spendlight case study
total_score: 22
max_score: 24
na_heuristics: 5,7,9,10
p0_count: 0
p1_count: 2
timestamp: 2026-08-19T22-56-26Z
slug: src-pages-spendlight-tsx
---
Method: dual-agent (A: ad70cd092392755a8 · B: ad9040c553966a5eb)

## Design Health Score

Mode scored: Read (with Persuade/Experience character) — a static case-study page. Heuristics 5, 7, 9, 10 marked n/a (no forms, no destructive actions, no error states, no power-user shortcuts expected on a static portfolio page).

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | JumpNav's IntersectionObserver active-state + sticky positioning gives real-time "where am I" feedback throughout scroll. |
| 2 | Match System / Real World | 4 | Plain language, verbatim participant quotes, consistent terminology reused exactly across sections. |
| 3 | User Control and Freedom | 3 | External Figma link correctly signals new-tab; no "back to top" after the hero's outcome jump; `<details>` has no collapse-all affordance. |
| 4 | Consistency and Standards | 4 | Faithfully matches DESIGN.md's documented components with correct color-role usage throughout. |
| 5 | Error Prevention | n/a | No forms, no destructive actions, nothing to err on. |
| 6 | Recognition Rather Than Recall | 4 | JumpNav lets users select sections rather than recall URL fragments; active highlighting reinforces location. |
| 7 | Flexibility and Efficiency | n/a | Static Read-mode page; no power-user shortcuts expected. |
| 8 | Aesthetic and Minimalist Design | 3 | System restraint is well executed; docked a point because two dense evidence images are effectively decorative at current scale — present but not perceivable. |
| 9 | Error Recovery | n/a | No error states possible on static content. |
| 10 | Help and Documentation | n/a | Not applicable to a Read-mode case-study page. |
| **Total** | | **22/24** | **Good (92%)** |

## Design Specificity Verdict

**LLM assessment**: Not a generic template wearing SpendLight's colors. `InsightBlock` exists specifically to pair a real interview quote with a sage-colored "Design implication" conclusion — a pattern DESIGN.md explicitly reserves for research-heavy case studies. The `insights` array is bespoke qualitative data (six real quotes, six real implications), all eight image alt texts describe exact specific screen content, and JumpNav's anchors map to this page's actual argument structure. The reusable *shell* (hero + stat grid + accordion + testimonial + full-bleed finale) recurs across all four case studies by design, per DESIGN.md — but the content decisions inside it are authored, not templated.

**Deterministic scan**: `detect.mjs --json src/pages/SpendLight.tsx` returned `[]` (clean, exit 0) — no findings. Grep evidence confirms SpendLight's `<main>` container (`max-w-2xl mx-auto px-6 sm:px-8`) is byte-for-byte identical to AllStripes's, so the primary desktop gutter matches the sitewide system exactly — this is not a SpendLight-specific deviation. SpendLight additionally has one structural divergence: a `w-screen max-w-none` full-bleed break-out (the Key Screens figure) that AllStripes has no equivalent of. No duplicate `id`s found; the full-bleed image has explicit `width`/`height` set.

**Visual overlays**: Unavailable this run — no browser automation tool (Playwright/Chrome DevTools/screenshot) was exposed in this session, so no live overlay could be injected. This critique is grounded in source code, DESIGN.md tokens, and hand-computed CSS math instead of a rendered screenshot; treat the layout findings below as high-confidence arithmetic, not visually re-confirmed.

## Horizontal-Space Verdict (the gutter question)

**The 672px reading column itself is correct — keep it.** At `text-base`/16px, 608px of inner content measure (672px minus `sm:px-8` padding) lands at ~69–76 characters per line, right at DESIGN.md's own stated ~75ch target and squarely in the accepted 45–75ch ideal range. The resulting large outer gutters (304px/side at 1280px viewport, up to 624px/side at 1920px) are the deliberate cost of that choice, not a bug — DESIGN.md's system rule is explicit: "wide viewports get width caps, not new layout logic." Adding a `lg:` breakpoint to shrink the gutters would violate the site's single-breakpoint rule for no real readability gain, since the column is already succeeding at its job for prose. This also isn't a SpendLight-specific issue — the exact same container is used sitewide (confirmed identical to AllStripes).

**The real problem is two specific images confined to that column, not the column itself:**
- `existing-prototype-annotated.jpg` — native 1098×874, rendered at 608px CSS width ≈ **55% scale**.
- `research-synthesis.jpg` — native 1381×1400, rendered at 608px ≈ **44% scale**.

Both contain small embedded text (heuristic-critique callouts; affinity-cluster notes) that becomes marginal-to-illegible at these scales — and because it's raster text baked into the image, browser zoom doesn't recover it (a WCAG 1.4.4 concern for low-vision readers). This specifically undermines the page's core positioning claim: these two images *are* the visual proof of the research process, and per PRODUCT.md the "research rigor" half of the differentiator is exactly what a hiring manager is meant to verify here. Right now that proof is present but not perceivable.

The site already has precedent for escaping the column (Key Screens' full-bleed treatment), so widening these two figures doesn't violate any system rule — but giving them the *same* full-bleed treatment as Key Screens would dilute that finale's specialness. Recommend a narrower, distinct breakout for these two figures only (e.g. `sm:max-w-[900–960px]` via a centered negative-margin escape) — a real jump from 44–55% scale to ~58%+ scale, short of full-bleed.

`text-sm` captions and insight bodies run at 608px too, which computes to ~82–87ch — past the 75ch ideal DESIGN.md cites for itself, though within the commonly-accepted ~90ch ceiling, and this is systemic across all four case studies rather than a SpendLight-specific defect.

## Overall Impression

This is a mature, well-structured case study at round 4 of critique — the peak-end arc (Testimonial → Outcome → full-bleed Key Screens → prototype CTA) is deliberately built and lands correctly, the design system is applied faithfully and consistently, and the detector is clean. The gutters the owner asked about are a false alarm — they're correct, sitewide, and by design. The real opportunity that both assessments converge on: the page's strongest evidence (the two research images, and the six insight accordions) is currently the hardest content on the page to actually *see* — undersized images and payoff-hiding accordions both work against the fast-skimming hiring-manager reader this whole site is built for.

## What's Working

1. **JumpNav's honest scope-limiting copy.** `aria-label="Jump to a section (not every section is listed)"` admits its own limits rather than overpromising completeness — small but real, and consistent with the page's evidence-first, nothing-inflated positioning.
2. **Progressive-disclosure accordions in service of positioning, not just tidiness.** Six qualitative insights collapsed by default, each concluding in a sage-colored "Design implication" line, is exactly DESIGN.md's "field ledger" north star — evidence stays out of the way until requested, but the conclusion is visually distinct when opened.
3. **The finale sequencing is deliberate and correct.** Testimonial → Outcome → full-bleed Key Screens → Figma CTA is a genuine peak-end structure. The full-bleed treatment being reserved for exactly one image is what makes it read as a finale rather than noise.

## Priority Issues

**[P1] Two dense evidence images are illegible at their current column width, undermining the page's core research-rigor claim**
- **Why it matters**: `existing-prototype-annotated.jpg` (~55% scale) and `research-synthesis.jpg` (~44% scale) both contain small embedded text that's the actual proof of the research process — right now that proof is present in the DOM but not perceivable, for sighted and low-vision readers alike, and browser zoom can't recover raster text (WCAG 1.4.4).
- **Fix**: Give these two figures (only these two) a distinct, narrower breakout than the full-bleed Key Screens treatment — e.g. `sm:max-w-[900–960px]` via a centered negative-margin escape. Consider pairing with click-to-enlarge for full legibility.
- **Suggested command**: `/impeccable layout`

**[P1] All six research insights hide their payoff behind a click, working against the stated skim-fast persona**
- **Why it matters**: PRODUCT.md principle 2 says to optimize for a hiring manager skimming fast. The closed accordion row shows only the number and heading — the "Design implication" (the actual design-decision payoff) is invisible until clicked, six separate times. A fast reader may open zero or one and never see the other conclusions, even though this section is the strongest evidence for the research-rigor half of the positioning.
- **Fix**: Surface a short implication snippet inline in the closed summary row (a muted secondary line under the heading) so the "so what" is visible without any click.
- **Suggested command**: `/impeccable layout`

**[P2] JumpNav omits "Constraints & tradeoffs" despite it being strong tradeoff-judgment evidence**
- **Why it matters**: JumpNav lists only 5 of 9 actual sections. Constraints & tradeoffs specifically demonstrates scoping judgment a hiring manager wants to see, but there's no jump target to it — though the nav's own `aria-label` caveats this is intentional, so this may be a deliberate scope call rather than an oversight.
- **Fix**: Confirm whether the omission is deliberate; add a jump target if not.
- **Suggested command**: `/impeccable layout`

**[P2] Sticky JumpNav likely wraps to two lines on sub-375px viewports, permanently eating pinned scroll space**
- **Why it matters**: The full label string needs roughly 400px+ of inline space at its tracking/size; available width at 320–375px viewports is ~270–340px. Because the nav is `sticky`, a wrap doesn't just look cramped once — it stays pinned at double height for the rest of the scroll, worst for a distracted mobile reader.
- **Fix**: Verify at 320–375px; if it wraps, shorten labels or let the row scroll horizontally instead of wrapping.
- **Suggested command**: `/impeccable adapt`

**[P3] Minor copy redundancy in the metadata list**
- **Why it matters**: "Team: Solo, the only designer on the project" states the same fact twice — small skim-friction for no reason.
- **Fix**: Tighten to "Solo designer" or similar.
- **Suggested command**: `/impeccable clarify`

## Persona Red Flags

**Sam (accessibility-dependent, low-vision/zoom-dependent)**: The two P1 images are a genuine WCAG 1.4.4 concern — a low-vision user relying on 200% browser zoom gets no benefit because the critical text is baked into a raster image at 44–55% display scale; zooming just enlarges the blur. By contrast, this page's alt text on those same two images is a real compensating strength — `existing-prototype-annotated.jpg`'s alt text actually enumerates the critique findings in words, so a screen-reader user gets the content even though a low-vision sighted user does not. An asymmetric fix: screen readers are covered, magnification users are not.

**Riley (stress-tester, edge viewports)**: The Testing & Iteration two-image before/after grid (`grid-cols-2 gap-4 max-w-md`) at a 320px viewport computes to roughly 128px per image for two portrait phone screenshots — at that width the before/after comparison the section exists to make is close to unreadable as anything but silhouette. Same underlying issue class as P1, on a section outside the original question's scope.

**Casey (distracted, scanning mobile user)**: The JumpNav wrap risk (P2) directly costs Casey vertical space for an entire scroll session on the smallest common phones. The accordion tap-per-insight cost (P1) also compounds for Casey specifically — a distracted skim is even less likely to invest six taps than a focused read is.

## Minor Observations

- `purchase-reflection-screen.png` is the only `.png` among otherwise-uniform `.jpg` assets — no functional impact, just worth normalizing if the image pipeline is ever touched.
- The `Quote` component supports an `attribution` prop with `text-warm-gray/50` figcaption styling, but every call site in `InsightBlock` passes only `text={q}` — attribution is never populated on this page, so that code path (and its low-contrast styling, which would likely fail AA if it ever rendered) is currently dead here. Not urgent, but revisit contrast first if it's ever wired up.
- `<summary>` elements rely on the browser's default focus outline rather than the site's `focus:ring-2 ring-clay/40` treatment used on inputs — functionally fine, but a small inconsistency against DESIGN.md's "tactile and confident" focus-ring direction.
- Sticky offset math (`top-[69px] sm:top-[61px]` on JumpNav vs. `scroll-mt-[140px] sm:scroll-mt-[130px]` on sections) looks internally plausible but depends on SiteHeader's actual rendered height, which wasn't directly re-verified this run — worth a quick manual anchor-jump check if it hasn't been checked recently.

## Questions to Consider

1. If research rigor is the differentiator, why does the page currently optimize its research evidence (six collapsed accordions, two undersized dense images) for the reader who *doesn't* click, rather than the reader who does?
2. If two more images also need to break the column, does "full-bleed" stop reading as special — and is a second, visually distinct breakout width the right way to protect Key Screens' uniqueness as the true finale?
3. Was 608px tuned against `text-base` prose and then inherited by `text-sm` captions/insight bodies without a second pass?
