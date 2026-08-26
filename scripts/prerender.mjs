// Prerenders each route to a static dist/<route>/index.html so crawlers and
// social-link unfurlers (which don't execute JS) see the real per-page title,
// description, and Open Graph tags instead of the generic shell in index.html.
// Runs after `vite build`, against the built output, via a real headless
// Chrome — usePageMeta sets its tags in a useEffect, so only a page that
// actually runs the app's JS can produce the final <head>.
import { preview } from "vite";
import puppeteer from "puppeteer";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const distDir = path.join(projectRoot, "dist");

const routes = [
  "/",
  "/about",
  "/contact",
  "/spendlight",
  "/monster-walk",
  "/ai-research-workflow",
  "/allstripes",
];

const server = await preview({ root: projectRoot, preview: { port: 4174 } });
const baseUrl = server.resolvedUrls.local[0].replace(/\/$/, "");

const browser = await puppeteer.launch();

try {
  for (const route of routes) {
    const page = await browser.newPage();
    await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
    // usePageMeta runs in a useEffect after mount; og:title is the last tag
    // it sets, so waiting on it means the whole head is settled.
    await page.waitForSelector('meta[property="og:title"]', { timeout: 5000 });
    const html = await page.content();
    await page.close();

    const outDir = path.join(distDir, route === "/" ? "." : route);
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, "index.html"), html);
    console.log(`prerendered ${route === "/" ? "/" : route + "/"}`);
  }
} finally {
  await browser.close();
  await new Promise((resolve, reject) => {
    server.httpServer.close((err) => (err ? reject(err) : resolve()));
  });
}
