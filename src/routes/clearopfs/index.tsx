import { component$ } from "@qwik.dev/core";
import { Container } from "~/components/ui/container";
import { ButtonLink } from "~/components/ui/button";
import { Section, SectionHeading } from "~/components/ui/section";
import { PanelMock } from "~/components/ui/panel-mock";
import { buildHead } from "~/lib/head";
import { CLEAROPFS_SITE } from "~/lib/site";

/**
 * A short overview only — clearopfs.com is the product site and owns the full
 * story, the install instructions and the release notes. Everything asserted
 * here is drawn from the capability list in CLAUDE.md; nothing about pricing or
 * availability is claimed, because this repo cannot verify it.
 */
const surfaces = [
  {
    name: "Web Inspector panel",
    where: "macOS — Safari, Chrome, Firefox, Edge",
    features: [
      "Tree and Finder-style Columns views",
      "Create, rename, move and delete",
      "Drag-and-drop reparenting",
      "Upload and download with conflict resolution",
      "Storage-quota statistics",
      "Keyboard shortcuts",
      "VoiceOver support",
    ],
  },
  {
    name: "Toolbar popup",
    where: "iOS and iPadOS",
    features: [
      "Drill-down navigation",
      "Select mode for bulk actions",
      "Long-press action sheet",
      "Create, rename, move and delete",
      "Upload and download",
      "Storage-quota statistics",
    ],
  },
];

export default component$(() => (
  <>
    <Container class="pt-16 pb-8 sm:pt-24">
      <div class="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p class="text-accent-light dark:text-accent-dark mb-4 text-xs font-semibold tracking-[0.18em] uppercase">
            ClearOPFS
          </p>
          <h1 class="text-light-text-color dark:text-dark-text-color text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            The Origin Private File System, made visible.
          </h1>
          <p class="text-secondary-color-light dark:text-secondary-color-dark mt-6 max-w-xl text-lg leading-relaxed">
            A full Web Inspector panel for reading, editing and moving the files
            your web apps keep in origin storage — and a toolbar popup that
            brings the same tools to iOS and iPadOS.
          </p>
          <div class="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={CLEAROPFS_SITE} external>
              Visit clearopfs.com <span aria-hidden="true">↗</span>
            </ButtonLink>
            <ButtonLink href="/" variant="secondary">
              Back to the suite
            </ButtonLink>
          </div>
        </div>

        <PanelMock />
      </div>
    </Container>

    <Section>
      <Container>
        <SectionHeading eyebrow="Two surfaces">
          The desktop panel, and the one that fits in a toolbar.
        </SectionHeading>

        <div class="mt-12 grid gap-6 md:grid-cols-2">
          {surfaces.map((surface) => (
            <div
              key={surface.name}
              class="border-light-text-color/10 bg-light-base dark:border-dark-text-color/10 dark:bg-dark-base rounded-3xl border p-8"
            >
              <h3 class="text-light-text-color dark:text-dark-text-color text-xl font-bold">
                {surface.name}
              </h3>
              <p class="text-accent-light dark:text-accent-dark mt-1.5 text-sm font-semibold">
                {surface.where}
              </p>
              <ul class="mt-6 space-y-2.5">
                {surface.features.map((feature) => (
                  <li
                    key={feature}
                    class="text-secondary-color-light dark:text-secondary-color-dark flex gap-3 leading-relaxed"
                  >
                    <span
                      aria-hidden="true"
                      class="text-accent-light dark:text-accent-dark mt-0.5 font-mono text-sm"
                    >
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>

    <Section class="border-light-text-color/8 bg-light-base/60 dark:border-dark-text-color/10 dark:bg-dark-base/40 border-y">
      <Container>
        <div class="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <h2 class="text-light-text-color dark:text-dark-text-color text-2xl font-bold text-balance sm:text-3xl">
              The full story lives at clearopfs.com
            </h2>
            <p class="text-secondary-color-light dark:text-secondary-color-dark mt-3 max-w-xl leading-relaxed">
              Install instructions, documentation and release notes are all on
              the product site.
            </p>
          </div>
          <ButtonLink href={CLEAROPFS_SITE} external class="shrink-0">
            Open clearopfs.com <span aria-hidden="true">↗</span>
          </ButtonLink>
        </div>
      </Container>
    </Section>
  </>
));

export const head = buildHead(
  "ClearOPFS",
  "A full Web Inspector panel for the Origin Private File System on macOS, plus a toolbar popup for iOS and iPadOS.",
  { path: "/clearopfs/" },
);
