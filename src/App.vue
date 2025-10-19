<script setup lang="ts">
import { ref, provide } from 'vue'
import NavBar from './components/global/NavBar.vue'
import SideNav from './components/global/SideNav.vue'
import About from './components/global/About.vue'
import KeyboardShortcuts from './components/global/KeyboardShortcuts.vue'
import LoginStandard from './components/authentication/loginStandard/LoginStandard.vue'
import MarqueeTicker from './components/partials/marqueeTicker/MarqueeTicker.vue'
import { useMenuState } from './composables/useMenuState'
import { useAuth } from './composables/useAuth'

const { menuType } = useMenuState()
const { isAuthenticated } = useAuth()

// App start time - set when the app initializes
const appStartTime = ref(Date.now())
provide('appStartTime', appStartTime)
</script>

<template>
  <div id="app">
    <!-- MarqueeTicker at the top - only when not authenticated -->
    <div v-if="!isAuthenticated" class="w-full z-30 relative">
      <MarqueeTicker />
    </div>
    
    <NavBar v-if="isAuthenticated" />
    <SideNav v-if="isAuthenticated" />
    <main v-if="isAuthenticated" class="main-content" :class="menuType">
      <router-view />
    </main>
    <LoginStandard v-if="!isAuthenticated" />
    <About />
    <KeyboardShortcuts />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  color: #213547;
  background-color: #ffffff;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.view {
  height: 100%;
  padding: 0 0.75rem;
  overflow-y: auto;
}

.main-content {
  margin-top: 4rem; /* Account for navbar height */
  /* Removed all padding to give full height to content */
  transition: margin-left 0.3s ease;
  height: calc(100vh - 4rem); /* Account for navbar height only */
  overflow-y: hidden;
  flex: 1;
}

.main-content.macro {
  margin-left: 12rem; /* Account for macro sidebar width */
}

.main-content.micro {
  margin-left: 4rem; /* Account for micro sidebar width */
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo.electron:hover {
  filter: drop-shadow(0 0 2em #9FEAF9);
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
