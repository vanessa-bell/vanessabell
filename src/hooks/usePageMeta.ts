import { useEffect } from "react";

const BASE_URL = "https://vanessabell.design";
const DEFAULT_OG_IMAGE = `${BASE_URL}/about/flamenco-3.jpg`;

interface PageMeta {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  /** Root-relative path (e.g. "/about") or absolute URL for the OG image */
  ogImage?: string;
  /** Root-relative path to this page (e.g. "/about"). Falls back to window.location.pathname. */
  path?: string;
}

function setMeta(attrKey: string, attrVal: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attrKey}="${CSS.escape(attrVal)}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrKey, attrVal);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

export function usePageMeta({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  path,
}: PageMeta) {
  useEffect(() => {
    document.title = title;

    const resolvedTitle = ogTitle ?? title;
    const resolvedDesc = ogDescription ?? description;
    const resolvedImage = ogImage.startsWith("http")
      ? ogImage
      : `${BASE_URL}${ogImage}`;
    const resolvedUrl = path
      ? `${BASE_URL}${path}`
      : `${BASE_URL}${window.location.pathname}`;

    setMeta("name", "description", description);
    setCanonical(resolvedUrl);

    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "Vanessa Bell");
    setMeta("property", "og:title", resolvedTitle);
    setMeta("property", "og:description", resolvedDesc);
    setMeta("property", "og:image", resolvedImage);
    setMeta("property", "og:url", resolvedUrl);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", resolvedTitle);
    setMeta("name", "twitter:description", resolvedDesc);
    setMeta("name", "twitter:image", resolvedImage);
  }, [title, description, ogTitle, ogDescription, ogImage, path]);
}
