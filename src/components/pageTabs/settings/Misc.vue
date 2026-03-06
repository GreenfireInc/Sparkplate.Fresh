<template>
  <div class="misc-settings">
    <h2 class="misc-title">Miscellaneous Settings</h2>

    <div class="misc-section">
      <h3 class="misc-section-title">Application</h3>
      <div class="misc-section-content">
        <div class="misc-field">
          <Label for="theme-select" class="misc-label">Theme</Label>
          <SelectRoot v-model="theme">
            <SelectTrigger
              id="theme-select"
              class="misc-select-trigger"
              aria-label="Choose theme"
            >
              <SelectValue placeholder="Choose theme" />
              <i class="bi bi-chevron-down misc-select-chevron" aria-hidden />
            </SelectTrigger>
            <SelectPortal>
              <SelectContent class="misc-select-content" position="popper" :side-offset="4">
                <SelectViewport class="misc-select-viewport">
                  <SelectItem value="Light" class="misc-select-item">
                    <SelectItemText>Light</SelectItemText>
                    <i class="bi bi-sun misc-select-icon" aria-hidden />
                  </SelectItem>
                  <SelectItem value="Dark" class="misc-select-item">
                    <SelectItemText>Dark</SelectItemText>
                    <i class="bi bi-moon misc-select-icon" aria-hidden />
                  </SelectItem>
                  <SelectItem value="System" class="misc-select-item">
                    <SelectItemText>System</SelectItemText>
                    <i class="bi bi-circle-half misc-select-icon" aria-hidden />
                  </SelectItem>
                </SelectViewport>
              </SelectContent>
            </SelectPortal>
          </SelectRoot>
        </div>

        <Separator class="misc-separator" />

        <div class="misc-row">
          <div class="misc-row-text">
            <span class="misc-row-title">Close to tray</span>
            <p class="misc-row-desc">Minimize to system tray when closed</p>
          </div>
          <label class="misc-toggle">
            <input type="checkbox" v-model="closeToTray" class="sr-only" />
            <span class="misc-toggle-track" />
          </label>
        </div>
      </div>
    </div>

    <div class="misc-actions">
      <button type="button" class="misc-save-btn" @click="onSave">
        <i class="bi bi-check-lg" aria-hidden /> Save settings
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Label,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectValue,
  SelectPortal,
  SelectViewport,
  Separator,
} from 'radix-vue'

const theme = ref('System')
const closeToTray = ref(false)

function onSave() {
  // Persist theme + closeToTray (e.g. localStorage or IPC)
}
</script>

<style lang="scss" scoped>
.misc-settings {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.misc-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1.5rem;
}

.misc-section {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 1.5rem;
  width: fit-content;
  max-width: 100%;
}

.misc-section-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  padding: 0.75rem 1rem;
  background: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
}

.misc-section-content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.misc-field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.misc-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.misc-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: max-content;
  min-width: 8rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #111827;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:hover {
    border-color: #9ca3af;
  }

  &[data-state='open'] {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
}

.misc-select-chevron {
  font-size: 0.75rem;
  color: #6b7280;
  pointer-events: none;
  transition: transform 0.15s;
}

.misc-select-trigger[data-state='open'] .misc-select-chevron {
  transform: rotate(180deg);
}

.misc-separator {
  height: 1px;
  background: #e5e7eb;
  margin: 1rem 0;
}

.misc-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.misc-row-text {
  flex: 1;
  min-width: 0;
}

.misc-row-title {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
}

.misc-row-desc {
  font-size: 0.8125rem;
  color: #6b7280;
  margin-top: 0.125rem;
}

.misc-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;
}

.misc-toggle-track {
  position: relative;
  width: 2.75rem;
  height: 1.5rem;
  border-radius: 9999px;
  background: #d1d5db;
  transition: background 0.2s;
  border: none;
}

.misc-toggle-track::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.misc-toggle input:checked + .misc-toggle-track {
  background: #3b82f6;
}

.misc-toggle input:checked + .misc-toggle-track::after {
  transform: translateX(1.25rem);
}

.misc-toggle input:focus-visible + .misc-toggle-track {
  outline: none;
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px #3b82f6;
}

.misc-actions {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
}

.misc-save-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
  background: #16a34a;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #15803d;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #16a34a;
  }
}
</style>

<!-- Unscoped: SelectContent portals to body -->
<style>
.misc-select-content {
  z-index: 10000;
  width: max-content;
  min-width: 7rem;
  max-height: var(--radix-select-content-available-height);
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -3px rgba(0, 0, 0, 0.06);
  padding: 0.25rem;
  animation: misc-select-in 0.12s ease;
}

.misc-select-viewport {
  padding: 0;
}

@keyframes misc-select-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.misc-select-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #374151;
  border-radius: 0.25rem;
  cursor: pointer;
  outline: none;
  user-select: none;
}

.misc-select-item[data-highlighted] {
  background: #eff6ff;
  color: #1d4ed8;
}

.misc-select-item[data-state='checked'] {
  background: #eff6ff;
  color: #1d4ed8;
  font-weight: 500;
}

.misc-select-icon {
  font-size: 1rem;
  color: #6b7280;
  flex-shrink: 0;
}

.misc-select-item[data-highlighted] .misc-select-icon,
.misc-select-item[data-state='checked'] .misc-select-icon {
  color: #3b82f6;
}
</style>
