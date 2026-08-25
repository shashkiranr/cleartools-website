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
          The real product icon, light/dark matched. These files are supplied by
          the user under public/icons/{light,dark}/ — PNG only, there is no
          vector source.
        */}
        <link
          rel="icon"
          type="image/png"
          href="/icons/light/favicon.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/png"
          href="/icons/dark/favicon.png"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="apple-touch-icon" href="/icons/light/icon-256.png" />
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
