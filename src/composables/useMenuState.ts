/**
 * useMenuState — thin compatibility shim over `useSettingsStore`.
 *
 * The menu state was absorbed into the Pinia settings store (Phase 1 of the Vuex→Pinia
 * methodology, 06032026). This shim preserves the original composable API so existing
 * consumers (NavBar, SideNav, App, KeyboardShortcuts) need no changes; new code should
 * prefer `useSettingsStore()` directly.
 *
 * NOTE: must be called within a component `setup()` / `<script setup>` (it resolves the
 * active Pinia instance) — not at module scope.
 */
import { storeToRefs } from 'pinia'
import { useSettingsStore, type MenuType } from '@/stores/useSettingsStore'

export type { MenuType }

export function useMenuState() {
  const store = useSettingsStore()
  const { menuType } = storeToRefs(store)

  return {
    menuType,
    changeMenuType: store.changeMenuType,
    toggleMenuType: store.toggleMenuType,
  }
}
