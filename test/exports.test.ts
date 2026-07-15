import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describePackagesApiSnapshots } from 'tsnapi/vitest'

describePackagesApiSnapshots({
  cwd: fileURLToPath(new URL('..', import.meta.url)),
  filter(ctx) {
    const pkg = JSON.parse(
      readFileSync(`${ctx.packageRoot}/package.json`, 'utf8'),
    )
    if (!pkg.name || pkg.private)
      return false
    // `@vitejs/devtools-oxc` (donated from yuyinws/oxc-inspector) is a workspace
    // member, but its build is not wired into turbo yet (its @nuxt/ui client is
    // pending a UI-stack decision), so there is no dist to snapshot. Skip it
    // until the build is enabled.
    if (pkg.name === '@vitejs/devtools-oxc')
      return false
  },
})
