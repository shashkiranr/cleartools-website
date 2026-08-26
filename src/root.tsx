import { component$ } from "@qwik.dev/core";
import {
  DocumentHeadTags,
  RouterOutlet,
  useLocation,
  useQwikRouter,
} from "@qwik.dev/router";

import { themeInitScript } from "./components/theme/theme";
import "./global.css";

export default component$(() => {
  useQwikRouter();
  const { url } = useLocation();

  return (
    <>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/*
          Blocking, before anything paints: applies the `.dark` class the
          Tailwind `dark:` variant keys off. See components/theme/theme.ts.
        */}
        <script dangerouslySetInnerHTML={themeInitScript} />

        {/*
          The real product icon, supplied by the user under
          public/icons/{light,dark}/ — PNG only, there is no vector source.

          The *light* icon is the favicon in both themes, deliberately: it is a
          near-white rounded plate with a dark glyph, which reads on light and
          dark browser chrome alike. The dark icon is a black plate that
          disappears into a dark tab strip. So no `media` matching here — the
          dark set is used by the header logo (see .site-logo in global.css),
          where it sits on the page's own dark background.
        */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/light/cleartools-light-32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/light/cleartools-light-16.png"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/light/cleartools-light-256.png"
        />
        <link rel="manifest" href="/manifest.json" />

        <meta
          name="theme-color"
          content="#f9f9f9"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#000000"
          media="(prefers-color-scheme: dark)"
        />

        {/*
          The one font the site uses is self-hosted (see global.css), so it is
          preloaded rather than discovered a stylesheet-parse late. `crossorigin`
          is required even same-origin: font fetches are always CORS.
        */}
        <link
          rel="preload"
          href="/fonts/google-sans-flex-latin-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        <DocumentHeadTags />

        <link rel="canonical" href={url.href} />
      </head>
      <body class="bg-light-foundation text-light-text-color dark:bg-dark-foundation dark:text-dark-text-color font-sans antialiased">
        <RouterOutlet />
      </body>
    </>
  );
});
