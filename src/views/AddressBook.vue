<template>
  <div class="view address-book-view">
    <AddressBookPage />
  </div>
</template>

<script setup lang="ts">
import AddressBookPage from '@/components/addressBook/AddressBookPage.vue'
</script>

<style scoped>
.address-book-view {
  padding: 0.5rem 1rem 1.5rem;
  max-width: 1280px;
  margin: 0 auto;
}
</style>
