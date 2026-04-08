<template>
  <div class="ab-page__tab-panel">
    <div class="ab-table-wrapper">
      <table class="ab-table">
        <thead>
          <tr>
            <th class="ab-table__th ab-table__th--checkbox" scope="col">
              <input
                type="checkbox"
                class="ab-table__checkbox"
                :checked="isCurrentPageSelected"
                :disabled="exchanges.length === 0"
                @change="selectAllExchanges"
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
              Name
              <span v-if="sortKey === 'name'" class="ab-table__sort-arrow" aria-hidden="true">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th
              scope="col"
              class="ab-table__th ab-table__th--sortable"
              :class="{ 'ab-table__th--sorted': sortKey === 'email' }"
              @click="sortBy('email')"
            >
              Associated Email
              <span v-if="sortKey === 'email'" class="ab-table__sort-arrow" aria-hidden="true">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <!-- Referral Code column hidden -->
            <th
              scope="col"
              class="ab-table__th ab-table__th--sortable ab-table__th--hidden"
              :class="{ 'ab-table__th--sorted': sortKey === 'referralCode' }"
              @click="sortBy('referralCode')"
            >
              Referral Code
              <span v-if="sortKey === 'referralCode'" class="ab-table__sort-arrow" aria-hidden="true">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th
              scope="col"
              class="ab-table__th ab-table__th--sortable"
              :class="{ 'ab-table__th--sorted': sortKey === 'num_currencies' }"
              @click="sortBy('num_currencies')"
            >
              N° of Wallets
              <span v-if="sortKey === 'num_currencies'" class="ab-table__sort-arrow" aria-hidden="true">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th class="ab-table__th" scope="col">Currency Address</th>
            <th class="ab-table__th ab-table__th--actions" scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="paginatedExchanges.length === 0">
            <td colspan="8" class="ab-table__empty">No exchanges found.</td>
          </tr>
          <tr
            v-for="exchange in paginatedExchanges"
            :key="exchange.id"
            class="ab-table__row"
            @click="openExchangeModal(exchange)"
          >
            <td class="ab-table__td ab-table__td--checkbox">
              <input
                v-model="selectedExchanges"
                type="checkbox"
                class="ab-table__checkbox"
                :value="exchange.id"
                @click.stop
              />
            </td>
            <td class="ab-table__td">{{ exchange.id }}</td>
            <td class="ab-table__td">
              <a :href="exchange.url" target="_blank" @click.stop>{{ exchange.name }}</a>
            </td>
            <td class="ab-table__td">{{ exchange.email }}</td>
            <td class="ab-table__td ab-table__td--hidden">
              <a :href="exchange.referralUrl" target="_blank" @click.stop>{{ exchange.referralCode }}</a>
            </td>
            <td class="ab-table__td">{{ exchange.currencies.length }}</td>
            <td class="ab-table__td">
              <template v-if="exchange.currencies.length > 0">
                <span :title="exchange.currencies[0].address">
                  {{ exchange.currencies[0].abbreviation }}: {{ truncateAddress(exchange.currencies[0].address) }}
                </span>
              </template>
              <template v-else>N/A</template>
            </td>
            <td class="ab-table__td ab-table__td--actions" @click.stop>
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
import ExchangeModal from '@/components/modals/addressbook/modal.ExchangeDetails.vue';
import ActionsDropdown from '@/components/dropdown/dropdown.actions.vue';
import ConfirmModal from '@/components/modals/addressbook/ConfirmModal.vue';

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

function truncateAddress(address: string): string {
  if (!address || address.length <= 14) return address
  return `${address.slice(0, 7)}…${address.slice(-7)}`
}
</script>

<style lang="scss" scoped>
.ab-page__tab-panel {
  outline: none;
}

.ab-table-wrapper {
  width: 100%;
}

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

  &:hover { background: #e5e7eb; }
}

.ab-table__th--sorted {
  color: #2563eb;
}

.ab-table__sort-arrow {
  margin-left: 0.25rem;
  font-size: 0.625rem;
}

.ab-table__th--checkbox { width: 4%; }
.ab-table__th--actions  { width: 10%; }

.ab-table__row {
  cursor: pointer;
  transition: background 0.1s;

  &:hover { background: #f9fafb; }
}

.ab-table__td {
  padding: 0.3rem 1rem;
  text-align: left;
  white-space: nowrap;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
  font-size: 0.875rem;

  a {
    color: #2563eb;
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
}

.ab-table__td--checkbox { width: 4%; }
.ab-table__td--actions  { width: 10%; }

.ab-table__checkbox {
  cursor: pointer;
}

.ab-table__th--hidden,
.ab-table__td--hidden {
  display: none;
}

.ab-table__empty {
  text-align: center;
  padding: 5rem 1rem;
  color: #6b7280;
  font-size: 0.9375rem;
}
</style>