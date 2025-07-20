<template>
  <div class="relative" ref="dropdownRef">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
    </label>
    
    <!-- Dropdown trigger -->
    <div 
      @click="toggleDropdown"
      :class="[
        'relative w-full bg-white border rounded-lg px-4 py-3 text-left cursor-pointer transition-all duration-200 ease-in-out',
        isOpen 
          ? 'border-blue-500 ring-2 ring-blue-200 shadow-lg' 
          : 'border-gray-300 hover:border-gray-400 shadow-sm',
        disabled ? 'bg-gray-50 cursor-not-allowed opacity-60' : 'hover:shadow-md'
      ]"
    >
      <div class="flex items-center justify-between">
        <span :class="['text-sm', selectedValue ? 'text-gray-900' : 'text-gray-500']">
          {{ selectedValue || placeholder }}
        </span>
        
        <!-- Dropdown arrow with animation -->
        <div :class="['transition-transform duration-200 ease-in-out', isOpen ? 'rotate-180' : '']">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Dropdown menu with slide animation -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-show="isOpen"
        class="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-60 overflow-auto"
      >
        <!-- Search input (optional) -->
        <div v-if="searchable" class="p-3 border-b border-gray-100">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search options..."
              class="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @click.stop
            >
            <div class="absolute left-3 top-2.5">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Options list -->
        <div class="py-1">
          <div
            v-for="option in filteredOptions"
            :key="getOptionValue(option)"
            @click="selectOption(option)"
            :class="[
              'flex items-center px-4 py-3 text-sm cursor-pointer transition-colors duration-150',
              getOptionValue(option) === modelValue
                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            ]"
          >
            <!-- Option icon (if provided) -->
            <div v-if="getOptionIcon(option)" class="mr-3">
              <component :is="getOptionIcon(option)" class="w-4 h-4" />
            </div>
            
            <div class="flex-1">
              <div class="font-medium">{{ getOptionLabel(option) }}</div>
              <div v-if="getOptionDescription(option)" class="text-xs text-gray-500 mt-1">
                {{ getOptionDescription(option) }}
              </div>
            </div>
            
            <!-- Selected indicator -->
            <div v-if="getOptionValue(option) === modelValue" class="ml-2">
              <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
          
          <!-- No results message -->
          <div v-if="filteredOptions.length === 0" class="px-4 py-3 text-sm text-gray-500 text-center">
            No options found
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted, PropType } from 'vue'

export interface DropdownOption {
  value: string | number
  label: string
  description?: string
  icon?: string
  disabled?: boolean
}

export default defineComponent({
  name: 'ElegantDropdown',
  emits: ['update:modelValue', 'change'],
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array as PropType<(DropdownOption | string)[]>,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Select an option...'
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const dropdownRef = ref<HTMLElement>()
    const isOpen = ref(false)
    const searchQuery = ref('')

    const selectedValue = computed(() => {
      const option = props.options.find(opt => getOptionValue(opt) === props.modelValue)
      return option ? getOptionLabel(option) : ''
    })

    const filteredOptions = computed(() => {
      if (!props.searchable || !searchQuery.value) {
        return props.options.filter(opt => !getOptionDisabled(opt))
      }
      
      const query = searchQuery.value.toLowerCase()
      return props.options.filter(opt => {
        const label = getOptionLabel(opt).toLowerCase()
        const description = getOptionDescription(opt)?.toLowerCase() || ''
        return (label.includes(query) || description.includes(query)) && !getOptionDisabled(opt)
      })
    })

    // Helper functions to handle both string and object options
    const getOptionValue = (option: DropdownOption | string) => {
      return typeof option === 'string' ? option : option.value
    }

    const getOptionLabel = (option: DropdownOption | string) => {
      return typeof option === 'string' ? option : option.label
    }

    const getOptionDescription = (option: DropdownOption | string) => {
      return typeof option === 'string' ? undefined : option.description
    }

    const getOptionIcon = (option: DropdownOption | string) => {
      return typeof option === 'string' ? undefined : option.icon
    }

    const getOptionDisabled = (option: DropdownOption | string) => {
      return typeof option === 'string' ? false : option.disabled || false
    }

    const toggleDropdown = () => {
      if (props.disabled) return
      isOpen.value = !isOpen.value
      if (isOpen.value) {
        searchQuery.value = ''
      }
    }

    const selectOption = (option: DropdownOption | string) => {
      if (getOptionDisabled(option)) return
      
      const value = getOptionValue(option)
      emit('update:modelValue', value)
      emit('change', value)
      isOpen.value = false
      searchQuery.value = ''
    }

    const handleClickOutside = (event: Event) => {
      if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
        isOpen.value = false
        searchQuery.value = ''
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      dropdownRef,
      isOpen,
      searchQuery,
      selectedValue,
      filteredOptions,
      getOptionValue,
      getOptionLabel,
      getOptionDescription,
      getOptionIcon,
      getOptionDisabled,
      toggleDropdown,
      selectOption
    }
  }
})
</script>

<style scoped>
/* Custom scrollbar for the dropdown */
.max-h-60::-webkit-scrollbar {
  width: 4px;
}

.max-h-60::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.max-h-60::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.max-h-60::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
