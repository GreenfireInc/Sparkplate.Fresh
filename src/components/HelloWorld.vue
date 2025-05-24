<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >,
    the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
h1 {
  margin-top: 0;
  margin-bottom: 0.5rem; /* Retain a small space below heading */
}

p {
  margin-top: 0;
  margin-bottom: 0.5rem; /* Retain a small space below paragraphs, last one can be 0 */
}

.card p {
  margin-bottom: 0; /* No space needed below p in card if button is main action item */
}

/* Ensure the last paragraph has no bottom margin to prevent extra space at the very bottom */
p:last-child {
  margin-bottom: 0;
}

.read-the-docs {
  color: #888;
}
</style> 