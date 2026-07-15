import type { PluginWithDevTools } from '@vitejs/devtools-kit'
import { rpcFunctions } from './node/rpc'
import { clientPublicDir } from './dirs'  

const DEVTOOLS_VITEPLUS_GROUP_ID = '~viteplus'
const OXC_DEVTOOLS_BASE = '/__devtools-oxc/'

export function DevToolsOxc(): PluginWithDevTools {
  return {
    name: 'devtools-oxc',
    devtools: {
      setup(ctx) {
        for (const fn of rpcFunctions) {
          ctx.rpc.register(fn as any)
        }

        ctx.views.hostStatic(OXC_DEVTOOLS_BASE, clientPublicDir)

        ctx.docks.register({
          id: 'oxc',
          title: 'Oxc',
          icon: OXC_DEVTOOLS_BASE + 'favicon.svg',
          type: 'iframe',
          url: OXC_DEVTOOLS_BASE,
          groupId: DEVTOOLS_VITEPLUS_GROUP_ID,
        })
      },
    },
  }
}
