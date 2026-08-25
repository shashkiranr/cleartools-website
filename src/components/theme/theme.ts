/**
 * Dark mode here is **class-toggled**, not `prefers-color-scheme`: `global.css`
 * declares `@custom-variant dark (&:where(.dark, .dark *))`, so every `dark:`
 * utility keys off a `.dark` class on <html> rather than the media query.
 *
 * That means something has to put the class there before first paint, or the
 * page flashes light before the toggle resumes. Qwik resumes lazily — a
 * `useVisibleTask$` runs far too late — so the class is set by the blocking
 * inline script below, which runs synchronously in <head>. The Qwik toggle
 * component only ever reads and re-writes what this script established.
 */
export const THEME_STORAGE_KEY = "cleartools-theme";

export type Theme = "light" | "dark";

/**
 * Kept as a string (not a `$`-scoped QRL) because it is injected verbatim into
 * a <script> in the document head — it must not depend on the Qwik runtime
 * having loaded. `documentElement.style.colorScheme` is set alongside the class
 * so form controls, scrollbars and the browser's own canvas match the theme.
 */
export const themeInitScript = `(function(){try{var k=${JSON.stringify(
  THEME_STORAGE_KEY,
)};var s=localStorage.getItem(k);var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;var e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light";}catch(e){}})();`;
