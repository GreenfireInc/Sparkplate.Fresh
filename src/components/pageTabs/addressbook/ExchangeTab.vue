<template>
  <div class="table-container">
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th class="col-checkbox">
              <input 
                type="checkbox" 
                @change="selectAllExchanges"
                :checked="isCurrentPageSelected"
                :disabled="exchanges.length === 0"
              />
            </th>
            <th @click="sortBy('id')" class="col-id sortable" :class="{ 'active-sort': sortKey === 'id' }">
              ID
              <span v-if="sortKey === 'id'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th @click="sortBy('name')" class="col-name sortable" :class="{ 'active-sort': sortKey === 'name' }">
              Name
              <span v-if="sortKey === 'name'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th @click="sortBy('email')" class="col-email sortable" :class="{ 'active-sort': sortKey === 'email' }">
              Associated Email
              <span v-if="sortKey === 'email'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th @click="sortBy('referralCode')" class="col-referral sortable" :class="{ 'active-sort': sortKey === 'referralCode' }">
              Referral Code
              <span v-if="sortKey === 'referralCode'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th @click="sortBy('num_currencies')" class="col-currencies sortable" :class="{ 'active-sort': sortKey === 'num_currencies' }">
              N° of Wallets
              <span v-if="sortKey === 'num_currencies'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th class="col-address">Currency Address</th>
            <th class="col-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="paginatedExchanges.length === 0">
            <td colspan="8" class="empty-state">
              No exchanges found.
            </td>
          </tr>
          <tr v-for="exchange in paginatedExchanges" :key="exchange.id" @click="openExchangeModal(exchange)">
            <td class="col-checkbox">
              <input type="checkbox" :value="exchange.id" v-model="selectedExchanges" @click.stop />
            </td>
            <td class="col-id">{{ exchange.id }}</td>
            <td class="col-name">
              <a :href="exchange.url" target="_blank" @click.stop>{{ exchange.name }}</a>
            </td>
            <td class="col-email">{{ exchange.email }}</td>
            <td class="col-referral">
              <a :href="exchange.referralUrl" target="_blank" @click.stop>{{ exchange.referralCode }}</a>
            </td>
            <td class="col-currencies">{{ exchange.currencies.length }}</td>
            <td class="col-address" v-if="exchange.currencies.length > 0">
              {{ exchange.currencies[0].abbreviation }}: {{ exchange.currencies[0].address }}
            </td>
            <td class="col-address" v-else>N/A</td>
            <td class="col-actions">
                <ActionsDropdown @edit="" @delete="confirmDeleteExchange(exchange)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
     <ExchangeModal v-if="selectedExchange" :exchange="selectedExchange" @close="closeExchangeModal" />
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
import { ref, computed } from 'vue';
import ExchangeModal from '@/components/addressBook/ExchangeModal.vue';
import ActionsDropdown from '@/components/addressBook/ActionsDropdown.vue';
import ConfirmModal from '@/components/addressBook/modals/ConfirmModal.vue';

interface Currency {
  name: string;
  abbreviation: string;
  address: string;
}

interface Exchange {
  id: number;
  name: string;
  url: string;
  referralUrl: string;
  referralCode: string;
  currencies: Currency[];
  email: string;
}

const props = defineProps<{
  exchanges: Exchange[];
}>();

const selectedExchange = ref<Exchange | null>(null);
const selectedExchanges = ref<number[]>([]);
const currentPage = ref(1);
const itemsPerPage = 25;
const showConfirmModal = ref(false);
const confirmModalTitle = ref('');
const confirmModalMessage = ref('');
const exchangeToDelete = ref<Exchange | null>(null);
const sortKey = ref<keyof Exchange | 'num_currencies'>('id');
const sortOrder = ref<'asc' | 'dsc'>('asc');

function sortBy(key: keyof Exchange | 'num_currencies') {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'dsc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
}

const sortedExchanges = computed(() => {
  const key = sortKey.value;
  const order = sortOrder.value;
  return [...props.exchanges].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    if (key === 'num_currencies') {
      aValue = a.currencies.length;
      bValue = b.currencies.length;
    } else {
      aValue = a[key as keyof Exchange];
      bValue = b[key as keyof Exchange];
    }

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

const totalPages = computed(() => Math.ceil(props.exchanges.length / itemsPerPage));

const paginatedExchanges = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedExchanges.value.slice(start, end);
});

const isCurrentPageSelected = computed(() => {
  const visibleExchangeIds = paginatedExchanges.value.map(e => e.id);
  if (visibleExchangeIds.length === 0) return false;
  return visibleExchangeIds.every(id => selectedExchanges.value.includes(id));
});

const selectAllExchanges = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const visibleExchangeIds = paginatedExchanges.value.map(e => e.id);
  if (target.checked) {
    selectedExchanges.value = [...new Set([...selectedExchanges.value, ...visibleExchangeIds])];
  } else {
    selectedExchanges.value = selectedExchanges.value.filter(id => !visibleExchangeIds.includes(id));
  }
};

const openExchangeModal = (exchange: Exchange) => {
  selectedExchange.value = exchange;
};

const closeExchangeModal = () => {
  selectedExchange.value = null;
};

const confirmDeleteExchange = (exchange: Exchange) => {
  exchangeToDelete.value = exchange;
  confirmModalTitle.value = 'Delete Exchange';
  confirmModalMessage.value = `Are you sure you want to delete the exchange ${exchange.name}?`;
  showConfirmModal.value = true;
};

const onConfirmDelete = async () => {
  if (exchangeToDelete.value) {
    // TODO: This should delete the exchange from the database
    // for now we just remove it from the array
    const index = props.exchanges.findIndex(e => e.id === exchangeToDelete.value!.id);
    if (index > -1) {
      props.exchanges.splice(index, 1);
    }
  }
  closeConfirmModal();
};

const closeConfirmModal = () => {
    showConfirmModal.value = false;
    exchangeToDelete.value = null;
}
</script>

<style scoped>
.table-container {
  background-color: #ffffff;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.table-wrapper {
  overflow-x: auto;
  min-height: 800px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #f3f4f6;
}

tr {
  cursor: pointer;
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

.action-dropdown {
  position: relative;
}

.action-dropdown button {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}

.dropdown-content {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  z-index: 10;
  display: flex;
  flex-direction: column;
}

.dropdown-content a {
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #374151;
  white-space: nowrap;
}

.dropdown-content a:hover {
  background-color: #f3f4f6;
}

.empty-state {
  text-align: center;
  padding: 5rem;
  color: #6b7280;
  font-size: 1rem;
}

.col-checkbox { width: 4%; }
.col-id { width: 4%; }
.col-name { width: 15%; }
.col-email { width: 20%; }
.col-referral { width: 15%; }
.col-currencies { width: 10%; }
.col-address { width: 22%; }
.col-actions { width: 10%; }
</style>