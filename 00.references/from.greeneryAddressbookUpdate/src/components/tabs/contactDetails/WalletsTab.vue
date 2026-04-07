<template>
  <div class="wallets-tab">
    <div v-if="wallets.length === 0" class="empty-state">
      <p>No wallets added yet. Use the actions menu to add a currency wallet.</p>
    </div>
    <div v-else class="wallets-list">
      <WalletAddressCard
        v-for="wallet in wallets"
        :key="wallet.id"
        :wallet="wallet"
        @delete="handleDelete"
        @copy="handleCopy"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { getWalletsForContact, deleteWallet, type Wallet } from '../../../services/walletService';
import WalletAddressCard from '../../structure/WalletAddressCard.vue';

const props = defineProps<{
  contactId: number | null;
}>();

const wallets = ref<Wallet[]>([]);

const loadWallets = async () => {
  if (props.contactId) {
    wallets.value = await getWalletsForContact(props.contactId);
  } else {
    wallets.value = [];
  }
};

const handleDelete = async (walletId: number) => {
  await deleteWallet(walletId);
  await loadWallets();
  // Emit event to parent to refresh wallet count
  emit('wallet-deleted');
};

const handleCopy = (address: string) => {
  console.log('Address copied to clipboard:', address);
  // You could add a toast notification here
};

const emit = defineEmits<{
  (e: 'wallet-deleted'): void;
}>();

onMounted(() => {
  loadWallets();
});

watch(() => props.contactId, () => {
  loadWallets();
}, { immediate: true });

// Expose a method to refresh wallets from parent
defineExpose({
  refresh: loadWallets
});
</script>

<style scoped>
.wallets-tab {
  padding: 1rem 0;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
}

.empty-state p {
  margin: 0;
  font-size: 0.875rem;
}

.wallets-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}
</style>

