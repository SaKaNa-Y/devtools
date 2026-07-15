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
    // `@vitejs/devtools-oxc` (donated from yuyinws/oxc-inspector) is parked out
    // of the workspace and not built here; skip its export snapshot until its
    // build is migrated onto the current devframe/hub APIs.
    if (pkg.name === '@vitejs/devtools-oxc')
      return false
  },
})
