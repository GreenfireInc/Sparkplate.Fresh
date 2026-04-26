<template>
  <form class="ac-extw-form" novalidate @submit.prevent="onSubmit">
    <TabsRoot v-model="currentTab" class="ac-tabs">
      <FormAddEntryStructureTabsAll
        list-aria-label="External wallet sections"
        :secondary-badge-count="model.currencies.length"
      />

      <TabsContent value="general" class="ac-tabs__content">
        <div class="ac-tabs__panel ac-tabs__panel--general">
          <div class="ac-ext-wallet-fields ac-general-fields">
            <div class="ac-form-grid">
              <div class="ac-field">
                <Label class="ac-label" for="ac-extw-wallet">Wallet</Label>
                <DropdownWallets
                  id="ac-extw-wallet"
                  v-model="model.wallet"
                  placeholder="Select wallet…"
                />
              </div>
              <div class="ac-field ac-field--date">
                <Label class="ac-label" for="ac-extw-date-creation">Date of creation</Label>
                <input
                  id="ac-extw-date-creation"
                  v-model="model.dateCreation"
                  type="date"
                  class="ac-input ac-input--date"
                />
              </div>
            </div>

            <div class="ac-form-grid ac-form-grid--mnemonic-row">
              <div class="ac-field ac-field--length">
                <Label class="ac-label" for="ac-extw-mnemonic-len">Mnemonic length</Label>
                <select
                  id="ac-extw-mnemonic-len"
                  v-model.number="model.mnemonicWordCount"
                  class="ac-input ac-select"
                >
                  <option v-for="n in mnemonicLengthOptions" :key="n" :value="n">
                    {{ n }}
                  </option>
                </select>
              </div>
              <div class="ac-field">
                <Label class="ac-label" for="ac-extw-mnemonic-first">Mnemonic first</Label>
                <input
                  id="ac-extw-mnemonic-first"
                  v-model="model.mnemonicFirst"
                  type="text"
                  class="ac-input"
                  autocomplete="off"
                  autocapitalize="off"
                  spellcheck="true"
                  placeholder="First word of phrase"
                />
              </div>
              <div class="ac-field">
                <Label class="ac-label" for="ac-extw-mnemonic-last">Mnemonic last</Label>
                <input
                  id="ac-extw-mnemonic-last"
                  v-model="model.mnemonicLast"
                  type="text"
                  class="ac-input"
                  autocomplete="off"
                  autocapitalize="off"
                  spellcheck="true"
                  placeholder="Last word of phrase"
                />
              </div>
            </div>

            <div class="ac-field ac-field--full">
              <Label class="ac-label" for="ac-extw-notes">Notes</Label>
              <textarea id="ac-extw-notes" v-model="model.notes" class="ac-textarea" rows="3" />
            </div>

            <div class="ac-field ac-field--full">
              <Label class="ac-label" for="ac-extw-password-hint">Password hint</Label>
              <input
                id="ac-extw-password-hint"
                v-model="model.passwordHint"
                type="text"
                class="ac-input"
                autocomplete="off"
                placeholder="Hint only — never the actual password"
              />
            </div>
          </div>
        </div>
      </TabsContent>

      <FormAddEntryStructureTabWallet
        v-model="model.currencies"
        tabs-value="currencies"
        variant="exchange"
        intro-text="Public addresses per asset for this wallet (optional)."
        empty-text="No addresses yet. Use “Add Wallet” above or import JSON."
        @open-address="emit('open-external-wallet-address', $event)"
        @add-row="addCurrencyRow"
        @file-import="emit('file-import', $event)"
        @scan-qr="emit('scan-qr')"
      />
    </TabsRoot>

    <FormAddEntryFooter
      submit-label="Add wallet"
      show-import
      import-accept=".json,application/json"
      @cancel="emit('cancel')"
      @file-import="emit('file-import', $event)"
    />
  </form>
</template>

<!--
  Exports must live in a normal <script>, not <script setup>.
  <script setup> is compiled specially and cannot contain `export`.
  See: https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup-exports.md
-->
<script lang="ts">
/** One currency / asset row (same shape as exchange currencies). */
export interface ExternalWalletCurrency {
  name: string
  abbreviation: string
  address: string
}

/** External / self-custody wallet entry in the add-entry flow */
export interface ExternalWalletForm {
  /** Wallet app / provider (label from wallet picker) */
  wallet: string
  /** BIP39-style word count for this backup */
  mnemonicWordCount: number
  /** First word of the mnemonic phrase */
  mnemonicFirst: string
  /** Last word of the mnemonic phrase */
  mnemonicLast: string
  notes: string
  passwordHint: string
  /** `YYYY-MM-DD` from `<input type="date" />` */
  dateCreation: string
  currencies: ExternalWalletCurrency[]
}

export function makeEmptyExternalWalletForm(): ExternalWalletForm {
  return {
    wallet: '',
    mnemonicWordCount: 12,
    mnemonicFirst: '',
    mnemonicLast: '',
    notes: '',
    passwordHint: '',
    dateCreation: '',
    currencies: [],
  }
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Label, TabsRoot, TabsContent } from 'radix-vue'
import DropdownWallets from '@/components/dropdown/dropdown.wallets.vue'
import FormAddEntryFooter from '@/components/modals/addressbook/transformsFor.add.Entry/form.addEntry.structure.footer.vue'
import FormAddEntryStructureTabsAll from '@/components/modals/addressbook/transformsFor.add.Entry/form.addEntry.structure.tabs.all.vue'
import FormAddEntryStructureTabWallet from '@/components/modals/addressbook/transformsFor.add.Entry/form.addEntry.structure.tab.wallet.vue'

defineOptions({ name: 'FormAddEntryExternalWallet' })

/** Allowed mnemonic lengths in the numbered selector */
const mnemonicLengthOptions = [12, 15, 17, 23, 24] as const

const model = defineModel<ExternalWalletForm>({ required: true })

const currentTab = ref<'general' | 'currencies'>('general')

const emit = defineEmits<{
  submit: []
  cancel: []
  'open-external-wallet-address': [index: number]
  'file-import': [event: Event]
  'scan-qr': []
}>()

function onSubmit() {
  emit('submit')
}

function addCurrencyRow() {
  model.value.currencies.push({ name: '', abbreviation: '', address: '' })
  emit('open-external-wallet-address', model.value.currencies.length - 1)
}
</script>

<style scoped lang="scss">
.ac-tabs {
  display: flex;
  flex-direction: column;
  gap: 0;
  --ac-contact-tab-panel-height: min(26rem, 52vh);
}

.ac-extw-form :deep(.ac-tabs__list) {
  margin-bottom: 0.5rem;
}

.ac-extw-form :deep(.ac-tabs__content) {
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
  gap: 0.85rem;
}

.ac-extw-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ac-ext-wallet-fields {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.ac-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem 1.25rem;
}

.ac-form-grid--mnemonic-row {
  grid-template-columns: minmax(5.5rem, 0.75fr) minmax(0, 1fr) minmax(0, 1fr);
}

.ac-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.ac-field--full {
  grid-column: 1 / -1;
}

.ac-field--length {
  min-width: 0;
}

.ac-field--date {
  max-width: 14rem;
}

.ac-select {
  cursor: pointer;
  min-height: 2.75rem;
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
  margin: 0;
  resize: vertical;
  font-family: inherit;
  min-height: 4.5rem;
}

.ac-input--date {
  min-height: 2.75rem;
}
</style>
