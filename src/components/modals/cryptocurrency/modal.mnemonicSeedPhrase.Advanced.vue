<template>
  <DialogRoot :open="open" @update:open="onDialogOpenChange">
    <DialogPortal>
      <DialogOverlay class="mnp-adv-overlay" />
      <DialogContent
        class="mnp-adv-modal rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-2xl"
        aria-describedby="mnp-adv-desc"
      >
        <div class="mnp-adv-shell">
          <header class="mnp-adv-header">
            <div class="mnp-adv-header-row">
              <div class="mnp-adv-title-group">
                <DialogTitle class="mnp-adv-title">
                  Mnemonic tools
                </DialogTitle>
                <DialogDescription id="mnp-adv-desc" class="mnp-adv-subtitle">
                  BIP39 expansion, checksum validation, and related options.
                </DialogDescription>
              </div>
              <DialogClose class="mnp-adv-header-close" aria-label="Close" type="button">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </DialogClose>
            </div>
          </header>

          <Separator class="h-px w-full shrink-0 bg-gray-200 dark:bg-gray-600" />

          <div class="mnp-adv-body">
            <TabsRoot v-model="activeTab" class="mnp-adv-tabs">
              <TabsList class="mnp-adv-tabs__list" aria-label="Mnemonic tool sections">
                <TabsTrigger value="general" class="mnp-adv-tabs__trigger">
                  General
                </TabsTrigger>
                <TabsTrigger value="checksum" class="mnp-adv-tabs__trigger">
                  Checksum
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general" class="mnp-adv-tabs__panel">
                <TabMnemonicSeedPhraseAdvancedGeneral
                  :open="open"
                  :seed-phrase="seedPhrase"
                  @update:seed-phrase="emit('update:seedPhrase', $event)"
                  @update:open="emit('update:open', $event)"
                />
              </TabsContent>

              <TabsContent value="checksum" class="mnp-adv-tabs__panel">
                <TabMnemonicSeedPhraseAdvancedChecksum
                  :open="open"
                  :seed-phrase="seedPhrase"
                  @update:seed-phrase="emit('update:seedPhrase', $event)"
                />
              </TabsContent>
            </TabsRoot>
          </div>

          <Separator class="h-px w-full shrink-0 bg-gray-200 dark:bg-gray-600" />

          <footer class="shrink-0 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/80 px-6 py-4 rounded-b-xl">
            <DialogClose as-child>
              <button type="button" class="w-full px-4 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors">
                Close
              </button>
            </DialogClose>
          </footer>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Separator,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from 'radix-vue'
import TabMnemonicSeedPhraseAdvancedGeneral from './tabsFor.mnemonicSeedPhrase/tab.mnemonicSeedPhrase.Advanced.General.vue'
import TabMnemonicSeedPhraseAdvancedChecksum from './tabsFor.mnemonicSeedPhrase/tab.mnemonicSeedPhrase.Advanced.checksum.vue'

const props = defineProps<{
  open: boolean
  seedPhrase: string
  initialTab?: 'general' | 'checksum'
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  'update:seedPhrase': [value: string]
}>()

const activeTab = ref<'general' | 'checksum'>('general')

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      activeTab.value = props.initialTab ?? 'general'
    }
  },
)

function onDialogOpenChange(next: boolean) {
  emit('update:open', next)
}
</script>

<style scoped>
/* z-index aligns with stacked radix modals (e.g. wallet QR / contact details). */
.mnp-adv-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 10105;
  animation: mnp-adv-overlay-fade 0.15s ease;
}

@keyframes mnp-adv-overlay-fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.mnp-adv-modal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10106;
  width: min(92vw, 64rem);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
  animation: mnp-adv-modal-pop 0.18s ease;
}

@keyframes mnp-adv-modal-pop {
  from {
    opacity: 0;
    transform: translate(-50%, -48%);
  }

  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.mnp-adv-modal:focus {
  outline: none;
}

.mnp-adv-shell {
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1;
  max-height: 90vh;
}

.mnp-adv-header {
  flex-shrink: 0;
  background: linear-gradient(to right, #2563eb, #9333ea);
  padding: 1rem 1.5rem 1rem 2rem;
}

.mnp-adv-header-row {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  position: relative;
  padding-right: 2.75rem;
}

.mnp-adv-title-group {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.mnp-adv-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.3;
  text-align: left;
}

.mnp-adv-subtitle {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
  text-align: left;
}

.mnp-adv-header-close {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.18);
  color: #ffffff;
  transition: background 0.12s, color 0.12s;
}

.mnp-adv-header-close svg {
  width: 1rem;
  height: 1rem;
}

.mnp-adv-header-close:hover {
  background: rgba(255, 255, 255, 0.28);
}

.mnp-adv-header-close:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.35);
}

.mnp-adv-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 1.25rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.mnp-adv-body::-webkit-scrollbar {
  width: 8px;
}

.mnp-adv-body::-webkit-scrollbar-track {
  background: transparent;
}

.mnp-adv-body::-webkit-scrollbar-thumb {
  background: rgb(156 163 175 / 0.5);
  border-radius: 4px;
}

.mnp-adv-body::-webkit-scrollbar-thumb:hover {
  background: rgb(156 163 175 / 0.7);
}

.mnp-adv-tabs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 0;
}

.mnp-adv-tabs__list {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  padding: 0.2rem;
  border-radius: 0.5rem;
  background: rgb(243 244 246);
  border: 1px solid rgb(229 231 235);
}

:global(.dark) .mnp-adv-tabs__list {
  background: rgb(31 41 55);
  border-color: rgb(75 85 99);
}

.mnp-adv-tabs__trigger {
  appearance: none;
  border: none;
  cursor: pointer;
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0.4rem 0.85rem;
  border-radius: 0.375rem;
  color: rgb(75 85 99);
  background: transparent;
  transition: background 0.12s, color 0.12s;
}

:global(.dark) .mnp-adv-tabs__trigger {
  color: rgb(209 213 219);
}

.mnp-adv-tabs__trigger:hover {
  color: rgb(17 24 39);
  background: rgb(255 255 255 / 0.6);
}

:global(.dark) .mnp-adv-tabs__trigger:hover {
  color: rgb(255 255 255);
  background: rgb(55 65 81 / 0.7);
}

.mnp-adv-tabs__trigger[data-state='active'] {
  color: rgb(17 24 39);
  background: rgb(255 255 255);
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.06);
}

:global(.dark) .mnp-adv-tabs__trigger[data-state='active'] {
  color: rgb(255 255 255);
  background: rgb(55 65 81);
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.25);
}

.mnp-adv-tabs__trigger:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgb(37 99 235 / 0.35);
}

.mnp-adv-tabs__panel {
  flex: 1;
  min-height: 0;
  min-width: 0;
  outline: none;
}
</style>
