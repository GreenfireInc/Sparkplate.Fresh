<template>
  <nav
    :class="['side-nav', menuType, { 'side-nav--compact': compact }]"
    :style="navStyle"
    aria-label="Main navigation"
  >
    <div class="side-nav__inner">
      <template v-for="(section, si) in navSections" :key="'s-' + si">
        <Separator
          v-if="si > 0"
          class="side-nav__separator"
          orientation="horizontal"
        />
        <div class="side-nav__group" role="list">
          <RouterLink
            v-for="item in section"
            :key="item.to"
            v-slot="{ isActive, href, navigate }"
            :to="item.to"
            custom
          >
            <a
              :href="href"
              role="listitem"
              class="nav-item"
              :class="{ active: linkIsActive(item, isActive) }"
              :title="item.title"
              :aria-current="linkIsActive(item, isActive) ? 'page' : undefined"
              @click="navigate($event)"
            >
              <component
                :is="item.icon"
                v-if="item.iconKind === 'lucide'"
                :size="iconPx"
                :color="pathColor(item)"
              />
              <i
                v-else
                class="bi bi-qr-code side-nav__icon-bi"
                aria-hidden="true"
                :style="{ fontSize: iconPx + 'px', color: pathColor(item) }"
              />
              <span v-if="menuType === 'macro'" class="nav-text">{{ item.label }}</span>
            </a>
          </RouterLink>
        </div>
      </template>
    </div>
  </nav>
</template>

<script setup lang="ts">
import 'bootstrap-icons/font/bootstrap-icons.css'
import {
  type Component,
  computed,
  onMounted,
  onUnmounted,
  ref,
} from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Separator } from 'radix-vue'
import {
  TestTubeIcon,
  FileTextIcon,
  CoinsIcon,
  LockIcon,
  NetworkIcon,
  BookUser as BookUserIcon,
  LayersIcon,
  LayoutDashboardIcon,
  RecycleIcon,
  HammerIcon,
  PackageIcon,
  UploadIcon,
  GamepadIcon,
  SettingsIcon,
} from 'lucide-vue-next'
import { useMenuState } from '../../composables/useMenuState'

defineOptions({ name: 'SideNav' })

type NavItem = {
  to: string
  title: string
  label: string
  icon?: Component
  iconKind: 'lucide' | 'bootstrap-qr'
}

const NAVBAR_PX = 64
const COMPACT_VH = 720

const route = useRoute()
const { menuType } = useMenuState()

const viewportH = ref(typeof window !== 'undefined' ? window.innerHeight : 800)

const compact = computed(() => viewportH.value < COMPACT_VH)

const iconPx = computed(() => (compact.value ? 16 : 18))

const navStyle = computed(() => ({
  height: `calc(100dvh - ${NAVBAR_PX}px)`,
  top: `${NAVBAR_PX}px`,
}))

const navSections: NavItem[][] = [
  [
    { to: '/dashboard', title: 'Dashboard', label: 'Dashboard', icon: LayoutDashboardIcon, iconKind: 'lucide' },
    { to: '/keyfiles', title: 'Key Files', label: 'Key Files', icon: FileTextIcon, iconKind: 'lucide' },
    { to: '/cryptocurrency', title: 'Cryptocurrency', label: 'Cryptocurrency', icon: CoinsIcon, iconKind: 'lucide' },
    { to: '/cryptography', title: 'Cryptography', label: 'Cryptography', icon: LockIcon, iconKind: 'lucide' },
  ],
  [
    { to: '/networking', title: 'Networking', label: 'Networking', icon: NetworkIcon, iconKind: 'lucide' },
    { to: '/addressbook', title: 'Address Book', label: 'Address Book', icon: BookUserIcon, iconKind: 'lucide' },
    { to: '/techstack', title: 'Tech Stack', label: 'Tech Stack', icon: LayersIcon, iconKind: 'lucide' },
    { to: '/repurposing', title: 'Repurposing', label: 'Repurposing', icon: RecycleIcon, iconKind: 'lucide' },
    { to: '/build', title: 'Build', label: 'Build', icon: HammerIcon, iconKind: 'lucide' },
    { to: '/package', title: 'Package', label: 'Package', icon: PackageIcon, iconKind: 'lucide' },
    { to: '/publish', title: 'Publish', label: 'Publish', icon: UploadIcon, iconKind: 'lucide' },
  ],
  [
    { to: '/games', title: 'Games', label: 'Games', icon: GamepadIcon, iconKind: 'lucide' },
    { to: '/sandbox', title: 'Sandbox', label: 'Sandbox', icon: TestTubeIcon, iconKind: 'lucide' },
    { to: '/qrcode', title: 'QR Code', label: 'QR Code', iconKind: 'bootstrap-qr' },
  ],
  [
    { to: '/settings', title: 'Settings', label: 'Settings', icon: SettingsIcon, iconKind: 'lucide' },
  ],
]

function linkIsActive(item: NavItem, routerLinkIsActive: boolean) {
  if (item.to === '/settings') return route.path.startsWith('/settings')
  return routerLinkIsActive
}

function pathColor(item: NavItem) {
  const isActive =
    item.to === '/settings'
      ? route.path.startsWith('/settings')
      : route.path === item.to
  return isActive ? '#2563eb' : '#6b7280'
}

function onViewportResize() {
  viewportH.value = window.innerHeight
}

onMounted(() => {
  window.addEventListener('resize', onViewportResize, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', onViewportResize)
})
</script>

<style scoped>
.side-nav {
  position: fixed;
  left: 0;
  width: 12rem;
  max-height: calc(100dvh - 4rem);
  background-color: #f9fafb;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  z-index: 999;
  transition: width 0.25s ease, padding 0.2s ease;
  overflow: hidden;
  box-sizing: border-box;
}

.side-nav.macro {
  width: 12rem;
}

.side-nav.micro {
  width: 4rem;
}

.side-nav--compact {
  padding: 0.35rem 0;
}

.side-nav__inner {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0;
  overflow: hidden;
}

.side-nav__group {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex: 0 0 auto;
}

.side-nav__separator {
  flex-shrink: 0;
  height: 1px;
  margin: 0.45rem 0.65rem;
  background: #e5e7eb;
}

.side-nav--compact .side-nav__separator {
  margin: 0.3rem 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.65rem 0.85rem;
  margin: 0 0.4rem;
  text-decoration: none !important;
  color: #6b7280;
  transition: background-color 0.15s ease, color 0.15s ease;
  border-radius: 0.375rem;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  position: relative;
}

.side-nav--compact .nav-item {
  padding: 0.45rem 0.55rem;
  margin: 0 0.3rem;
}

.nav-item:focus {
  outline: none;
}

.nav-item:focus-visible {
  box-shadow: inset 0 0 0 2px #2563eb;
}

.nav-item > :first-child {
  flex-shrink: 0;
}

.side-nav__icon-bi {
  line-height: 1;
  display: inline-block;
}

.nav-item:hover {
  background-color: #e5e7eb;
  color: #374151;
}

.nav-item.active {
  background-color: #dbeafe;
  color: #2563eb;
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 60%;
  background: #2563eb;
  border-radius: 0 2px 2px 0;
}

.micro .nav-item {
  justify-content: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.micro .nav-item.active::before {
  height: 70%;
}

.nav-text {
  margin-left: 0.65rem;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.side-nav--compact .nav-text {
  font-size: 0.8125rem;
  margin-left: 0.55rem;
}
</style>
