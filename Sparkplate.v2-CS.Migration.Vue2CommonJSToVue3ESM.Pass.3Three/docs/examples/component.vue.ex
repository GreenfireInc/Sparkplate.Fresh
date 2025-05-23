<template>
  <div class="example-component">
    <h2>{{ title }}</h2>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
    
    <div v-if="loading" class="loading">Loading data...</div>
    <div v-else>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// Vue 2 Options API Version (for reference)
/*
export default {
  name: 'ExampleComponent',
  props: {
    title: {
      type: String,
      default: 'Example Component'
    }
  },
  data() {
    return {
      count: 0,
      items: [],
      loading: false
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    async fetchData() {
      this.loading = true
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.items = [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' },
          { id: 3, name: 'Item 3' }
        ]
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    }
  }
}
*/
</script>

<script setup>
// Vue 3 Composition API Version
import { ref, onMounted } from 'vue'

// Props
const props = defineProps({
  title: {
    type: String,
    default: 'Example Component'
  }
})

// State
const count = ref(0)
const items = ref([])
const loading = ref(false)

// Methods
const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}

const fetchData = async () => {
  loading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    items.value = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
    ]
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

// Lifecycle hooks
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.example-component {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin: 1rem;
}

.loading {
  color: #666;
  font-style: italic;
}

button {
  margin-right: 0.5rem;
  padding: 0.25rem 0.5rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style> 