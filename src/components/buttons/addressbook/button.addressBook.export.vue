<template>
  <button type="button" class="btn" @click="handleExport">
    <component :is="variantIcon" :size="18" class="btn-icon" />
    {{ label }}
  </button>

  <SubModalExportPreviewAddressBook
    :show="showPreview"
    :variant="props.variant"
    :entries="previewEntries"
    @close="closePreview"
    @confirm="confirmPreview"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { SquareUser, Landmark, Wallet, Building2 } from 'lucide-vue-next'
import packageJson from '../../../../package.json'
import { getCompanies, type Company } from '@/services/addressBook/service.addressBook.Company'
import SubModalExportPreviewAddressBook from '@/components/modals/addressbook/subModals/subModal.export.preview.addressBook.vue'

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
    /** Optional ids selected on the active tab; non-empty triggers the preview modal. */
    selectedIds?: number[]
  }>(),
  {
    label: 'Export Contacts',
    variant: 'contacts',
    contacts: () => [],
    exchanges: () => [],
    wallets: () => [],
    selectedIds: () => [],
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

function exportContactsCsv(rows: unknown[]) {
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

const showPreview = ref(false)
const previewEntries = ref<Record<string, unknown>[]>([])

function pickById<T extends { id?: number | string }>(rows: T[], ids: number[]): T[] {
  const set = new Set(ids)
  return rows.filter((r) => typeof r.id === 'number' && set.has(r.id))
}

async function exportAll() {
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
      exportContactsCsv(props.contacts ?? [])
      break
  }
}

async function handleExport() {
  try {
    const ids = props.selectedIds ?? []
    if (ids.length === 0) {
      await exportAll()
      return
    }

    let entries: Record<string, unknown>[] = []
    switch (props.variant) {
      case 'contacts':
        entries = pickById(props.contacts as { id?: number }[], ids) as Record<string, unknown>[]
        break
      case 'exchanges':
        entries = pickById(props.exchanges as { id?: number }[], ids) as Record<string, unknown>[]
        break
      case 'wallets':
        entries = pickById(props.wallets as { id?: number }[], ids) as Record<string, unknown>[]
        break
      case 'companies': {
        const all: Company[] = await getCompanies()
        entries = pickById(all, ids) as unknown as Record<string, unknown>[]
        break
      }
    }

    previewEntries.value = entries
    showPreview.value = true
  } catch (e) {
    console.error('Export failed:', e)
    alert(e instanceof Error ? e.message : 'Export failed.')
  }
}

function closePreview() {
  showPreview.value = false
  previewEntries.value = []
}

function confirmPreview() {
  try {
    const entries = previewEntries.value
    switch (props.variant) {
      case 'contacts':
        exportContactsCsv(entries)
        break
      case 'exchanges':
        downloadJson(buildAddressBookExportFilename('exchanges', 'json'), entries)
        break
      case 'wallets':
        downloadJson(buildAddressBookExportFilename('wallets', 'json'), entries)
        break
      case 'companies':
        downloadJson(buildAddressBookExportFilename('companies', 'json'), entries)
        break
    }
  } catch (e) {
    console.error('Export failed:', e)
    alert(e instanceof Error ? e.message : 'Export failed.')
  } finally {
    closePreview()
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
