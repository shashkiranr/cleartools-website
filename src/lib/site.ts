/**
 * Single source of truth for site-wide copy, navigation and outbound links.
 *
 * Everything the marketing pages assert about the product lives here so that a
 * claim is changed in one place rather than hunted across routes. Anything the
 * repo cannot verify — store URLs, pricing, platform availability — is marked
 * TODO rather than guessed.
 */

export const site = {
  name: "Clear Tools",
  domain: "clear.tools",
  url: "https://clear.tools",
  tagline: "Tools for the next phase of the web.",
  description:
    "Clear Tools is a suite of software for building on the modern web. First up: ClearOPFS, a real file inspector for the browser's Origin Private File System.",
} as const;

/**
 * TODO(user): replace with the real extension-store / App Store URLs once they
 * exist. Until then every install affordance points at the product site, which
 * is where the current install instructions live — a live link rather than a
 * dead `#`.
 */
export const CLEAROPFS_SITE = "https://clearopfs.com";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  blurb: string;
  href: string;
  external: string;
  status: "available" | "coming-soon";
};

export const products: Product[] = [
  {
    slug: "clearopfs",
    name: "ClearOPFS",
    tagline: "The Origin Private File System, made visible.",
    blurb:
      "A full Web Inspector panel for browsing, editing and moving files in OPFS — plus a toolbar popup that brings the same tools to iOS and iPadOS.",
    href: "/clearopfs/",
    external: CLEAROPFS_SITE,
    status: "available",
  },
];

export const nav = [{ label: "ClearOPFS", href: "/clearopfs/" }] as const;

export const footerNav = [{ label: "ClearOPFS", href: "/clearopfs/" }] as const;
