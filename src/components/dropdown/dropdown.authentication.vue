<template>
  <DropdownMenuRoot v-model:open="userMenuOpen">
    <DropdownMenuTrigger
      class="auth-dropdown-trigger"
      :class="{ 'auth-dropdown-trigger--authenticated': isAuthenticated }"
      :title="isAuthenticated ? currentUser?.name : t('account')"
    >
      <User :size="20" /> <!-- Will add gravatar support here once we have the user's email -->
      <span class="auth-dropdown-label">
        {{ isAuthenticated ? currentUser?.name : t('account') }}
      </span>
      <ChevronDown :size="16" class="auth-dropdown-chevron" :class="{ 'auth-dropdown-chevron--open': userMenuOpen }" />
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent class="auth-dropdown-menu" :side-offset="6" align="end">
        <DropdownMenuItem as-child>
          <router-link to="/settings/User" class="auth-dropdown-item" @click="closeMenu">
            <User :size="16" />
            {{ t('profile') }}
          </router-link>
        </DropdownMenuItem>
        <DropdownMenuSeparator class="auth-dropdown-separator" />
        <DropdownMenuItem class="auth-dropdown-item auth-dropdown-item--logout" @click="handleLogout">
          <LogOut :size="16" />
          {{ t('logout') }}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LogOut, User, ChevronDown } from 'lucide-vue-next'
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from 'radix-vue'
import { useAuth } from '@/composables/useAuth'
import { useI18n } from '@/composables/useI18n'

const { logout, currentUser, isAuthenticated } = useAuth()
const { t } = useI18n()

const userMenuOpen = ref(false)

function closeMenu() {
  userMenuOpen.value = false
}

function handleLogout() {
  if (confirm(t('logoutConfirm'))) {
    logout()
    closeMenu()
  }
}
</script>

<style scoped>
.auth-dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.375rem;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.auth-dropdown-trigger:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.auth-dropdown-trigger--authenticated .auth-dropdown-label {
  font-weight: 600;
}

.auth-dropdown-label {
  font-weight: 500;
}

.auth-dropdown-chevron {
  opacity: 0.8;
  transition: transform 0.2s ease;
}

.auth-dropdown-chevron--open {
  transform: rotate(180deg);
}

@media (max-width: 768px) {
  .auth-dropdown-label {
    display: none;
  }

  .auth-dropdown-trigger {
    padding: 0.5rem;
  }
}
</style>

<style>
/* Unscoped: DropdownMenuPortal renders outside component DOM */
.auth-dropdown-menu {
  min-width: 180px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 4px 10px -3px rgba(0, 0, 0, 0.07);
  padding: 0.25rem;
  z-index: 10001;
  animation: auth-dropdown-menu-in 0.12s ease;
}

.auth-dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #374151;
  text-decoration: none;
  border-radius: 0.25rem;
  cursor: pointer;
  outline: none;
}

.auth-dropdown-item:hover,
.auth-dropdown-item[data-highlighted] {
  background: #f3f4f6;
  color: #1f2937;
}

.auth-dropdown-item--logout {
  color: #dc2626;
}

.auth-dropdown-item--logout:hover,
.auth-dropdown-item--logout[data-highlighted] {
  background: #fef2f2;
  color: #b91c1c;
}

.auth-dropdown-separator {
  height: 1px;
  background: #e5e7eb;
  margin: 0.25rem 0;
}

@keyframes auth-dropdown-menu-in {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
