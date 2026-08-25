import { component$, Slot } from "@qwik.dev/core";

/** The one horizontal rhythm every section shares. */
export const Container = component$<{ class?: string }>(({ class: cls }) => (
  <div class={["mx-auto w-full max-w-6xl px-6 sm:px-8", cls]}>
    <Slot />
  </div>
));
