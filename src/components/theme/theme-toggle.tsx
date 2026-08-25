import { $, component$, useOnDocument, useSignal } from "@qwik.dev/core";
import { THEME_STORAGE_KEY, type Theme } from "./theme";

/**
 * The *visual* state of this button is pure CSS: both glyphs are rendered and
 * the `dark:` variants decide which one is visible, so the icon is already
 * correct at first paint — before Qwik has resumed, and regardless of whether
 * it ever does. The signal exists only to report `aria-pressed` accurately; it
 * stays `null` (and the attribute stays absent) until the DOM has been read,
 * rather than shipping an SSR guess that contradicts the visitor's theme.
 *
 * The click handler treats the DOM, not the signal, as the source of truth for
 * the toggle itself — the blocking head script is what set the class.
 */
export const ThemeToggle = component$(() => {
  const theme = useSignal<Theme | null>(null);

  useOnDocument(
    "qinit",
    $(() => {
      theme.value = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
    }),
  );

  const toggle = $(() => {
    const root = document.documentElement;
    const next: Theme = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    root.style.colorScheme = next;
    theme.value = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* private mode / storage disabled — the toggle still works for this page */
    }
  });

  return (
    <button
      type="button"
      onClick$={toggle}
      aria-label="Toggle dark theme"
      aria-pressed={theme.value === null ? undefined : theme.value === "dark"}
      class="border-light-text-color/10 text-light-text-color hover:border-light-text-color/25 dark:border-dark-text-color/15 dark:text-dark-text-color dark:hover:border-dark-text-color/30 inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
    >
      {/*
        PLACEHOLDER GLYPHS — the user is supplying the real toggle icon. Only
        the two <svg> bodies below need replacing; keep the wrapper, the
        `absolute inset-0` stacking and the opacity/`dark:` pairing, since that
        is what makes the correct icon show at first paint without JS.
      */}
      <span class="relative block h-4 w-4">
        {/* Sun — shown in light theme */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          aria-hidden="true"
          class="absolute inset-0 h-4 w-4 opacity-100 transition-opacity duration-200 dark:opacity-0"
        >
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
        </svg>
        {/* Moon — shown in dark theme */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          class="absolute inset-0 h-4 w-4 opacity-0 transition-opacity duration-200 dark:opacity-100"
        >
          <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.7 6.7 0 0 0 10.5 10.5Z" />
        </svg>
      </span>
    </button>
  );
});
