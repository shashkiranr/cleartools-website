import { component$ } from "@qwik.dev/core";
import { Link } from "@qwik.dev/router";
import { Container } from "../ui/container";
import { footerNav, site } from "~/lib/site";

export const Footer = component$(() => (
  <footer class="border-light-text-color/8 dark:border-dark-text-color/10 border-t py-12">
    <Container>
      <div class="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div class="text-light-text-color dark:text-dark-text-color font-semibold tracking-tight">
            {site.name}
          </div>
          <p class="text-secondary-color-light dark:text-secondary-color-dark mt-3 text-sm">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>

        <nav aria-label="Footer" class="flex flex-wrap gap-x-6 gap-y-3">
          {footerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              class="text-secondary-color-light hover:text-light-text-color dark:text-secondary-color-dark dark:hover:text-dark-text-color text-sm transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </Container>
  </footer>
));
