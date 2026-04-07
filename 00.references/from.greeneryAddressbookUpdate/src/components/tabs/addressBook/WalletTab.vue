<template>
  <div class="table-container">
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th class="col-checkbox">
              <input 
                type="checkbox" 
                @change="selectAllWallets"
                :checked="isCurrentPageSelected"
                :disabled="wallets.length === 0"
              />
            </th>
            <th @click="sortBy('id')" class="col-id sortable" :class="{ 'active-sort': sortKey === 'id' }">
              ID
              <span v-if="sortKey === 'id'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th @click="sortBy('name')" class="col-wallet sortable" :class="{ 'active-sort': sortKey === 'name' }">
              Wallet
              <span v-if="sortKey === 'name'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th @click="sortBy('num_currencies')" class="col-currencies sortable" :class="{ 'active-sort': sortKey === 'num_currencies' }">
              # of Currencies
              <span v-if="sortKey === 'num_currencies'" class="sort-arrow">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
            </th>
            <th class="col-addresses">Primary Address</th>
            <th class="col-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="paginatedWallets.length === 0">
            <td colspan="6" class="empty-state">
              No wallets found.
            </td>
          </tr>
          <tr v-for="wallet in paginatedWallets" :key="wallet.id" @click="openWalletModal(wallet)">
            <td class="col-checkbox">
              <input type="checkbox" :value="wallet.id" v-model="selectedWallets" @click.stop />
            </td>
            <td class="col-id">{{ wallet.id }}</td>
            <td class="col-wallet">{{ wallet.name }}</td>
            <td class="col-currencies">{{ wallet.currencies.length }}</td>
            <td class="col-addresses">{{ wallet.currencies[0]?.address || 'N/A' }}</td>
            <td class="col-actions">
                <ActionsDropdown @edit="" @delete="confirmDeleteWallet(wallet)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <WalletModal v-if="selectedWallet" :wallet="selectedWallet" @close="closeWalletModal" />
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
import ActionsDropdown from '../../dropdown/ActionsDropdown.vue';
import WalletModal from '../../modals/WalletModal.vue';
import ConfirmModal from '../../modals/confirmations/ConfirmModal.vue';
import { deleteWallet } from '../../../services/walletService';

interface Currency {
  name: string;
  abbreviation: string;
  address: string;
}

interface Wallet {
  id: number;
  name: string;
  currencies: Currency[];
}

const props = defineProps<{
  wallets: Wallet[];
}>();

const selectedWallets = ref<number[]>([]);
const selectedWallet = ref<Wallet | null>(null);
const currentPage = ref(1);
const itemsPerPage = 25;
const showConfirmModal = ref(false);
const confirmModalTitle = ref('');
const confirmModalMessage = ref('');
const walletToDelete = ref<Wallet | null>(null);
const sortKey = ref<keyof Wallet | 'num_currencies'>('id');
const sortOrder = ref<'asc' | 'dsc'>('asc');

function sortBy(key: keyof Wallet | 'num_currencies') {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'dsc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
}

const sortedWallets = computed(() => {
  const key = sortKey.value;
  const order = sortOrder.value;
  return [...props.wallets].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    if (key === 'num_currencies') {
      aValue = a.currencies.length;
      bValue = b.currencies.length;
    } else {
      aValue = a[key as keyof Wallet];
      bValue = b[key as keyof Wallet];
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

const totalPages = computed(() => Math.ceil(sortedWallets.value.length / itemsPerPage));

const paginatedWallets = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedWallets.value.slice(start, end);
});

const isCurrentPageSelected = computed(() => {
  const visibleWalletIds = paginatedWallets.value.map(w => w.id);
  if (visibleWalletIds.length === 0) return false;
  return visibleWalletIds.every(id => selectedWallets.value.includes(id));
});

const selectAllWallets = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const visibleWalletIds = paginatedWallets.value.map(w => w.id);
  if (target.checked) {
    selectedWallets.value = [...new Set([...selectedWallets.value, ...visibleWalletIds])];
  } else {
    selectedWallets.value = selectedWallets.value.filter(id => !visibleWalletIds.includes(id));
  }
};

const openWalletModal = (wallet: Wallet) => {
  selectedWallet.value = wallet;
};

const closeWalletModal = () => {
  selectedWallet.value = null;
};

const confirmDeleteWallet = (wallet: Wallet) => {
  walletToDelete.value = wallet;
  confirmModalTitle.value = 'Delete Wallet';
  confirmModalMessage.value = `Are you sure you want to delete the wallet ${wallet.name}?`;
  showConfirmModal.value = true;
};

const onConfirmDelete = async () => {
  if (walletToDelete.value) {
    await deleteWallet(walletToDelete.value.id);
    // TODO: This should reload the wallets from the database
    // for now we just remove it from the array
    const index = props.wallets.findIndex(w => w.id === walletToDelete.value!.id);
    if (index > -1) {
      props.wallets.splice(index, 1);
    }
  }
  closeConfirmModal();
};

const closeConfirmModal = () => {
    showConfirmModal.value = false;
    walletToDelete.value = null;
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

.empty-state {
  text-align: center;
  padding: 5rem;
  color: #6b7280;
  font-size: 1rem;
}

.col-checkbox { width: 4%; }
.col-id { width: 4%; }
.col-wallet { width: 20%; }
.col-currencies { width: 15%; }
.col-addresses { width: 47%; }
.col-actions { width: 10%; }
</style>

