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
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  cursor: pointer;
  margin-left: 1rem;
  color: #1f2937;
  font-weight: 500;
}

.btn-icon {
  flex-shrink: 0;
}

.btn:hover {
  background-color: #f3f4f6;
}
</style>
