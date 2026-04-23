<template>
  <TabsRoot v-model="currentTab" class="ac-tabs">
    <FormAddEntryStructureTabsAll
      list-aria-label="Contact sections"
      secondary-value="advanced"
      secondary-label="Wallets"
      :show-secondary-coins-icon="false"
      :show-secondary-badge="false"
    />

    <TabsContent value="general" class="ac-tabs__content">
        <div class="ac-tabs__panel--general">
        <div class="ac-general-fields">
          <div class="ac-form-grid">
            <div class="ac-field">
              <Label class="ac-label" for="ac-firstname">First name</Label>
              <input id="ac-firstname" v-model="form.firstname" type="text" class="ac-input" autocomplete="given-name" />
            </div>
            <div class="ac-field">
              <Label class="ac-label" for="ac-lastname">Last name</Label>
              <input id="ac-lastname" v-model="form.lastname" type="text" class="ac-input" autocomplete="family-name" />
            </div>
          </div>
          <div class="ac-form-grid">
            <div class="ac-field">
              <Label class="ac-label" for="ac-email">Email</Label>
              <input id="ac-email" v-model="form.email" type="email" class="ac-input" autocomplete="email" />
            </div>
            <div class="ac-field">
              <Label class="ac-label" for="ac-company">Company</Label>
              <input id="ac-company" v-model="form.company" type="text" class="ac-input" autocomplete="organization" />
            </div>
          </div>
          <div class="ac-field ac-field--notes">
            <Label class="ac-label" for="ac-notes">Notes</Label>
            <textarea id="ac-notes" v-model="form.notes" class="ac-textarea" rows="3" />
          </div>
        </div>
      </div>
    </TabsContent>

    <FormAddEntryStructureTabWallet
      v-model="wallets"
      variant="contact"
      tabs-value="advanced"
      @open-address="emit('open-wallet-address', $event)"
      @add-row="emit('add-wallet')"
      @remove-row="emit('remove-wallet', $event)"
      @file-import="emit('file-import', $event)"
      @scan-qr="emit('scan-qr')"
    />
  </TabsRoot>
</template>

<script setup lang="ts">
import { TabsRoot, TabsContent, Label } from 'radix-vue'
import type { Contact } from '@/services/addressBook/contactService'
import type { Wallet } from '@/services/addressBook/walletService'
import FormAddEntryStructureTabsAll from '@/components/modals/addressbook/transformsFor.add.Entry/form.addEntry.structure.tabs.all.vue'
import FormAddEntryStructureTabWallet from '@/components/modals/addressbook/transformsFor.add.Entry/form.addEntry.structure.tab.wallet.vue'

defineOptions({ name: 'FormAddEntryContact' })

const form = defineModel<Contact>('form', { required: true })
const wallets = defineModel<Partial<Wallet>[]>('wallets', { required: true })
const currentTab = defineModel<'general' | 'advanced'>('currentTab', { required: true })

const emit = defineEmits<{
  'add-wallet': []
  'remove-wallet': [index: number]
  'open-wallet-address': [index: number]
  'file-import': [event: Event]
  'scan-qr': []
}>()
</script>

<style scoped lang="scss">
.ac-tabs {
  display: flex;
  flex-direction: column;
  gap: 0;
  /* Keep General and Wallets tab bodies the same height */
  --ac-contact-tab-panel-height: min(26rem, 52vh);
}

.ac-tabs__content {
  padding-bottom: 0.25rem;
}

.ac-tabs__panel--general {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: var(--ac-contact-tab-panel-height);
  max-height: var(--ac-contact-tab-panel-height);
  overflow-y: auto;
  padding-right: 0.15rem;
}

.ac-general-fields {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ac-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 1.25rem;
}

.ac-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.ac-field--notes {
  flex: 1;
  min-height: 0;
}

.ac-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
}

.ac-input,
.ac-textarea {
  width: 100%;
  padding: 0.6rem 0.65rem;
  font-size: 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: #fff;
  box-sizing: border-box;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18);
  }
}

.ac-textarea {
  display: block;
  flex: 1;
  min-height: 5rem;
  margin: 0;
  resize: vertical;
}
</style>
