---
target: monster walk case study
total_score: 18
max_score: 24
na_heuristics: 5,7,9,10
p0_count: 0
p1_count: 1
timestamp: 2026-08-20T23-52-47Z
slug: src-pages-monsterwalk-tsx
---
Method: dual-agent (A: a24e0c17f405bff86 · B: a095202d6ee9bf8c0)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Jump nav tracks active section well; lightbox has clear close affordance |
| 2 | Match System / Real World | 4 | Precise game terminology, authentic constraints, no generic case-study filler language |
| 3 | User Control and Freedom | 2 | Lightbox works where present, but only 2 of 15 images (old-welcome-back-flow, early-wireframes-return-flow) have it — the two densest grids (concepts-as-tested, final screens) render as small as 103×170px on mobile with no way to inspect them |
| 4 | Consistency and Standards | 2 | Every content image but two carries `border border-warm-gray/15`; the two testimonial quote images (Anticipation-Quote.jpg, Monster-Connection-Quote.jpg) don't, confirmed at lines 713 and 721 |
| 5 | Error Prevention | n/a | Static content page, no user input |
| 6 | Recognition Rather Than Recall | 4 | Jump nav removes need to remember scroll position |
| 7 | Flexibility and Efficiency | n/a | Experience-mode surface, no power-user path expected |
| 8 | Aesthetic and Minimalist Design | 3 | Clean and warm overall; chipped by the border inconsistency and the unused sage accent |
| 9 | Error Recovery | n/a | No error states present |
| 10 | Help and Documentation | n/a | Not applicable to a case-study page |
| **Total** | | **18/24** | **Good (75%)** |

## Design Specificity Verdict

**LLM assessment**: This is authored, not templated. Game-specific vocabulary ("evil fog," "stamina cap," monster-as-companion framing), the habit-loop diagram mapped to this exact mechanic, the three named concept directions, and real Maze nav-path data all read as a bespoke process. The one place specificity slips: DESIGN.md reserves the sage accent explicitly for "synthesis" callouts on research-heavy studies, and this is the most research-heavy case study on the site — yet "What research revealed" renders its four findings entirely in clay (confirmed: `text-sage`/`bg-sage`/`border-sage` appear zero times anywhere in the file). The one color token built to visually signal rigor is absent from the case study that has the most of it.

**Deterministic scan**: `detect.mjs --json src/pages/MonsterWalk.tsx` — exit code 0, `[]`. No rule violations. Console clean at both viewports before and after full-page scroll, no failed network requests (all 15 images resolve with `naturalWidth > 0`), no horizontal overflow at 390px, all alt text present and descriptive, heading order clean (single H1, no skipped levels). Contrast: one borderline case — a `☀` icon glyph at `3.38:1` (clay-on-cream, 12px), below 4.5:1 body-text threshold but plausibly a UI glyph rather than text, so judgment call. Everything else checked (testimonial attribution, stat figures, body copy) clears AA, with the stat-figure ratio (4.54:1) passing by a hair.

**Visual overlays**: No browser injection was run this round (the two sub-agents used direct Puppeteer inspection and screenshots instead of the detect.js overlay script); no `[Human]` tab overlay is available. Screenshots were captured to the scratchpad directory as evidence — see Assessment B's file list.

## Overall Impression

Three prior critique rounds already fixed the structural issues (chronology, alt-text accuracy, heading semantics, one lightbox). What's left is consistency debt: two images that skip a border every other image has, two images that skip the zoom affordance the two most-comparable images already have, and a design-system rule (sage = synthesis) that was written into DESIGN.md but never actually applied. None of this is a rebuild — it's four targeted fixes.

## What's Working

- **The habit-loop diagram** does real diagnostic work — it locates the problem in a system rather than just describing it, which is exactly the "research rigor" the site's positioning claims.
- **JumpNav's engineering** — active-section tracking, a debounced fast-scroll fallback, horizontal auto-scroll-into-view on mobile — reads as genuinely built, not portfolio filler.
- **Peak-end structure**: Testimonial → real player quotes → final screens as the literal last thing on the page is the right sequencing call, and both assessments independently confirmed no console/network/detector issues anywhere on the page — the underlying build is clean.

## Priority Issues

**[P1] The two densest, most-relevant image grids have no zoom, confirmed unreadable on mobile.** The "concepts as tested" grid (moderated-daily-streak.jpg, moderated-monster-greeting.jpg, moderated-hidden-monster.jpg) and the "Final Screens" grid (monster-greeting.jpg, final-daily-streak.jpg, mystery-monster-welcome-back.jpg) are the actual output of the whole project, yet neither has a lightbox trigger — confirmed via DOM audit that only `old-welcome-back-flow.jpg` and `early-wireframes-return-flow.jpg` are wrapped in a zoom `<button>`. Measured rendered size at 390px: **103×170px** for the tested-concepts grid, **103×171px** for final screens — game UI text at that size is not legible. A hiring manager on mobile can't actually inspect the shipped work.
**Why it matters**: These two grids are the payoff images of the entire case study — the redesign itself. Making them the two grids you *can't* zoom into, on the device class most hiring managers will glance at first, undercuts the "here's the real work" moment right when it should land hardest.
**Fix**: Wrap both grids' `<img>` elements in the same lightbox `<button>` pattern already used for `old-welcome-back-flow.jpg` (see MonsterWalk.tsx line ~325) — trigger ref, `setLightbox({src, width, height, alt})`, shared dialog.
**Suggested command**: `/impeccable adapt`

**[P2] Testimonial quote images are the only two content images without a border.** Confirmed at lines 713 and 721: `className="w-full rounded-lg"` on both `Anticipation-Quote.jpg` and `Monster-Connection-Quote.jpg`, versus `border border-warm-gray/15` on every other image in the file (10+ occurrences). In dark mode these render as stark, hard-edged white blocks against the near-black background, right at the emotional peak of the page.
**Why it matters**: This is the one spot in the page where a visual inconsistency lands during the section built to be the peak-end moment — the exact place polish matters most.
**Fix**: Add `border border-warm-gray/15 dark:border-dark-warm-gray/15` to both `<img>` classNames to match the rest of the page.
**Suggested command**: `/impeccable polish`

**[P2] Sage accent, reserved by DESIGN.md for "synthesis" callouts on research-heavy studies, never appears in this file.** Confirmed via grep: zero occurrences of `sage` as a text/bg/border class anywhere in MonsterWalk.tsx. "What research revealed" — four numbered findings, the most synthesis-dense section on the page — renders entirely in clay instead.
**Why it matters**: The color rule exists specifically to give research-driven conclusions a visual signature distinct from action/outcome content. This case study is the site's strongest research-rigor evidence and is the one place that signature is missing.
**Fix**: Apply sage to the numbered labels (01–04) or a "Design implication"-style treatment in "What research revealed," matching the pattern DESIGN.md describes for SpendLight.
**Suggested command**: `/impeccable colorize`

**[P3] "Outcome" section reads as a stall, not a beat.** It's one paragraph that defers everything to "How I measured success" below it, which then re-states the same 4.8/5 and 4.3/5 stats from the hero a third time — a dip in momentum right before the page should be accelerating toward the testimonial/final-screens finale.
**Why it matters**: Minor pacing issue at a moment that otherwise works well; not a hiring-manager blocker, but an easy tighten.
**Fix**: Cut the section or fold its one sentence into "How I measured success" as a lead-in line.
**Suggested command**: `/impeccable distill`

## Persona Red Flags

**Jordan (skimming fast, mobile)**: Hits two unlabeled, unzoomable 103px-wide thumbnail grids showing the actual redesigned screens, with no visual cue that two *other* images on the same page do zoom — the inconsistent affordance reads as "this case study won't let me see the work," at the worst possible point in the scroll.

**Riley (stress-tester)**: Toggles dark mode and immediately spots the two hard-edged white quote-image blocks breaking the border pattern everywhere else on the page — a close look doesn't hold up at the peak-end moment.

## Minor Observations

- The `☀` icon (clay-on-cream, 12px) computes to 3.38:1 contrast — below 4.5:1 body-text AA but likely fine if it's classified as a graphical/UI element (3:1 threshold) rather than text; worth a quick visual check rather than an assumed fix.
- The two "final screens" whose on-image copy is near-identical (`monster-greeting.jpg` and `mystery-monster-welcome-back.jpg` both read "1500 steps since last visit / That's like taking your dog for a decent walk around the block / Collect Stamina," differing only in the mood line) are partially mitigated by their captions — one is captioned "Personalized monster greeting," the other explicitly "Hidden Monster in Fog **concept**" (not presented as an equally-final deliverable) — but a sharp-eyed reviewer comparing them side by side may still read it as a copy-paste leftover, since it lives in the source images rather than the code.

## Questions to Consider

1. If sage exists specifically to mark research-driven synthesis, and this is the site's most research-heavy case study, what does it cost to actually use it here?
2. Would a hiring manager on mobile, unable to zoom into the redesign's own screens, walk away thinking "I saw the work" or "I saw thumbnails of the work"?
