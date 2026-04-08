<template>
  <button class="btn" @click="exportToCSV"><BookUser :size="18" class="btn-icon" />Export</button>
</template>

<script setup>
import { BookUser } from 'lucide-vue-next';

const exportToCSV = () => {
  // Implement export logic here
  console.log('Exporting to CSV...');
};
</script>

<style scoped>
/* Visual styles come from parent AddressBookPage `.actions :deep(.btn)` */
.btn {
  margin: 0;
}

.btn-icon {
  flex-shrink: 0;
}
</style>
