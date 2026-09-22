import { siteConfig } from "@/config/site";

/** Genera i meta tag standard per una pagina (title, description, OG, Twitter). */
export function pageMeta(opts: { title: string; description: string; path: string; type?: string }) {
  const title = `${opts.title} — ${siteConfig.name}`;
  return {
    meta: [
      { title },
      { name: "description", content: opts.description },
      { property: "og:title", content: title },
      { property: "og:description", content: opts.description },
      { property: "og:type", content: opts.type ?? "website" },
      { property: "og:url", content: opts.path },
      { property: "og:locale", content: siteConfig.locale },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: opts.description },
    ],
    links: [{ rel: "canonical", href: opts.path }],
  };
}
