import { useDark } from '@vueuse/core'
import { COLOR_SCHEME_LIGHT, COLOR_SCHEME_STORAGE_KEY } from '../utils/color-scheme'

export const isDark = useDark({
  storageKey: COLOR_SCHEME_STORAGE_KEY,
  valueLight: COLOR_SCHEME_LIGHT,
})

export function toggleDark() {
  isDark.value = !isDark.value
}
