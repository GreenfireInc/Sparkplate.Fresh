<template>
  <div class="wallets-tab">
    <div v-if="wallets.length === 0" class="empty-state">
      <p>No wallets added yet. Use the actions menu to add a currency wallet.</p>
    </div>
    <div v-else class="wallets-list">
      <CardWalletAddress
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
import { ref, onMounted, watch } from 'vue'
import { getWalletsForContact, deleteWallet, type Wallet } from '@/services/addressBook/service.addressBook.Wallet'
import CardWalletAddress from '@/components/structure/card.WalletAddress.vue'

defineOptions({ name: 'TabDetailsContactWallets' })

const props = defineProps<{
  contactId: number | null
}>()

const wallets = ref<Wallet[]>([])

const loadWallets = async () => {
  if (props.contactId) {
    wallets.value = await getWalletsForContact(props.contactId)
  } else {
    wallets.value = []
  }
}

const handleDelete = async (walletId: number) => {
  if (confirm('Are you sure you want to delete this wallet?')) {
    await deleteWallet(walletId)
    await loadWallets()
    emit('wallet-deleted')
  }
}

const handleCopy = (address: string) => {
  console.log('Address copied to clipboard:', address)
}

const emit = defineEmits<{
  (e: 'wallet-deleted'): void
}>()

onMounted(() => {
  loadWallets()
})

watch(() => props.contactId, () => {
  loadWallets()
}, { immediate: true })

defineExpose({
  refresh: loadWallets,
})
</script>

<style scoped>
.wallets-tab {
  padding: 1rem 0;
  max-height: 60vh;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding-right: 0.5rem;
}

.wallets-tab::-webkit-scrollbar {
  width: 8px;
}

.wallets-tab::-webkit-scrollbar-track {
  background: transparent;
}

.wallets-tab::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

.wallets-tab::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
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
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
}
</style>
