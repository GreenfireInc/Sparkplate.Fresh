<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '@/composables/useI18n'

defineProps<{ msg: string }>()

const count = ref(0)
const { t } = useI18n()
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">{{ t('countIs') }} {{ count }}</button>
    <p>
      {{ t('editToTestHMR') }}
      <code>{{ t('componentsHelloWorld') }}</code> {{ t('toTestHMR') }}
    </p>
  </div>

  <p>
    {{ t('checkOut') }}
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >{{ t('createVue') }}</a
    >,
    {{ t('theOfficialVueStarter') }}
  </p>
  <p>
    {{ t('install') }}
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">{{ t('volar') }}</a>
    {{ t('inYourIDE') }}
  </p>
  <p class="read-the-docs">{{ t('clickOnLogos') }}</p>
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