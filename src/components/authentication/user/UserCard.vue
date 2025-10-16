<template>
  <button
    @click="$emit('click')"
    :class="[
      'w-56 p-3 border border-white/20 rounded-lg mb-3',
      'hover:bg-white/10 hover:border-white/30',
      'transition-all duration-200 ease-in-out',
      'flex items-center gap-3 text-left shadow-md',
      'focus:outline-none focus:ring-2 focus:ring-white/50',
      'relative z-30',
      { 'bg-white/10 border-white/40': isSelected }
    ]"
  >
    <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
      <User :size="16" class="text-white" />
    </div>
    <span class="text-white font-medium text-sm">
      {{ name }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { User } from 'lucide-vue-next'

defineProps<{
  name: string
  isSelected: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

