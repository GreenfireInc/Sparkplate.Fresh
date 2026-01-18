<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="modal-overlay"
        @click.self="closeModal"
      >
        <div class="modal-container">
          <!-- Close Button -->
          <button
            @click="closeModal"
            class="modal-close-btn"
            aria-label="Close modal"
          >
            <X :size="20" />
          </button>

          <!-- Modal Content -->
          <div class="modal-content">
            <!-- Currency Logo -->
            <div class="currency-logo-section">
              <img
                :src="getCurrencyLogo(currency)"
                :alt="currencySymbol + ' logo'"
                class="currency-logo"
                :ref="(el) => { if (el) (el as any).__currency = currency }"
                @error="handleImageError"
              />
            </div>

            <!-- Currency Symbol & Name -->
            <div class="currency-header">
              <h2 class="currency-symbol">{{ currencySymbol }}</h2>
              <p class="currency-name">{{ currency?.name || 'N/A' }}</p>
            </div>

            <!-- Currency Facts -->
            <div class="currency-facts">
              <div class="fact-item">
                <span class="fact-label">Type</span>
                <span class="fact-value">
                  <span 
                    class="type-badge"
                    :class="getTypeClass(currency?.type)"
                  >
                    {{ currency?.type || 'N/A' }}
                  </span>
                </span>
              </div>

              <div class="fact-item">
                <span class="fact-label">Consensus</span>
                <span class="fact-value">{{ formatConsensusType(currency?.consensusType) }}</span>
              </div>

              <div v-if="currency?.description" class="fact-item full-width">
                <span class="fact-label">Description</span>
                <p class="fact-description">{{ currency.description }}</p>
              </div>

              <div v-if="currency?.class && currency.class.length > 0" class="fact-item full-width">
                <span class="fact-label">Class</span>
                <div class="class-badges">
                  <span
                    v-for="(cls, idx) in currency.class"
                    :key="idx"
                    class="class-badge"
                  >
                    {{ cls }}
                  </span>
                </div>
              </div>

              <!-- Additional fields that might exist -->
              <div v-if="currency?.website" class="fact-item full-width">
                <span class="fact-label">Website</span>
                <a 
                  :href="currency.website" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="fact-link"
                >
                  {{ currency.website }}
                  <ExternalLink :size="14" class="inline-block ml-1" />
                </a>
              </div>

              <div v-if="currency?.whitepaper" class="fact-item full-width">
                <span class="fact-label">Whitepaper</span>
                <a 
                  :href="currency.whitepaper" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="fact-link"
                >
                  View Whitepaper
                  <ExternalLink :size="14" class="inline-block ml-1" />
                </a>
              </div>

              <div v-if="currency?.launchDate" class="fact-item">
                <span class="fact-label">Launch Date</span>
                <span class="fact-value">{{ currency.launchDate }}</span>
              </div>

              <div v-if="currency?.blockchain" class="fact-item">
                <span class="fact-label">Blockchain</span>
                <span class="fact-value">{{ currency.blockchain }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { X, ExternalLink } from 'lucide-vue-next'

interface Props {
  isOpen: boolean
  currency: any
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const currencySymbol = computed(() => {
  return props.currency?.symbol || props.currency?.tickerSymbol || props.currency?.ticker || 'N/A'
})

const closeModal = () => {
  emit('close')
}

const getCurrencyLogo = (currency: any): string => {
  const symbol = (currency?.symbol || currency?.tickerSymbol || currency?.ticker || '').toLowerCase()
  
  if (symbol) {
    return `./assets/icons/crypto/${symbol}.svg`
  }
  
  // Fallback: generic placeholder
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iMTYiIGZpbGw9IiNFNUU3RUIiLz4KPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMEMzLjU4IDAgMCAzLjU4IDAgOEMwIDEyLjQyIDMuNTggMTYgOCAxNkMxMi40MiAxNiAxNiAxMi00MiAxNiA4QzE2IDMuNTggMTIuNDIgMCA4IDBaIiBmaWxsPSIjOUI5Q0E1Ii8+Cjwvc3ZnPgo8L3N2Zz4K'
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  const currency = (event.target as any).__currency
  const symbol = currency ? (currency.symbol || currency.tickerSymbol || currency.ticker || '').toLowerCase() : ''
  
  // Try alternative CoinGecko URL format if first attempt failed
  if (symbol && !img.src.includes('data:image')) {
    const alternativeUrls = [
      `https://assets.coingecko.com/coins/images/1/thumb/${symbol}.png`,
      `https://cryptoicons.org/api/icon/${symbol}/200`,
      `https://coin-images.coingecko.com/coins/images/1/large/${symbol}.png`
    ]
    
    const currentAttempt = (img as any).__attempt || 0
    if (currentAttempt < alternativeUrls.length) {
      (img as any).__attempt = currentAttempt + 1
      img.src = alternativeUrls[currentAttempt]
      return
    }
  }
  
  // Final fallback: placeholder
  img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iMTYiIGZpbGw9IiNFNUU3RUIiLz4KPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMEMzLjU4IDAgMCAzLjU4IDAgOEMwIDEyLjQyIDMuNTggMTYgOCAxNkMxMi40MiAxNiAxNiAxMi00MiAxNiA4QzE2IDMuNTggMTIuNDIgMCA4IDBaIiBmaWxsPSIjOUI5Q0E1Ii8+Cjwvc3ZnPgo8L3N2Zz4K'
}

const getTypeClass = (type: string | undefined): string => {
  if (!type) return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  return type === 'coin'
    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
}

const formatConsensusType = (consensusType: string | undefined): string => {
  if (!consensusType) return 'N/A'
  return consensusType.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

// Close modal on Escape key
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isOpen) {
    closeModal()
  }
}

// Add/remove event listener
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleKeyDown)
}
</script>

<style scoped>
/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  overflow-y: auto;
}

/* Modal Container - Portrait Orientation */
.modal-container {
  position: relative;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 28rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
}

@media (prefers-color-scheme: dark) {
  .modal-container {
    background: #1f2937;
  }
}

/* Close Button */
.modal-close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: transparent;
  color: #6b7280;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.modal-close-btn:hover {
  background: #f3f4f6;
  color: #111827;
}

@media (prefers-color-scheme: dark) {
  .modal-close-btn {
    color: #9ca3af;
  }
  
  .modal-close-btn:hover {
    background: #374151;
    color: #f9fafb;
  }
}

/* Modal Content */
.modal-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Currency Logo Section */
.currency-logo-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 0;
}

.currency-logo {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Currency Header */
.currency-header {
  text-align: center;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
}

@media (prefers-color-scheme: dark) {
  .currency-header {
    border-bottom-color: #374151;
  }
}

.currency-symbol {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

@media (prefers-color-scheme: dark) {
  .currency-symbol {
    color: #f9fafb;
  }
}

.currency-name {
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0.5rem 0 0 0;
}

@media (prefers-color-scheme: dark) {
  .currency-name {
    color: #9ca3af;
  }
}

/* Currency Facts */
.currency-facts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.fact-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.fact-item.full-width {
  grid-column: 1 / -1;
}

.fact-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
}

@media (prefers-color-scheme: dark) {
  .fact-label {
    color: #9ca3af;
  }
}

.fact-value {
  font-size: 0.875rem;
  color: #111827;
  font-weight: 500;
}

@media (prefers-color-scheme: dark) {
  .fact-value {
    color: #f9fafb;
  }
}

.fact-description {
  font-size: 0.875rem;
  line-height: 1.5;
  color: #4b5563;
  margin: 0;
}

@media (prefers-color-scheme: dark) {
  .fact-description {
    color: #d1d5db;
  }
}

.fact-link {
  font-size: 0.875rem;
  color: #3b82f6;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: color 0.2s;
}

.fact-link:hover {
  color: #2563eb;
  text-decoration: underline;
}

/* Type Badge */
.type-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Class Badges */
.class-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.class-badge {
  padding: 0.375rem 0.75rem;
  background: #f3f4f6;
  color: #374151;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
}

@media (prefers-color-scheme: dark) {
  .class-badge {
    background: #374151;
    color: #d1d5db;
  }
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9);
}

/* Scrollbar Styling */
.modal-container::-webkit-scrollbar {
  width: 8px;
}

.modal-container::-webkit-scrollbar-track {
  background: transparent;
}

.modal-container::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

.modal-container::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

@media (prefers-color-scheme: dark) {
  .modal-container::-webkit-scrollbar-thumb {
    background: #4b5563;
  }
  
  .modal-container::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
  }
}
</style>

