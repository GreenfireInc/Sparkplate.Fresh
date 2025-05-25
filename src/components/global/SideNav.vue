<template>
  <nav :class="['side-nav', menuType]">
    <router-link
      to="/keyfiles"
      class="nav-item"
      :class="{ active: $route.path === '/keyfiles' }"
      title="Key Files"
    >
      <FileTextIcon :size="20" :color="pathColor('/keyfiles')" />
      <span v-if="menuType === 'macro'" class="nav-text">Key Files</span>
    </router-link>
    
    <router-link
      to="/test"
      class="nav-item"
      :class="{ active: $route.path === '/test' }"
    >
      <TestTubeIcon :size="20" :color="pathColor('/test')" />
      <span v-if="menuType === 'macro'" class="nav-text">Test</span>
    </router-link>
    
    <router-link
      to="/settings"
      class="nav-item"
      :class="{ active: $route.path === '/settings' }"
    >
      <SettingsIcon :size="20" :color="pathColor('/settings')" />
      <span v-if="menuType === 'macro'" class="nav-text">Settings</span>
    </router-link>
  </nav>
</template>

<script lang="ts">
import { TestTubeIcon, SettingsIcon, FileTextIcon } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { useMenuState } from '../../composables/useMenuState'

export default {
  name: 'SideNav',
  components: {
    TestTubeIcon,
    SettingsIcon,
    FileTextIcon
  },
  setup() {
    const route = useRoute()
    const { menuType } = useMenuState()

    const pathColor = (path: string) => {
      return route.path === path ? '#3b82f6' : '#6b7280'
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
  color: #374151;
  text-decoration: none;
  transition: all 0.2s ease;
  margin: 0.125rem 0.5rem;
  border-radius: 0.375rem;
}

.nav-item:hover {
  background-color: #e2e8f0;
  color: #1f2937;
}

.nav-item.active {
  background-color: #dbeafe;
  color: #1d4ed8;
}

.nav-text {
  margin-left: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
}

.side-nav.micro .nav-item {
  justify-content: center;
  padding: 0.75rem;
}

.side-nav.micro .nav-text {
  display: none;
}
</style>
