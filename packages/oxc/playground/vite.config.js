import { DevTools } from '@vitejs/devtools'
import { defineConfig } from 'vite'
import { DevToolsOxc } from '@vitejs/devtools-oxc/vite'

export default defineConfig({
  plugins: [DevTools(), DevToolsOxc()],
  build: {
    rolldownOptions: {
      devtools: {}, // enable devtools mode
    },
  },
})
