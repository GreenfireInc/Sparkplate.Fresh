<template>
  <nav class="navbar">
    <div class="navbar-content">
      <div class="navbar-left">
        <div class="menu-toggle" @click="toggleMenuType">
          <svg
            v-if="menuType === 'macro'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path fill="white" d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
          </svg>
          <svg
            v-if="menuType === 'micro'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path fill="white" d="M3 4h18v2H3V4zm0 7h12v2H3v-2zm0 7h18v2H3v-2z" />
          </svg>
        </div>
        <router-link to="/" class="brand-logo">
          Sparkplate
        </router-link>
      </div>
      <div class="navbar-right">
        <!-- <span class="total-assets">Total Assets: {{ totalAssets }}</span> -->
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useMenuState } from '@/composables/useMenuState.js'

const { menuType, toggleMenuType } = useMenuState()

const totalAssets = computed(() => {
  return '$0.00' // Placeholder value
})

export default {
  name: 'NavBar',
  setup() {
    return {
      menuType,
      totalAssets,
      toggleMenuType
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  background-color: #2563eb;
  color: white;
  height: 4rem;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 1.25rem;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.menu-toggle {
  margin-right: 1.25rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.25rem;
}

.menu-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.brand-logo {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  text-decoration: none;
}

.brand-logo:hover {
  color: white;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.total-assets {
  font-size: 0.875rem;
  margin-left: 2.5rem;
}
</style>
