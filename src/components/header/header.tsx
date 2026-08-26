import { component$ } from "@qwik.dev/core";
import { Link } from "@qwik.dev/router";
import { Container } from "../ui/container";
import { ThemeToggle } from "../theme/theme-toggle";
import { nav, site } from "~/lib/site";

export const Header = component$(() => (
  <header class="border-light-text-color/8 bg-light-foundation/85 dark:border-dark-text-color/10 dark:bg-dark-foundation/80 sticky top-0 z-50 border-b backdrop-blur-md">
    <Container>
      {/*
        h-28 (112px), not the 64px a bar like this usually gets: the 90px logo
        below sets the floor, and this leaves 11px of breathing room above and
        below it. These two numbers move together — shrink the logo and this
        should come back down with it.
      */}
      <div class="flex h-28 items-center justify-between gap-4">
        <Link
          href="/"
          class="text-light-text-color dark:text-dark-text-color flex items-center gap-2.5 font-semibold tracking-tight"
        >
          {/*
            Decorative: the wordmark beside it already gives this link its
            accessible name, so announcing the mark too would just repeat it.

            A CSS background rather than an <img> because the mark is
            theme-swapped (.site-logo in global.css) — two <img> tags toggled by
            `dark:hidden` would download both files, and an <img> whose src the
            theme changes flashes the wrong one before the swap. `shrink-0`
            keeps the 90px box from being squeezed by the nav on narrow screens.
          */}
          <span class="site-logo size-[90px] shrink-0" aria-hidden="true" />
          {site.name}
        </Link>

        <nav class="flex items-center gap-1 sm:gap-2" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              class="text-secondary-color-light hover:text-light-text-color dark:text-secondary-color-dark dark:hover:text-dark-text-color xs:inline-block hidden rounded-full px-3 py-2 text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </Container>
  </header>
));
