import { component$, Slot } from "@qwik.dev/core";

/** Section vertical rhythm, kept identical across pages. */
export const Section = component$<{ id?: string; class?: string }>(
  ({ id, class: cls }) => (
    <section id={id} class={["py-20 sm:py-28", cls]}>
      <Slot />
    </section>
  ),
);

export const SectionHeading = component$<{ eyebrow?: string }>(
  ({ eyebrow }) => (
    <div class="max-w-2xl">
      {eyebrow && (
        <p class="text-accent-light dark:text-accent-dark mb-3 text-xs font-semibold tracking-[0.18em] uppercase">
          {eyebrow}
        </p>
      )}
      <h2 class="text-light-text-color dark:text-dark-text-color text-3xl font-bold text-balance sm:text-4xl">
        <Slot />
      </h2>
    </div>
  ),
);
