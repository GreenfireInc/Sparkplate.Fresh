<template>
  <div>
    <label :for="inputId" class="btn">
      <component :is="variantIcon" :size="18" class="btn-icon" />
      {{ label }}
      <input
        :id="inputId"
        ref="fileInput"
        type="file"
        :accept="acceptAttr"
        style="display: none"
        @change="handleFileChange"
      />
    </label>
    <ModalConfirmImportContacts
      v-if="variant === 'contacts' || variant === 'companies'"
      :show="showModal"
      :file="selectedFile"
      :contacts="parsedContacts"
      @close="showModal = false"
      @confirm="handleConfirmContactsImport"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { SquareUser, Landmark, Wallet, Building2 } from 'lucide-vue-next'
import { useContactParser } from '@/composables/useContactParser'
import { parseWalletJsonFile, type ImportedWallet } from '@/lib/cores/importStandard/importWallet.json'
import ModalConfirmImportContacts from '@/components/modals/confirmations/modal.confirm.import.Contacts.vue'

export type ImportVariant = 'contacts' | 'exchanges' | 'wallets' | 'companies'

const props = withDefaults(
  defineProps<{
    label?: string
    variant?: ImportVariant
    /** Optional override; defaults by variant */
    accept?: string
  }>(),
  {
    label: 'Import Contacts',
    variant: 'contacts',
    accept: undefined,
  },
)

const emit = defineEmits<{
  'contacts-imported': [contacts: unknown[]]
  'companies-imported': [rows: unknown[]]
  'wallets-imported': [payload: { wallets: ImportedWallet[] }]
  'exchanges-imported': [exchanges: unknown[]]
}>()

const inputId = `ab-import-${Math.random().toString(36).slice(2, 9)}`
const fileInput = ref<HTMLInputElement | null>(null)
const { parseFile } = useContactParser()
const showModal = ref(false)
const selectedFile = ref<File | null>(null)
const parsedContacts = ref<unknown[]>([])

const variantIcon = computed(() => {
  switch (props.variant) {
    case 'exchanges':
      return Landmark
    case 'wallets':
      return Wallet
    case 'companies':
      return Building2
    case 'contacts':
    default:
      return SquareUser
  }
})

const acceptAttr = computed(() => {
  if (props.accept) return props.accept
  if (props.variant === 'wallets' || props.variant === 'exchanges') {
    return '.json,application/json'
  }
  return '.vcf,.csv,.ods,.xls,.xlsx'
})

function resetInput() {
  if (fileInput.value) fileInput.value.value = ''
}

async function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  selectedFile.value = file

  try {
    if (props.variant === 'contacts' || props.variant === 'companies') {
      const rows = await parseFile(file)
      if (rows.length === 0) {
        alert('No rows found in the file.')
        return
      }
      parsedContacts.value = rows
      showModal.value = true
      return
    }

    if (props.variant === 'wallets') {
      const result = await parseWalletJsonFile(file)
      emit('wallets-imported', { wallets: result.wallets })
      return
    }

    if (props.variant === 'exchanges') {
      const text = await file.text()
      const data = JSON.parse(text) as unknown
      const list = Array.isArray(data) ? data : (data as { exchanges?: unknown }).exchanges
      if (!Array.isArray(list) || list.length === 0) {
        alert('Invalid exchange JSON: expected a non-empty array or an object with an "exchanges" array.')
        return
      }
      emit('exchanges-imported', list)
      return
    }
  } catch (error) {
    console.error('Import error:', error)
    alert(
      error instanceof Error
        ? error.message
        : 'An error occurred while reading the file.',
    )
  } finally {
    resetInput()
  }
}

function handleConfirmContactsImport(rows: unknown[]) {
  if (props.variant === 'companies') {
    emit('companies-imported', rows)
  } else {
    emit('contacts-imported', rows)
  }
  showModal.value = false
}
</script>

<style scoped>
.btn {
  margin: 0;
}

.btn-icon {
  flex-shrink: 0;
}
</style>
