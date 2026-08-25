import { component$, Slot } from "@qwik.dev/core";
import { Link } from "@qwik.dev/router";

type Variant = "primary" | "secondary";

/**
 * Anchor-shaped button. `external` links get the usual rel hardening and render
 * as a plain <a>, since Qwik's <Link> is for in-app navigation only.
 */
type Props = {
  href: string;
  variant?: Variant;
  external?: boolean;
  class?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-light text-light-base hover:bg-accent-light/90 focus-visible:outline-accent-light dark:bg-accent-dark dark:text-dark-foundation dark:hover:bg-accent-dark/90 dark:focus-visible:outline-accent-dark",
  secondary:
    "border border-light-text-color/15 text-light-text-color hover:border-light-text-color/35 hover:bg-light-text-color/5 focus-visible:outline-light-text-color dark:border-dark-text-color/20 dark:text-dark-text-color dark:hover:border-dark-text-color/40 dark:hover:bg-dark-text-color/5 dark:focus-visible:outline-dark-text-color",
};

export const ButtonLink = component$<Props>(
  ({ href, variant = "primary", external = false, class: cls }) => {
    const classes = [base, variants[variant], cls];
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" class={classes}>
        <Slot />
      </a>
    ) : (
      <Link href={href} class={classes}>
        <Slot />
      </Link>
    );
  },
);
