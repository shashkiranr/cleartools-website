import { component$ } from "@qwik.dev/core";
import { Link } from "@qwik.dev/router";
import { Container } from "../ui/container";
import { ThemeToggle } from "../theme/theme-toggle";
import { nav, site } from "~/lib/site";

export const Header = component$(() => (
  <header class="border-light-text-color/8 bg-light-foundation/85 dark:border-dark-text-color/10 dark:bg-dark-foundation/80 sticky top-0 z-50 border-b backdrop-blur-md">
    <Container>
      <div class="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          class="text-light-text-color dark:text-dark-text-color font-semibold tracking-tight"
        >
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
