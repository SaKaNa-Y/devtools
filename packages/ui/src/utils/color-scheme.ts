/**
 * Shared color-scheme constants and the anti-FOUC inline script.
 *
 * This module must stay side-effect free (no VueUse / no `dark.ts` import) so
 * it can be imported from `nuxt.config.ts` at build time in Node, where
 * `window` is unavailable.
 *
 * The storage key and class names are the single source of truth shared by the
 * `useDark()` singleton in `../composables/dark` and the inline head script,
 * so the two can never drift apart.
 */

export const COLOR_SCHEME_STORAGE_KEY = 'vite-devtools-color-scheme'
export const COLOR_SCHEME_DARK = 'dark'
export const COLOR_SCHEME_LIGHT = 'light'

/**
 * Returns a minified IIFE to be inlined in `<head>` so the resolved theme is
 * applied to `<html>` before first paint, eliminating the flash of light theme.
 *
 * It mirrors `useDark`'s `auto` resolution exactly: honor a stored
 * `dark`/`light` value, otherwise fall back to the OS `prefers-color-scheme`.
 */
export function getColorSchemeHeadScript(): string {
  const key = JSON.stringify(COLOR_SCHEME_STORAGE_KEY)
  const dark = JSON.stringify(COLOR_SCHEME_DARK)
  const light = JSON.stringify(COLOR_SCHEME_LIGHT)
  return `;(function(){try{`
    + `var v=localStorage.getItem(${key});`
    + `var d=v===${dark}||((v===null||v==='auto')&&matchMedia('(prefers-color-scheme: dark)').matches);`
    + `var el=document.documentElement;`
    + `el.classList.add(d?${dark}:${light});el.classList.remove(d?${light}:${dark});`
    + `el.style.colorScheme=d?${dark}:${light};`
    + `}catch(e){}})();`
}
