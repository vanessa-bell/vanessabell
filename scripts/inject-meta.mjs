// Vite builds one shared dist/index.html shell for the whole SPA. Real
// per-route title/description/OG tags only ever get set client-side
// (usePageMeta, via a useEffect) — invisible to crawlers and social-link
// unfurlers (Slack, LinkedIn, Twitter/X, Facebook) that don't execute JS.
// This script writes a copy of that shell per route with the correct tags
// already baked into <head>, so a cold GET to e.g. /monster-walk returns
// real metadata with no JS required. Pure string templating — no browser,
// no network — so it can't fail in a CI/serverless build image the way a
// headless-Chrome prerender step can.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const distDir = path.join(projectRoot, "dist");
const BASE_URL = "https://vanessabell.design";
const DEFAULT_OG_IMAGE = `${BASE_URL}/about/flamenco-3.jpg`;

// Mirrors each page's usePageMeta({...}) call in src/pages/*.tsx and
// src/App.tsx. Keep these in sync if that copy changes.
const routes = [
  {
    path: "/",
    title: "Vanessa Bell | Product Designer & Builder",
    description:
      "Product designer who runs the research, designs the fix, and ships the code — case studies in health tech, healthcare ops, and gaming.",
    ogImage: "https://vanessabell.design/ai-research-workflow/hero-diagram-public.png",
  },
  {
    path: "/about",
    title: "About | Vanessa Bell",
    description:
      "Product Designer based in San Francisco, working at the intersection of healthcare, AI, and human-centered research. Former software engineer. Flamenco dancer. Yoga teacher.",
  },
  {
    path: "/contact",
    title: "Get in Touch | Vanessa Bell",
    description:
      "Available for embedded design and build, heuristic audits, and focused design sprints.",
  },
  {
    path: "/spendlight",
    title: "Designing Mindful Money Habits | Vanessa Bell",
    description:
      "A six-week lean UX sprint to validate SpendLight: a spending journal that builds mindful money habits through emotional reflection rather than budget control.",
    ogImage: "https://vanessabell.design/spendlight/hero.png",
  },
  {
    path: "/monster-walk",
    title: "Turning Daily Walks into Daily Wins | Vanessa Bell",
    description:
      "UX research and redesign of Monster Walk's Welcome Back flow: turning a flat, confusing screen into a motivating streak milestone moment. Validated at 4.8/5 average return intent in concept testing.",
    ogImage: "https://vanessabell.design/monster-walk/monster-walk-hero.gif",
  },
  {
    path: "/ai-research-workflow",
    title: "Letting AI Do the Work so Human Experts Can Focus on Review | Vanessa Bell",
    description:
      "A researcher-facing workflow redesign for an AI health tech platform. Flipped the interaction model from manual-first to AI-proposes, human-confirms, achieving a 9x reduction in time and steps.",
    ogImage: "https://vanessabell.design/ai-research-workflow/hero-diagram-public.png",
  },
  {
    path: "/allstripes",
    title: "Helping Patients Get Their Records Faster | Vanessa Bell",
    description:
      "A workflow redesign that cut medical records processing time by 95% and directly sped up patient access to their own health data.",
  },
];

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const shell = await readFile(path.join(distDir, "index.html"), "utf-8");

for (const route of routes) {
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const ogImage = escapeHtml(route.ogImage ?? DEFAULT_OG_IMAGE);
  const url = escapeHtml(`${BASE_URL}${route.path}`);

  const headExtra = `    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Vanessa Bell" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:url" content="${url}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${ogImage}" />
  </head>`;

  const html = shell
    .replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${description}" />`
    )
    .replace("</head>", headExtra);

  const outDir = route.path === "/" ? distDir : path.join(distDir, route.path);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "index.html"), html);
  console.log(`injected meta: ${route.path === "/" ? "/" : route.path + "/"}`);
}
