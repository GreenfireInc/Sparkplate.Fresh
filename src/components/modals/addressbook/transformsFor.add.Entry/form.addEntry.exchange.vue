<template>
  <form class="ac-exch-form" novalidate @submit.prevent="onSubmit">
    <TabsRoot v-model="currentTab" class="ac-tabs">
      <FormAddEntryStructureTabsAll
        list-aria-label="Exchange sections"
        :secondary-badge-count="exchangeForm.currencies.length"
      />

      <TabsContent value="general" class="ac-tabs__content">
        <div class="ac-tabs__panel ac-tabs__panel--general">
          <div class="ac-general-fields">
            <div class="ac-form-grid">
              <div class="ac-field">
                <Label class="ac-label" for="ac-exch-name">Exchange Name</Label>
                <DropdownExchanges
                  id="ac-exch-name"
                  v-model="exchangeForm.name"
                  placeholder="Select exchange…"
                  @pick="onExchangePick"
                />
              </div>
              <div class="ac-field">
                <Label class="ac-label" for="ac-exch-email">Associated Email</Label>
                <input
                  id="ac-exch-email"
                  v-model="exchangeForm.email"
                  type="email"
                  class="ac-input"
                  placeholder="you@example.com"
                  autocomplete="email"
                />
              </div>
            </div>

            <div class="ac-form-grid">
              <div class="ac-field">
                <Label class="ac-label" for="ac-exch-referralCode">Referral Code</Label>
                <input
                  id="ac-exch-referralCode"
                  v-model="exchangeForm.referralCode"
                  type="text"
                  class="ac-input"
                  placeholder="e.g. ABC123"
                  autocomplete="off"
                />
              </div>
              <div class="ac-field">
                <Label class="ac-label" for="ac-exch-referralUrl">Referral URL</Label>
                <input
                  id="ac-exch-referralUrl"
                  v-model="exchangeForm.referralUrl"
                  type="url"
                  class="ac-input"
                  placeholder="https://exchange.com/ref/…"
                  autocomplete="off"
                />
              </div>
            </div>

            <div class="ac-field ac-field--notes">
              <Label class="ac-label" for="ac-exch-notes">Notes</Label>
              <textarea
                id="ac-exch-notes"
                v-model="exchangeForm.notes"
                class="ac-textarea ac-textarea--exchange-notes"
                rows="3"
              />
            </div>
          </div>
        </div>
      </TabsContent>

      <FormAddEntryStructureTabWallet
        v-model="exchangeForm.currencies"
        tabs-value="currencies"
        @open-address="emit('open-exchange-address', $event)"
        @add-row="addExchangeCurrencyRow"
        @file-import="emit('file-import', $event)"
        @scan-qr="emit('scan-qr')"
      />
    </TabsRoot>

    <FormAddEntryFooter
      submit-label="Add Exchange"
      show-import
      import-accept=".json,application/json"
      @cancel="emit('cancel')"
      @file-import="emit('file-import', $event)"
    />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Label, TabsRoot, TabsContent } from 'radix-vue'
import FormAddEntryFooter from '@/components/modals/addressbook/transformsFor.add.Entry/form.addEntry.structure.footer.vue'
import FormAddEntryStructureTabsAll from '@/components/modals/addressbook/transformsFor.add.Entry/form.addEntry.structure.tabs.all.vue'
import FormAddEntryStructureTabWallet from '@/components/modals/addressbook/transformsFor.add.Entry/form.addEntry.structure.tab.wallet.vue'
import DropdownExchanges from '@/components/dropdowns/dropdown.exchanges.vue'

/** One currency row on an exchange record */
export interface ExchangeCurrency {
  name: string
  abbreviation: string
  address: string
}

/** Full exchange form payload (mirrors parent `exchangeForm`) */
export interface ExchangeForm {
  name: string
  url: string
  referralUrl: string
  referralCode: string
  currencies: ExchangeCurrency[]
  email: string
  notes: string
}

defineOptions({ name: 'FormAddEntryExchange' })

const exchangeForm = defineModel<ExchangeForm>({ required: true })

const currentTab = ref<'general' | 'currencies'>('general')

const emit = defineEmits<{
  submit: []
  cancel: []
  'open-exchange-address': [index: number]
  'file-import': [event: Event]
  'scan-qr': []
}>()

function onSubmit() {
  emit('submit')
}

function onExchangePick(payload: { key: string; label: string; website: string }) {
  if (payload.website) exchangeForm.value.url = payload.website
}

function addExchangeCurrencyRow() {
  exchangeForm.value.currencies.push({ name: '', abbreviation: '', address: '' })
  emit('open-exchange-address', exchangeForm.value.currencies.length - 1)
}
</script>

<style scoped lang="scss">
.ac-tabs {
  display: flex;
  flex-direction: column;
  gap: 0;
  /* Match contact add-entry: General and Currencies (wallet) tab bodies same height */
  --ac-contact-tab-panel-height: min(26rem, 52vh);
}

/* `form.addEntry.structure.tabs.all` uses 1.25rem here; tighten for exchange to cut dead space. */
.ac-exch-form :deep(.ac-tabs__list) {
  margin-bottom: 0.5rem;
}

.ac-exch-form :deep(.ac-tabs__content) {
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
  gap: 0.55rem;
}

.ac-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.55rem 1.25rem;
}

.ac-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.ac-field--notes {
  flex: 0 1 auto;
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
  font-family: inherit;
}

.ac-textarea--exchange-notes {
  flex: none;
  min-height: 3.25rem;
}

.ac-exch-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
