<template>
  <button type="button" class="btn" @click="handleExport">
    <component :is="variantIcon" :size="18" class="btn-icon" />
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SquareUser, Landmark, Wallet, Building2 } from 'lucide-vue-next'
import { getCompanies } from '@/services/addressBook/service.addressBook.Company'

export type ExportVariant = 'contacts' | 'exchanges' | 'wallets' | 'companies'

const props = withDefaults(
  defineProps<{
    label?: string
    variant?: ExportVariant
    /** Used when variant is contacts */
    contacts?: unknown[]
    exchanges?: unknown[]
    wallets?: unknown[]
  }>(),
  {
    label: 'Export Contacts',
    variant: 'contacts',
    contacts: () => [],
    exchanges: () => [],
    wallets: () => [],
  },
)

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

function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  downloadBlob(filename, blob)
}

function exportContactsCsv() {
  const rows = props.contacts ?? []
  const headers = ['firstname', 'lastname', 'email', 'company', 'notes', 'wallets']
  const escape = (v: unknown) => {
    const s = v == null ? '' : String(v)
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`
    return s
  }
  const lines = [
    headers.join(','),
    ...rows.map((c: any) =>
      [
        escape(c.firstname),
        escape(c.lastname),
        escape(c.email),
        escape(c.company),
        escape(c.notes),
        escape(typeof c.wallets === 'number' ? c.wallets : ''),
      ].join(','),
    ),
  ]
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
  downloadBlob('addressbook-contacts.csv', blob)
}

async function handleExport() {
  try {
    switch (props.variant) {
      case 'exchanges':
        downloadJson('addressbook-exchanges.json', props.exchanges ?? [])
        break
      case 'wallets':
        downloadJson('addressbook-wallets.json', props.wallets ?? [])
        break
      case 'companies': {
        const data = await getCompanies()
        downloadJson('addressbook-companies.json', data)
        break
      }
      case 'contacts':
      default:
        exportContactsCsv()
        break
    }
  } catch (e) {
    console.error('Export failed:', e)
    alert(e instanceof Error ? e.message : 'Export failed.')
  }
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
