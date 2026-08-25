/**
 * WHAT IS THIS FILE?
 *
 * It's the entry point for the Vercel Edge function when building for the
 * `vercel-edge` adapter — the deploy target for clear.tools. The adapter's
 * config (`adapters/vercel-edge/vite.config.ts`) names this file as its rollup
 * input, so it must exist for `npm run build.server` to succeed.
 */
import {
  createQwikRouter,
  type PlatformVercel,
} from "@qwik.dev/router/middleware/vercel-edge";
import render from "./entry.ssr";

declare global {
  type QwikRouterPlatform = PlatformVercel;
}

export default createQwikRouter({ render });
