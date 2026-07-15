import type { PluginWithDevTools } from '@vitejs/devtools-kit'
import { rpcFunctions } from './node/rpc'
import { clientPublicDir } from './dirs'

export function DevToolsOxc(): PluginWithDevTools {
  return {
    name: 'devtools-oxc',
    devtools: {
      setup(ctx) {
        for (const fn of rpcFunctions) {
          ctx.rpc.register(fn as any)
        }

        ctx.views.hostStatic('/.devtools-oxc/', clientPublicDir)

        ctx.docks.register({
          id: 'devtools-oxc',
          title: 'Oxc Inspector',
          icon: 'https://viteplus.dev/projects/oxc.svg',
          type: 'iframe',
          url: '/.devtools-oxc/',
        })
      },
    },
  }
}
