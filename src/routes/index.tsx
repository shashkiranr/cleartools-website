import { component$ } from "@qwik.dev/core";
import { Link } from "@qwik.dev/router";
import { Container } from "~/components/ui/container";
import { ButtonLink } from "~/components/ui/button";
import { Section, SectionHeading } from "~/components/ui/section";
import { PanelMock } from "~/components/ui/panel-mock";
import { buildHead } from "~/lib/head";
import { CLEAROPFS_SITE, products, site } from "~/lib/site";

export default component$(() => {
  return (
    <>
      {/* Hero */}
      <Container class="pt-16 pb-8 sm:pt-24">
        <div class="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <p class="text-accent-light dark:text-accent-dark mb-4 text-xs font-semibold tracking-[0.18em] uppercase">
              Clear Tools
            </p>
            <h1 class="text-light-text-color dark:text-dark-text-color text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {site.tagline}
            </h1>
            <p class="text-secondary-color-light dark:text-secondary-color-dark mt-6 max-w-xl text-lg leading-relaxed">
              Clear Tools is a suite of software for the people who build on the
              modern web. Each tool does one thing the browser makes hard, and
              does it properly.
            </p>
            <div class="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/clearopfs/">Explore ClearOPFS</ButtonLink>
              <ButtonLink href={CLEAROPFS_SITE} variant="secondary" external>
                Install <span aria-hidden="true">↗</span>
              </ButtonLink>
            </div>
          </div>

          <PanelMock />
        </div>
      </Container>

      {/* The suite */}
      <Section id="suite">
        <Container>
          <SectionHeading eyebrow="The suite">
            One tool available today. More on the way.
          </SectionHeading>

          <div class="mt-12 grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={product.href}
                class="group border-light-text-color/10 bg-light-base hover:border-accent-light/40 dark:border-dark-text-color/10 dark:bg-dark-base dark:hover:border-accent-dark/40 flex flex-col rounded-3xl border p-8 transition-colors"
              >
                <h3 class="text-light-text-color dark:text-dark-text-color text-xl font-bold">
                  {product.name}
                </h3>
                <p class="text-accent-light dark:text-accent-dark mt-1.5 text-sm font-semibold">
                  {product.tagline}
                </p>
                <p class="text-secondary-color-light dark:text-secondary-color-dark mt-4 flex-1 leading-relaxed">
                  {product.blurb}
                </p>
                <span class="text-light-text-color dark:text-dark-text-color mt-6 text-sm font-semibold">
                  Learn more{" "}
                  <span
                    aria-hidden="true"
                    class="inline-block transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            ))}

            {/*
              Deliberately unnamed. CLAUDE.md is explicit that product claims are
              the user's to make — the placeholder says "more is coming" without
              inventing a roadmap.
            */}
            <div class="border-light-text-color/12 dark:border-dark-text-color/12 flex flex-col justify-center rounded-3xl border border-dashed p-8">
              <h3 class="text-secondary-color-light dark:text-secondary-color-dark text-xl font-bold">
                More tools, soon
              </h3>
              <p class="text-secondary-color-light dark:text-secondary-color-dark mt-4 leading-relaxed">
                The suite is growing. Each new tool follows the same rule as the
                first: make something the browser hides into something you can
                see and work with.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
});

export const head = buildHead(
  `${site.name} — ${site.tagline}`,
  site.description,
  { path: "/", noSuffix: true },
);
