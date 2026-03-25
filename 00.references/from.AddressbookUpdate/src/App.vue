<template>
  <main class="container">
    <AddressBook />
  </main>
</template>

<script setup>
import AddressBook from './components/AddressBook.vue';
</script>

<style>
body {
  background-color: #e5e7eb;
  font-family: sans-serif;
  margin: 0;
}

.container {
  width: 100%;
  max-width: 80rem;
  margin: 2rem auto;
}
</style>