import { component$, Slot } from "@qwik.dev/core";
import type { RequestHandler } from "@qwik.dev/router";
import { Header } from "~/components/header/header";
import { Footer } from "~/components/footer/footer";

/**
 * Marketing pages are fully static, so they are cached at the edge and
 * revalidated in the background — a visitor never waits on a render.
 */
export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export default component$(() => (
  <div class="flex min-h-screen flex-col">
    <Header />
    <main class="flex-1">
      <Slot />
    </main>
    <Footer />
  </div>
));
