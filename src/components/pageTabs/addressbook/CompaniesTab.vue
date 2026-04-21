<template>
  <TabsContent value="Companies" class="ab-page__tab-panel">
    <div class="ab-table-wrapper companies-tab">
      <table class="ab-table">
        <thead>
          <tr>
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
            <th class="ab-table__th" scope="col">Main Currency Address</th>
            <th class="ab-table__th ab-table__th--actions" scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="sortedCompanies.length === 0">
            <td colspan="8" class="ab-table__empty">No companies found.</td>
          </tr>
          <tr v-for="company in sortedCompanies" :key="company.id" class="ab-table__row">
            <td class="ab-table__td">{{ company.id }}</td>
            <td class="ab-table__td">{{ company.name }}</td>
            <td class="ab-table__td">{{ company.mainContact }}</td>
            <td class="ab-table__td">{{ company.position }}</td>
            <td class="ab-table__td">{{ company.email }}</td>
            <td class="ab-table__td">{{ company.numCurrencies }}</td>
            <td class="ab-table__td">{{ company.mainCurrencyAddress }}</td>
            <td class="ab-table__td ab-table__td--actions">
              <button
                type="button"
                class="ab-btn-delete"
                @click.stop="confirmDeleteCompany(company)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ConfirmModal
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
import { getCompanies, deleteCompany, type Company } from '@/services/addressBook/companyService'
import ConfirmModal from '@/components/modals/addressbook/ConfirmModal.vue'

defineOptions({ name: 'CompaniesTab' })

const companies = ref<Company[]>([])
const showConfirmModal = ref(false)
const confirmModalTitle = ref('')
const confirmModalMessage = ref('')
const companyToDelete = ref<Company | null>(null)
const sortKey = ref<keyof Company>('id')
const sortOrder = ref<'asc' | 'dsc'>('asc')

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

.companies-tab .ab-table__row {
  cursor: default;
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

.ab-btn-delete {
  padding: 0.35rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #ef4444;
  background: #fff;
  color: #b91c1c;
  font-size: 0.8125rem;
  cursor: pointer;
}

.ab-btn-delete:hover {
  background: #fef2f2;
}
</style>
