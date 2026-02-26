<template>
  <nav :class="['side-nav', menuType]">
    <router-link
      to="/keyfiles"
      class="nav-item"
      :class="{ active: $route.path === '/keyfiles' }"
      title="Key Files"
    >
      <FileTextIcon :size="18" :color="pathColor('/keyfiles')" />
      <span v-if="menuType === 'macro'" class="nav-text">Key Files</span>
    </router-link>
    
    <router-link
      to="/cryptocurrency"
      class="nav-item"
      :class="{ active: $route.path === '/cryptocurrency' }"
      title="Cryptocurrency"
    >
      <CoinsIcon :size="18" :color="pathColor('/cryptocurrency')" />
      <span v-if="menuType === 'macro'" class="nav-text">Cryptocurrency</span>
    </router-link>
    
    <router-link
      to="/cryptography"
      class="nav-item"
      :class="{ active: $route.path === '/cryptography' }"
      title="Cryptography"
    >
      <LockIcon :size="18" :color="pathColor('/cryptography')" />
      <span v-if="menuType === 'macro'" class="nav-text">Cryptography</span>
    </router-link>

    <!-- Divider -->
    <div class="nav-divider"></div>
    
    <router-link
      to="/networking"
      class="nav-item"
      :class="{ active: $route.path === '/networking' }"
      title="Networking"
    >
      <NetworkIcon :size="18" :color="pathColor('/networking')" />
      <span v-if="menuType === 'macro'" class="nav-text">Networking</span>
    </router-link>
    
    <router-link
      to="/techstack"
      class="nav-item"
      :class="{ active: $route.path === '/techstack' }"
      title="Tech Stack"
    >
      <LayersIcon :size="18" :color="pathColor('/techstack')" />
      <span v-if="menuType === 'macro'" class="nav-text">Tech Stack</span>
    </router-link>
    
    <router-link
      to="/repurposing"
      class="nav-item"
      :class="{ active: $route.path === '/repurposing' }"
      title="Repurposing"
    >
      <RecycleIcon :size="18" :color="pathColor('/repurposing')" />
      <span v-if="menuType === 'macro'" class="nav-text">Repurposing</span>
    </router-link>
    
    <router-link
      to="/build"
      class="nav-item"
      :class="{ active: $route.path === '/build' }"
      title="Build"
    >
      <HammerIcon :size="18" :color="pathColor('/build')" />
      <span v-if="menuType === 'macro'" class="nav-text">Build</span>
    </router-link>
    
    <router-link
      to="/package"
      class="nav-item"
      :class="{ active: $route.path === '/package' }"
      title="Package"
    >
      <PackageIcon :size="18" :color="pathColor('/package')" />
      <span v-if="menuType === 'macro'" class="nav-text">Package</span>
    </router-link>
    
    <router-link
      to="/publish"
      class="nav-item"
      :class="{ active: $route.path === '/publish' }"
      title="Publish"
    >
      <UploadIcon :size="18" :color="pathColor('/publish')" />
      <span v-if="menuType === 'macro'" class="nav-text">Publish</span>
    </router-link>

    <!-- Divider -->
    <div class="nav-divider"></div>
    
    <router-link
      to="/games"
      class="nav-item"
      :class="{ active: $route.path === '/games' }"
      title="Games"
    >
      <GamepadIcon :size="18" :color="pathColor('/games')" />
      <span v-if="menuType === 'macro'" class="nav-text">Games</span>
    </router-link>
    
    <router-link
      to="/sandbox"
      class="nav-item"
      :class="{ active: $route.path === '/sandbox' }"
      title="Sandbox"
    >
      <TestTubeIcon :size="18" :color="pathColor('/sandbox')" />
      <span v-if="menuType === 'macro'" class="nav-text">Sandbox</span>
    </router-link>

    <router-link
      to="/qrcode"
      class="nav-item"
      :class="{ active: $route.path === '/qrcode' }"
      title="QR Code"
    >
      <QrCodeIcon :size="18" :color="pathColor('/qrcode')" />
      <span v-if="menuType === 'macro'" class="nav-text">QR Code</span>
    </router-link>

    <!-- Divider -->
    <div class="nav-divider"></div>
    
    <router-link
      to="/settings"
      class="nav-item"
      :class="{ active: $route.path.startsWith('/settings') }"
      title="Settings"
    >
      <SettingsIcon :size="18" :color="pathColor('/settings')" />
      <span v-if="menuType === 'macro'" class="nav-text">Settings</span>
    </router-link>
  </nav>
</template>

<script lang="ts">
import { 
  TestTubeIcon, 
  FileTextIcon, 
  CoinsIcon, 
  LockIcon,
  NetworkIcon,
  LayersIcon,
  RecycleIcon,
  HammerIcon,
  PackageIcon,
  UploadIcon,
  GamepadIcon,
  QrCode,
  SettingsIcon
} from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { useMenuState } from '../../composables/useMenuState'

export default {
  name: 'SideNav',
  components: {
    TestTubeIcon,
    FileTextIcon,
    CoinsIcon,
    LockIcon,
    NetworkIcon,
    LayersIcon,
    RecycleIcon,
    HammerIcon,
    PackageIcon,
    UploadIcon,
    GamepadIcon,
    QrCode,
    SettingsIcon
  },
  setup() {
    const route = useRoute()
    const { menuType } = useMenuState()

    const pathColor = (path: string) => {
      const isActive = path === '/settings' 
        ? route.path.startsWith('/settings')
        : route.path === path
      return isActive ? '#3b82f6' : '#6b7280'
    }

    return {
      menuType,
      pathColor
    }
  }
}
</script>

<style scoped>
.side-nav {
  position: fixed;
  top: 4rem;
  left: 0;
  height: calc(100vh - 4rem);
  background-color: #f8fafc;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  z-index: 999;
  transition: width 0.3s ease;
  overflow-y: auto;
}

.side-nav.macro {
  width: 12rem;
}

.side-nav.micro {
  width: 4rem;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  text-decoration: none !important;
  color: #6b7280;
  transition: background-color 0.2s ease;
  border-radius: 0.5rem;
  margin: 0 0.5rem;
  /* Prevent Alt key access-key underline and focus outline from distorting icons */
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

.nav-item:focus {
  outline: none;
}

.nav-item:focus-visible {
  /* Use box-shadow instead of outline to avoid triggering overflow/scrollbar when Alt is pressed */
  box-shadow: inset 0 0 0 2px #3b82f6;
}

/* Prevent icons from shrinking when focus/Alt causes layout recalculation */
.nav-item > :first-child {
  flex-shrink: 0;
}

.nav-item:hover {
  background-color: #e2e8f0;
}

.nav-item.active {
  background-color: #dbeafe;
  color: #3b82f6;
}

.nav-text {
  margin-left: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.nav-divider {
  height: 1px;
  background-color: #e2e8f0;
  margin: 1rem 0.5rem;
}
</style>
