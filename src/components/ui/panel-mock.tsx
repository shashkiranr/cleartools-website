import { component$ } from "@qwik.dev/core";

/**
 * A static, decorative impression of the ClearOPFS inspector panel — markup and
 * Tailwind only, no screenshot. It exists so the hero shows the shape of the
 * product without shipping an image that would go stale the moment the panel's
 * UI changes. `aria-hidden` because it says nothing a screen reader needs; the
 * prose beside it carries the meaning.
 *
 * The box-drawing glyphs (▾ ▸ ▮) fall outside the latin subset of the self-
 * hosted font and render from the system fallback stack — see global.css.
 */
export const PanelMock = component$(() => (
  <div
    aria-hidden="true"
    class="border-light-text-color/10 bg-light-base dark:border-dark-text-color/10 dark:bg-dark-base overflow-hidden rounded-2xl border shadow-2xl shadow-black/5 dark:shadow-black/40"
  >
    {/* Title bar */}
    <div class="border-light-text-color/8 dark:border-dark-text-color/10 flex items-center gap-2 border-b px-4 py-3">
      <span class="bg-light-text-color/15 dark:bg-dark-text-color/20 h-2.5 w-2.5 rounded-full" />
      <span class="bg-light-text-color/15 dark:bg-dark-text-color/20 h-2.5 w-2.5 rounded-full" />
      <span class="bg-light-text-color/15 dark:bg-dark-text-color/20 h-2.5 w-2.5 rounded-full" />
      <span class="text-secondary-color-light dark:text-secondary-color-dark ml-2 font-mono text-xs">
        ClearOPFS
      </span>
      <span class="text-accent-light dark:text-accent-dark ml-auto font-mono text-[11px]">
        1.8 MB / 2.0 GB
      </span>
    </div>

    <div class="grid grid-cols-[minmax(0,1fr)] sm:grid-cols-[190px_minmax(0,1fr)]">
      {/* Tree view */}
      <div class="border-light-text-color/8 dark:border-dark-text-color/10 space-y-1.5 p-4 font-mono text-xs sm:border-r">
        {[
          { d: 0, n: "▾ /", active: false },
          { d: 1, n: "▾ cache", active: false },
          { d: 2, n: "▮ index.db", active: true },
          { d: 2, n: "▮ blobs.bin", active: false },
          { d: 1, n: "▸ uploads", active: false },
          { d: 1, n: "▮ session.json", active: false },
        ].map((row, i) => (
          <div
            key={i}
            style={{ paddingLeft: `${row.d * 12}px` }}
            class={[
              "truncate rounded px-1.5 py-1",
              row.active
                ? "bg-accent-light/10 text-accent-light dark:bg-accent-dark/15 dark:text-accent-dark"
                : "text-secondary-color-light dark:text-secondary-color-dark",
            ]}
          >
            {row.n}
          </div>
        ))}
      </div>

      {/* Detail pane */}
      <div class="space-y-3 p-4">
        <div class="text-light-text-color dark:text-dark-text-color font-mono text-xs">
          index.db
        </div>
        {[
          ["Kind", "File"],
          ["Size", "412 KB"],
          ["Path", "/cache/index.db"],
          ["Modified", "Today, 09:41"],
        ].map(([k, v]) => (
          <div
            key={k}
            class="flex items-baseline justify-between gap-4 text-xs"
          >
            <span class="text-secondary-color-light dark:text-secondary-color-dark">
              {k}
            </span>
            <span class="text-light-text-color dark:text-dark-text-color truncate font-mono">
              {v}
            </span>
          </div>
        ))}
        <div class="border-light-text-color/8 dark:border-dark-text-color/10 flex flex-wrap gap-2 border-t pt-3">
          {["Download", "Rename", "Delete"].map((a) => (
            <span
              key={a}
              class="border-light-text-color/10 text-secondary-color-light dark:border-dark-text-color/15 dark:text-secondary-color-dark rounded-full border px-2.5 py-1 text-[11px]"
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
));
