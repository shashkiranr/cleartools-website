import type { RequestHandler } from "@qwik.dev/router";
import { site } from "~/lib/site";

/**
 * Hand-maintained rather than crawled: the site is small enough that an
 * explicit list is clearer than a build-time walk of the routes directory, and
 * it keeps `changefreq`/`priority` under deliberate control. Add a route here
 * when you add one under src/routes.
 */
const paths = ["/", "/clearopfs/"];

export const onGet: RequestHandler = async ({
  send,
  headers,
  cacheControl,
}) => {
  cacheControl({ maxAge: 60 * 60, staleWhileRevalidate: 60 * 60 * 24 });
  headers.set("Content-Type", "application/xml; charset=utf-8");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (path) =>
      `  <url>\n    <loc>${site.url}${path}</loc>\n    <priority>${
        path === "/" ? "1.0" : "0.7"
      }</priority>\n  </url>`,
  )
  .join("\n")}
</urlset>
`;

  // `send(status, body)` rather than `send(new Response(...))`: a Response's own
  // headers are *appended* to the ones already set on the request event, so
  // constructing one here produces a duplicated (or, with the default
  // `text/plain`, a contradictory) content-type.
  send(200, body);
};
