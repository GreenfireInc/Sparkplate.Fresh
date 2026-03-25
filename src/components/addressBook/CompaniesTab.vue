<template>
  <div>
    <table>
      <thead>
        <tr>
          <th @click="sortBy('id')" class="sortable" :class="{ 'active-sort': sortKey === 'id' }">
            ID
            <span v-if="sortKey === 'id'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
          </th>
          <th @click="sortBy('name')" class="sortable" :class="{ 'active-sort': sortKey === 'name' }">
            Company
            <span v-if="sortKey === 'name'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
          </th>
          <th @click="sortBy('mainContact')" class="sortable" :class="{ 'active-sort': sortKey === 'mainContact' }">
            Main Contact
            <span v-if="sortKey === 'mainContact'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
          </th>
          <th @click="sortBy('position')" class="sortable" :class="{ 'active-sort': sortKey === 'position' }">
            Position
            <span v-if="sortKey === 'position'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
          </th>
          <th @click="sortBy('email')" class="sortable" :class="{ 'active-sort': sortKey === 'email' }">
            Email address
            <span v-if="sortKey === 'email'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
          </th>
          <th @click="sortBy('numCurrencies')" class="sortable" :class="{ 'active-sort': sortKey === 'numCurrencies' }">
            # of Currencies
            <span v-if="sortKey === 'numCurrencies'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
          </th>
          <th>Main Currency Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="sortedCompanies.length === 0">
          <td colspan="8" class="empty-state">
            No companies found.
          </td>
        </tr>
        <tr v-for="company in sortedCompanies" :key="company.id">
          <td>{{ company.id }}</td>
          <td>{{ company.name }}</td>
          <td>{{ company.mainContact }}</td>
          <td>{{ company.position }}</td>
          <td>{{ company.email }}</td>
          <td>{{ company.numCurrencies }}</td>
          <td>{{ company.mainCurrencyAddress }}</td>
          <td>
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
     <ConfirmModal 
      :show="showConfirmModal"
      :title="confirmModalTitle"
      :message="confirmModalMessage"
      @close="closeConfirmModal"
      @confirm="onConfirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getCompanies, deleteCompany, type Company } from '@/services/addressBook/companyService';
import ConfirmModal from './modals/ConfirmModal.vue';

const companies = ref<Company[]>([]);
const showConfirmModal = ref(false);
const confirmModalTitle = ref('');
const confirmModalMessage = ref('');
const companyToDelete = ref<Company | null>(null);
const sortKey = ref<keyof Company>('id');
const sortOrder = ref<'asc' | 'dsc'>('asc');

onMounted(async () => {
  await loadCompanies();
});

async function loadCompanies() {
    companies.value = await getCompanies();
    closeConfirmModal();
}

function sortBy(key: keyof Company) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'dsc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
}

const sortedCompanies = computed(() => {
  const key = sortKey.value;
  const order = sortOrder.value;
  return [...companies.value].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (aValue === bValue) {
      return 0;
    }

    if (order === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
});

const confirmDeleteCompany = (company: Company) => {
  companyToDelete.value = company;
  confirmModalTitle.value = 'Delete Company';
  confirmModalMessage.value = `Are you sure you want to delete the company ${company.name}? This will also delete all associated contacts.`;
  showConfirmModal.value = true;
};

const onConfirmDelete = async () => {
  if (companyToDelete.value) {
    await deleteCompany(companyToDelete.value.id);
  }
  await loadCompanies();
};

const closeConfirmModal = () => {
    showConfirmModal.value = false;
    companyToDelete.value = null;
}
</script>

<style scoped>
/* Add your styles here */
table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #f3f4f6;
}

tr:hover {
  background-color: #f9fafb;
}

th,
td {
  padding: 1rem;
  text-align: left;
  white-space: nowrap;
  border-bottom: 1px solid #e5e7eb;
}

th {
  font-size: 0.875rem;
  font-weight: 600;
  color: #4b5563;
  text-transform: uppercase;
}

th.sortable {
  cursor: pointer;
}

th.sortable:hover {
  background-color: #e5e7eb;
}

.sort-arrow {
  margin-left: 0.25rem;
  font-size: 0.625rem;
}

td {
  color: #374151;
}

.empty-state {
  text-align: center;
  padding: 5rem;
  color: #6b7280;
  font-size: 1rem;
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