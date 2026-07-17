import { watch } from 'vue'
import { isDark } from '../composables/dark'
import { COLOR_SCHEME_DARK, COLOR_SCHEME_LIGHT } from '../utils/color-scheme'

/**
 * Minimal structural type for the Nuxt app, avoiding a hard dependency on
 * Nuxt's types from within the shared UI package.
 */
interface NuxtAppLike {
  hook: (name: 'app:mounted', cb: () => void) => void
}

function applyColorScheme(dark: boolean): void {
  const el = document.documentElement
  el.classList.add(dark ? COLOR_SCHEME_DARK : COLOR_SCHEME_LIGHT)
  el.classList.remove(dark ? COLOR_SCHEME_LIGHT : COLOR_SCHEME_DARK)
  el.style.colorScheme = dark ? COLOR_SCHEME_DARK : COLOR_SCHEME_LIGHT
}

/**
 * Ensures the resolved color scheme is applied within the Nuxt app lifecycle.
 *
 * The `isDark` singleton is created via `useDark()` at module scope, so its own
 * `tryOnMounted` re-sync never fires (no component instance). Nuxt/unhead writes
 * `htmlAttrs.class` during mount, which can drop the theme class applied at
 * import time and leave the UI stuck in light mode until an unrelated reactive
 * flush (cursor move / scroll). Re-applying on `app:mounted` — after unhead has
 * set the attributes — fixes that. The `watch` keeps it in sync for runtime
 * toggles and OS theme changes.
 */
export function installColorMode(nuxtApp: NuxtAppLike): void {
  nuxtApp.hook('app:mounted', () => {
    applyColorScheme(isDark.value)
    watch(isDark, applyColorScheme, { flush: 'post' })
  })
}
