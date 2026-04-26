<template>
  <form class="ac-company-form" novalidate @submit.prevent="onSubmit">
    <TabsRoot v-model="currentTab" class="ac-tabs">
      <FormAddEntryStructureTabsAll
        list-aria-label="Company sections"
        secondary-value="advanced"
        secondary-label="Wallets"
        :show-secondary-coins-icon="false"
        :secondary-badge-count="companyForm.wallets.length"
      />

      <TabsContent value="general" class="ac-tabs__content">
        <div class="ac-tabs__panel ac-tabs__panel--general">
          <div class="ac-general-fields">
            <div class="ac-form-grid">
              <div class="ac-field">
                <Label class="ac-label" for="ac-co-company-name">Company name</Label>
                <input
                  id="ac-co-company-name"
                  v-model="companyForm.companyName"
                  type="text"
                  class="ac-input"
                  autocomplete="organization"
                  placeholder="Legal or trade name"
                />
              </div>
              <div class="ac-field">
                <Label class="ac-label" for="ac-co-company-website">Company website</Label>
                <input
                  id="ac-co-company-website"
                  v-model="companyForm.companyWebsite"
                  type="url"
                  class="ac-input"
                  autocomplete="url"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div class="ac-form-grid">
              <div class="ac-field">
                <Label class="ac-label" for="ac-co-main-first">Main contact first name</Label>
                <input
                  id="ac-co-main-first"
                  v-model="companyForm.mainContactFirstName"
                  type="text"
                  class="ac-input"
                  autocomplete="given-name"
                  placeholder="First name"
                />
              </div>
              <div class="ac-field">
                <Label class="ac-label" for="ac-co-main-last">Main contact last name</Label>
                <input
                  id="ac-co-main-last"
                  v-model="companyForm.mainContactLastName"
                  type="text"
                  class="ac-input"
                  autocomplete="family-name"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div class="ac-form-grid">
              <div class="ac-field">
                <Label class="ac-label" for="ac-co-main-email">Main contact email address</Label>
                <input
                  id="ac-co-main-email"
                  v-model="companyForm.mainContactEmailAddress"
                  type="email"
                  class="ac-input"
                  autocomplete="email"
                  placeholder="person@company.com"
                />
              </div>
              <div class="ac-field">
                <Label class="ac-label" for="ac-co-position">Position</Label>
                <input
                  id="ac-co-position"
                  v-model="companyForm.position"
                  type="text"
                  class="ac-input"
                  autocomplete="organization-title"
                  placeholder="Job title"
                />
              </div>
            </div>

            <div class="ac-field ac-field--notes">
              <Label class="ac-label" for="ac-co-notes">Notes</Label>
              <textarea
                id="ac-co-notes"
                v-model="companyForm.notes"
                class="ac-textarea"
                rows="3"
                placeholder="Optional notes"
              />
            </div>
          </div>
        </div>
      </TabsContent>

      <FormAddEntryStructureTabWallet
        v-model="companyForm.wallets"
        variant="contact"
        tabs-value="advanced"
        intro-text="Wallet addresses linked to this company's main contact."
        @open-address="emit('open-wallet-address', $event)"
        @add-row="emit('add-wallet')"
        @remove-row="emit('remove-wallet', $event)"
        @file-import="emit('file-import', $event)"
        @scan-qr="emit('scan-qr')"
      />
    </TabsRoot>

    <FormAddEntryFooter
      submit-label="Add company"
      show-import
      @cancel="emit('cancel')"
      @file-import="emit('file-import', $event)"
    />
  </form>
</template>

<script lang="ts">
import type { Wallet } from '@/services/addressBook/service.addressBook.Wallet'

export interface CompanyForm {
  companyName: string
  companyWebsite: string
  mainContactFirstName: string
  mainContactLastName: string
  mainContactEmailAddress: string
  position: string
  notes: string
  wallets: Partial<Wallet>[]
}

export function makeEmptyCompanyForm(): CompanyForm {
  return {
    companyName: '',
    companyWebsite: '',
    mainContactFirstName: '',
    mainContactLastName: '',
    mainContactEmailAddress: '',
    position: '',
    notes: '',
    wallets: [],
  }
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Label, TabsRoot, TabsContent } from 'radix-vue'
import FormAddEntryFooter from '@/components/modals/addressbook/transformsFor.add.Entry/form.addEntry.structure.footer.vue'
import FormAddEntryStructureTabsAll from '@/components/modals/addressbook/transformsFor.add.Entry/form.addEntry.structure.tabs.all.vue'
import FormAddEntryStructureTabWallet from '@/components/modals/addressbook/transformsFor.add.Entry/form.addEntry.structure.tab.wallet.vue'

defineOptions({ name: 'FormAddEntryCompany' })

const companyForm = defineModel<CompanyForm>({ required: true })

const currentTab = ref<'general' | 'advanced'>('general')

const emit = defineEmits<{
  submit: []
  cancel: []
  'open-wallet-address': [index: number]
  'add-wallet': []
  'remove-wallet': [index: number]
  'file-import': [event: Event]
  'scan-qr': []
}>()

function onSubmit() {
  emit('submit')
}
</script>

<style scoped lang="scss">
/* Match contact / exchange / external-wallet add-entry: form stack + tab band. */
.ac-company-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ac-company-form :deep(.ac-tabs__list) {
  margin-bottom: 0.5rem;
}

.ac-tabs {
  display: flex;
  flex-direction: column;
  gap: 0;
  /* Same token as `form.addEntry.contact.vue`, `form.addEntry.exchange.vue`, `form.addEntry.externalWallet.vue` */
  --ac-contact-tab-panel-height: min(26rem, 52vh);
}

.ac-company-form :deep(.ac-tabs__content) {
  padding-bottom: 0;
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

.ac-field--full {
  grid-column: 1 / -1;
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
  transition:
    border-color 0.15s,
    box-shadow 0.15s;

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
  font-family: inherit;
}
</style>
