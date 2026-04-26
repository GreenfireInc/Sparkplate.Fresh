<template>
  <button type="button" class="btn" @click="handleExport">
    <component :is="variantIcon" :size="18" class="btn-icon" />
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SquareUser, Landmark, Wallet, Building2 } from 'lucide-vue-next'
import packageJson from '../../../../package.json'
import { getCompanies } from '@/services/addressBook/service.addressBook.Company'

export type ExportVariant = 'contacts' | 'exchanges' | 'wallets' | 'companies'

const SECTION_LABEL = 'AddressBook'

const TAB_BY_VARIANT: Record<ExportVariant, string> = {
  contacts: 'Contacts',
  exchanges: 'Exchanges',
  wallets: 'Wallets',
  companies: 'Companies',
}

/** Safe single segment for download filenames (cross-platform). */
function sanitizeFileSegment(raw: string): string {
  const s = String(raw)
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-.]+|[-.]+$/g, '')
  return s.length > 0 ? s : 'unnamed'
}

function getUserForFilename(): string {
  if (typeof window !== 'undefined' && window.localStorage) {
    const stored = window.localStorage.getItem('sparkplate_userName')
    if (stored?.trim()) return sanitizeFileSegment(stored.trim())
  }
  return 'user'
}

function formatDateYmd(d: Date = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}${m}${day}`
}

function formatTimeHms24(d: Date = new Date()): string {
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  const s = String(d.getSeconds()).padStart(2, '0')
  return `${h}${m}${s}`
}

/**
 * %projectName%.%user%.%date (YYYYMMDD)%.%time (HHMMSS)%.%section%.%tab%.All.%ext%
 * projectName from package.json; user from localStorage or "user" (aligns with other export std).
 */
function buildAddressBookExportFilename(variant: ExportVariant, dataExt: 'json' | 'csv'): string {
  const projectName = sanitizeFileSegment((packageJson as { name: string }).name)
  const user = getUserForFilename()
  const now = new Date()
  const dateStr = formatDateYmd(now)
  const timeStr = formatTimeHms24(now)
  const section = SECTION_LABEL
  const tab = TAB_BY_VARIANT[variant]
  return `${projectName}.${user}.${dateStr}.${timeStr}.${section}.${tab}.All.${dataExt}`
}

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
  downloadBlob(buildAddressBookExportFilename('contacts', 'csv'), blob)
}

async function handleExport() {
  try {
    switch (props.variant) {
      case 'exchanges':
        downloadJson(buildAddressBookExportFilename('exchanges', 'json'), props.exchanges ?? [])
        break
      case 'wallets':
        downloadJson(buildAddressBookExportFilename('wallets', 'json'), props.wallets ?? [])
        break
      case 'companies': {
        const data = await getCompanies()
        downloadJson(buildAddressBookExportFilename('companies', 'json'), data)
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
