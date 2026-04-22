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
      @cancel="emit('cancel')"
    />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Label, TabsRoot, TabsContent } from 'radix-vue'
import FormAddEntryFooter from '@/components/modals/addressbook/transformsFor.add.Entry/form.addEntry.structure.footer.vue'
import FormAddEntryStructureTabsAll from '@/components/modals/addressbook/transformsFor.add.Entry/form.addEntry.structure.tabs.all.vue'
import FormAddEntryStructureTabWallet from '@/components/modals/addressbook/transformsFor.add.Entry/form.addEntry.structure.tab.wallet.vue'
import DropdownExchanges from '@/components/dropdown/dropdown.exchanges.vue'

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
}

.ac-tabs__content {
  padding-bottom: 0.25rem;
}

.ac-general-fields {
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

.ac-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
}

.ac-input {
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

.ac-exch-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
