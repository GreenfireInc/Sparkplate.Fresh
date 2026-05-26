<template>
  <TabsContent value="Companies" class="ab-page__tab-panel">
    <div class="ab-table-wrapper companies-tab">
      <table class="ab-table">
        <thead>
          <tr>
            <th class="ab-table__th ab-table__th--checkbox" scope="col">
              <input
                type="checkbox"
                class="ab-table__checkbox"
                :checked="isCurrentPageSelected"
                :disabled="sortedCompanies.length === 0"
                aria-label="Select all companies in this list"
                @change="onSelectAll"
              />
            </th>
            <th
              scope="col"
              class="ab-table__th ab-table__th--sortable"
              :class="{ 'ab-table__th--sorted': sortKey === 'id' }"
              @click="sortBy('id')"
            >
              ID
              <span v-if="sortKey === 'id'" class="ab-table__sort-arrow" aria-hidden="true">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th
              scope="col"
              class="ab-table__th ab-table__th--sortable"
              :class="{ 'ab-table__th--sorted': sortKey === 'name' }"
              @click="sortBy('name')"
            >
              Company
              <span v-if="sortKey === 'name'" class="ab-table__sort-arrow" aria-hidden="true">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th
              scope="col"
              class="ab-table__th ab-table__th--sortable"
              :class="{ 'ab-table__th--sorted': sortKey === 'mainContact' }"
              @click="sortBy('mainContact')"
            >
              Main Contact
              <span v-if="sortKey === 'mainContact'" class="ab-table__sort-arrow" aria-hidden="true">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th
              scope="col"
              class="ab-table__th ab-table__th--sortable"
              :class="{ 'ab-table__th--sorted': sortKey === 'position' }"
              @click="sortBy('position')"
            >
              Position
              <span v-if="sortKey === 'position'" class="ab-table__sort-arrow" aria-hidden="true">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th
              scope="col"
              class="ab-table__th ab-table__th--sortable"
              :class="{ 'ab-table__th--sorted': sortKey === 'email' }"
              @click="sortBy('email')"
            >
              Email address
              <span v-if="sortKey === 'email'" class="ab-table__sort-arrow" aria-hidden="true">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th
              scope="col"
              class="ab-table__th ab-table__th--sortable"
              :class="{ 'ab-table__th--sorted': sortKey === 'numCurrencies' }"
              @click="sortBy('numCurrencies')"
            >
              Currencies
              <span v-if="sortKey === 'numCurrencies'" class="ab-table__sort-arrow" aria-hidden="true">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th class="ab-table__th ab-table__th--actions" scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="sortedCompanies.length === 0">
            <td colspan="8" class="ab-table__empty">No companies found.</td>
          </tr>
          <tr
            v-for="company in sortedCompanies"
            :key="company.id"
            class="ab-table__row ab-table__row--clickable"
            @click="openCompanyModal(company)"
          >
            <td class="ab-table__td ab-table__td--checkbox" @click.stop>
              <input
                v-model="selectedCompanyIdsProxy"
                type="checkbox"
                class="ab-table__checkbox"
                :value="company.id"
                :aria-label="`Select ${company.name}`"
                @click.stop
              />
            </td>
            <td class="ab-table__td">{{ company.id }}</td>
            <td class="ab-table__td">{{ company.name }}</td>
            <td class="ab-table__td">{{ company.mainContact }}</td>
            <td class="ab-table__td">{{ company.position }}</td>
            <td class="ab-table__td">{{ company.email }}</td>
            <td class="ab-table__td">{{ company.numCurrencies }}</td>
            <td class="ab-table__td ab-table__td--actions" @click.stop>
              <ActionsDropdown
                :contact="companyActionsContactStub(company)"
                :is-editing="false"
                @update:edit-mode="(on: boolean) => on && openCompanyModal(company)"
                @save-changes="noopCompanyTableActions"
                @cancel-edit="noopCompanyTableActions"
                @add-currency-request="openAddCurrencyForCompany(company)"
                @generate-qrcode-png="exportCompanyQrPng(company)"
                @generate-qrcode-svg="exportCompanyQrSvg(company)"
                @export-csv="exportCompanyCsv(company)"
                @export-vcf="exportCompanyVcf(company)"
                @export-json="exportCompanyJson(company)"
                @export-md="exportCompanyMd(company)"
                @currency-added="noopCompanyTableActions"
                @delete-requested="confirmDeleteCompany(company)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <CompanyDetailsModal
      v-if="selectedCompany"
      :company="selectedCompany"
      @close="closeCompanyModal"
      @delete-requested="onCompanyDeleteFromModal"
    />
    <ModalConfirmDeleteGeneral
      :show="showConfirmModal"
      :title="confirmModalTitle"
      :message="confirmModalMessage"
      @close="closeConfirmModal"
      @confirm="onConfirmDelete"
    />
  </TabsContent>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { TabsContent } from 'radix-vue'
import { getCompanies, deleteCompany, type Company } from '@/services/addressBook/service.addressBook.Company'
import type { Contact } from '@/services/addressBook/service.addressBook.Contact'
import ActionsDropdown from '@/components/dropdowns/dropdown.actions.vue'
import CompanyDetailsModal from '@/components/modals/addressbook/modal.details.Company.vue'
import ModalConfirmDeleteGeneral from '@/components/modals/confirmations/modal.confirm.delete.general.vue'
import {
  exportCompanyQrPng,
  exportCompanyQrSvg,
} from '@/lib/cores/exportStandard/addressBook/filenameStructureAndContent.addressBook.Company.qrCode'
import {
  exportCompanyCsv,
  exportCompanyVcf,
  exportCompanyJson,
  exportCompanyMd,
} from '@/lib/cores/exportStandard/addressBook/filenameStructureAndContent.addressBook.Company.text'

defineOptions({ name: 'TabAddressBookCompany' })

const companies = ref<Company[]>([])
const selectedCompany = ref<Company | null>(null)
const showConfirmModal = ref(false)
const confirmModalTitle = ref('')
const confirmModalMessage = ref('')
const companyToDelete = ref<Company | null>(null)
const sortKey = ref<keyof Company>('id')
const sortOrder = ref<'asc' | 'dsc'>('asc')

const props = withDefaults(
  defineProps<{
    selectedCompanyIds: number[]
  }>(),
  { selectedCompanyIds: () => [] },
)

const emit = defineEmits<{
  'update:selectedCompanyIds': [value: number[]]
  'select-all': [event: Event]
}>()

const selectedCompanyIdsProxy = computed({
  get: () => props.selectedCompanyIds,
  set: (value: number[]) => emit('update:selectedCompanyIds', value),
})

/* Slots that don't apply at the row level: rows aren't in edit mode, and the dropdown's own
 * `currency-added` is only relevant in the contact-flow path. Kept as a single noop to wire
 * the events without breaking the dropdown. (Mirrors `tab.addressBook.Wallet.vue`.) */
function noopCompanyTableActions() {}

/* No company-level "add currency" flow yet — the underlying Company is a derived aggregation
 * and currencies live on the per-contact wallets. Placeholder until a company-currency
 * pipeline is designed; QR / CSV / VCF / JSON / MD use the real exporters imported above. */
function openAddCurrencyForCompany(c: Company) {
  console.log(`Company add-currency requested:`, c.id)
}

/** Contact-shaped row for `ActionsDropdown` (same pattern as exchange / wallet detail modals). */
function companyActionsContactStub(company: Company): Contact {
  return {
    id: company.id,
    type: 'addressbook_company',
    firstname: company.name,
    lastname: '',
    company: company.name,
    email: company.email,
    notes: '',
  }
}

onMounted(async () => {
  await loadCompanies()
})

async function loadCompanies() {
  try {
    companies.value = await getCompanies()
  } catch (err) {
    console.error('CompaniesTab: failed to load companies', err)
    companies.value = []
  }
  closeConfirmModal()
}

function sortBy(key: keyof Company) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'dsc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

function compareValues(a: unknown, b: unknown): number {
  if (a === b) return 0
  const aStr = a == null ? '' : String(a)
  const bStr = b == null ? '' : String(b)
  return aStr.localeCompare(bStr, undefined, { numeric: true })
}

const sortedCompanies = computed(() => {
  const key = sortKey.value
  const order = sortOrder.value
  return [...companies.value].sort((a, b) => {
    const cmp = compareValues(a[key], b[key])
    return order === 'asc' ? cmp : -cmp
  })
})

const isCurrentPageSelected = computed(() => {
  const ids = sortedCompanies.value.map((c) => c.id)
  return ids.length > 0 && ids.every((id) => props.selectedCompanyIds.includes(id))
})

function onSelectAll(event: Event) {
  const target = event.target as HTMLInputElement
  const ids = sortedCompanies.value.map((c) => c.id)
  const current = [...props.selectedCompanyIds]
  if (target.checked) {
    emit('update:selectedCompanyIds', [...new Set([...current, ...ids])])
  } else {
    emit('update:selectedCompanyIds', current.filter((id) => !ids.includes(id)))
  }
  emit('select-all', event)
}

const confirmDeleteCompany = (company: Company) => {
  companyToDelete.value = company
  confirmModalTitle.value = 'Delete Company'
  confirmModalMessage.value = `Are you sure you want to delete the company ${company.name}? This will also delete all associated contacts.`
  showConfirmModal.value = true
}

const onConfirmDelete = async () => {
  if (companyToDelete.value) {
    await deleteCompany(companyToDelete.value.id)
  }
  await loadCompanies()
}

const closeConfirmModal = () => {
  showConfirmModal.value = false
  companyToDelete.value = null
}

function openCompanyModal(company: Company) {
  selectedCompany.value = company
}

function closeCompanyModal() {
  selectedCompany.value = null
}

function onCompanyDeleteFromModal(company: Company) {
  closeCompanyModal()
  confirmDeleteCompany(company)
}

/** Let `AddressBook` refresh after contact add/edit/delete (companies are derived from contacts). */
defineExpose({ loadCompanies })
</script>

<style lang="scss" scoped>
.ab-table {
  width: 100%;
  border-collapse: collapse;
}

.ab-table__th {
  padding: 0.35rem 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: #4b5563;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  white-space: nowrap;
  border-bottom: 1px solid #e5e7eb;
  background: #f3f4f6;
  position: sticky;
  top: 0;
  z-index: 2;
}

.ab-table__th--sortable {
  cursor: pointer;
  user-select: none;

  &:hover {
    background: #e5e7eb;
  }
}

.ab-table__th--sorted {
  color: #2563eb;
}

.ab-table__th--checkbox {
  width: 4%;
}

.ab-table__sort-arrow {
  margin-left: 0.25rem;
  font-size: 0.625rem;
}

.ab-table__th--actions {
  width: 15%;
}

.ab-table__row {
  transition: background 0.1s;

  &:hover {
    background: #f9fafb;
  }
}

.companies-tab .ab-table__row--clickable {
  cursor: pointer;
}

.ab-table__td {
  padding: 0.3rem 1rem;
  text-align: left;
  white-space: nowrap;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
  font-size: 0.875rem;
}

.ab-table__td--actions {
  width: 15%;
}

.ab-table__td--checkbox {
  width: 4%;
}

.ab-table__checkbox {
  cursor: pointer;
}

.ab-table__empty {
  text-align: center;
  padding: 5rem 1rem;
  color: #6b7280;
  font-size: 0.9375rem;
}

.ab-page__tab-panel {
  outline: none;
}

.ab-table-wrapper {
  width: 100%;
}
</style>
