<template>
  <button
    @click="$emit('click')"
    :class="[
      'w-44 p-2 bg-gradient-to-r from-blue-700/40 to-blue-800/40 border border-blue-600/50 rounded-lg mb-1',
      'hover:from-blue-700/60 hover:to-blue-800/60 hover:border-blue-600/70',
      'transition-all duration-200 ease-in-out',
      'flex items-center gap-2 text-left shadow-lg',
      'focus:outline-none focus:ring-2 focus:ring-blue-400/50',
      'relative z-30',
      { 'from-blue-700/60 to-blue-800/60 border-blue-600/70': isSelected }
    ]"
  >
    <div class="w-8 h-8 rounded-full bg-blue-700/50 flex items-center justify-center overflow-hidden">
      <img
        v-if="showGravatar"
        :src="avatarUrl!"
        alt=""
        class="w-full h-full object-cover"
        @error="gravatarFailed = true"
      />
      <User v-else :size="16" class="text-white" />
    </div>
    <span class="text-white font-medium text-sm">
      {{ name }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { User } from 'lucide-vue-next'
import { gravatarUrl } from '@/lib/cores/displayStandard/display.image.gravatar'

const props = defineProps<{
  name: string
  email?: string
  isSelected: boolean
}>()

defineEmits<{
  click: []
}>()

const gravatarFailed = ref(false)

watch(
  () => props.email,
  () => {
    gravatarFailed.value = false
  },
)

const avatarUrl = computed(() => {
  if (!props.email) return null
  return gravatarUrl(props.email, { size: 32, defaultImg: '404' })
})

const showGravatar = computed(() => Boolean(avatarUrl.value && !gravatarFailed.value))
</script>

