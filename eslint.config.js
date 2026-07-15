// @ts-check
import antfu from '@antfu/eslint-config'
import nuxt from './packages/rolldown/src/.nuxt/eslint.config.mjs'

export default antfu({
  pnpm: true,
  ignores: [
    'skills',
    'plans',
    'e2e/fixtures/**/dist',
    'e2e/fixtures/**/.vite-devtools',
    // `packages/oxc` (donated from yuyinws/oxc-inspector) is parked out of the
    // workspace and still carries its own oxlint/oxfmt style; it is linted by
    // its own toolchain until its build is migrated onto the current APIs.
    'packages/oxc',
  ],
})
  .append(nuxt())
  .append({
    files: ['./packages/rolldown/src/node/**/*.ts'],
    rules: {
      'no-console': 'off',
    },
  })
  .removeRules(
    'vue/no-template-shadow',
    'pnpm/json-prefer-workspace-settings',
    'markdown/fenced-code-language',
    'e18e/prefer-static-regex',
    'e18e/prefer-spread-syntax',
  )
