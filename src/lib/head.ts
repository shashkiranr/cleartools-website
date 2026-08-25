import type { DocumentHead } from "@qwik.dev/router";
import { site } from "./site";

/**
 * Every route's head is built here so the title suffix, description and social
 * tags stay consistent — and so adding an og:image later is a one-file change.
 */
export const buildHead = (
  title: string,
  description: string,
  opts: { path?: string; noSuffix?: boolean } = {},
): DocumentHead => {
  const fullTitle = opts.noSuffix ? title : `${title} — ${site.name}`;
  const url = `${site.url}${opts.path ?? "/"}`;

  return {
    title: fullTitle,
    meta: [
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: site.name },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
    ],
  };
};
