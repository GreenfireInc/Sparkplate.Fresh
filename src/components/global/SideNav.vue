<template>
  <aside :class="menuType" class="sidenav">
    <router-link to="/directories" class="nav-link">
      <span class="icon">
        <FolderIcon :size="20" :color="pathColor('directories')" />
      </span>
      <span class="link-text">Directories</span>
    </router-link>

    <router-link to="/test" class="nav-link">
      <span class="icon">
        <TestTubeIcon :size="20" :color="pathColor('test')" />
      </span>
      <span class="link-text">Test</span>
    </router-link>

    <router-link to="/settings/user" class="nav-link">
      <span class="icon">
        <SettingsIcon :size="20" :color="pathColor('settings')" />
      </span>
      <span class="link-text">Settings</span>
    </router-link>
  </aside>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { FolderIcon, TestTubeIcon, SettingsIcon } from 'lucide-vue-next'
// import { useUIStore } from '@/stores/uiStore'

// import FilesIcon from '../icons/Files.vue'
// import SettingsIcon from '../icons/Settings.vue'
// import WalletIcon from '../icons/Wallet.vue'

// Store setup
// const uiStore = useUIStore()
const route = useRoute()

// Reactive state
const path = ref('')
const menuType = ref('macro') // Default value for now

// Computed properties
// const menuType = computed(() => uiStore.getMenuType)

// Lifecycle hooks
onMounted(() => {
  path.value = route.path
})

// Watchers
watch(route, (to) => {
  path.value = to.path
})

// Methods
const pathColor = (pathName) => {
  const actualPath = path.value.split('/')[1]
  return actualPath === `${pathName}`
    ? '#1d4ed8' // Blue for active
    : '#6b7280' // Gray for inactive
}

export default {
  name: 'SideNav',
  components: {
    FolderIcon,
    TestTubeIcon,
    SettingsIcon
  },
  setup() {
    return {
      menuType,
      pathColor,
      path
    }
  }
}
</script>

<style scoped>
.sidenav {
  height: calc(100vh - 4rem);
  margin-top: 4rem;
  background-color: white;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 900;
}

.macro {
  width: 240px;
}

.micro {
  width: 80px;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  font-weight: 500;
  color: #374151;
  text-decoration: none;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.nav-link.router-link-exact-active {
  position: relative;
  color: #1d4ed8;
  font-weight: 600;
  background-color: #eff6ff;
}

.nav-link.router-link-exact-active:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  background-color: #1d4ed8;
  height: 100%;
  border-radius: 9999px;
  width: 2px;
}

.macro .icon {
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
}

.macro .link-text {
  padding-right: 0.5rem;
  width: max-content;
}

.micro .link-text {
  display: none;
}

.micro .nav-link {
  justify-content: center;
}

.micro .icon {
  margin-right: 0;
}
</style>
