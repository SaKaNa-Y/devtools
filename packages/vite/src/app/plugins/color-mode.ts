import { installColorMode } from '@vitejs/devtools-ui/plugins/color-mode'
import { defineNuxtPlugin } from '#app/nuxt'

export default defineNuxtPlugin((nuxtApp) => {
  installColorMode(nuxtApp)
})
