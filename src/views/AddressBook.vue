<template>
  <div class="view address-book">
    <header class="address-book-hero">
      <TooltipProvider>
        <TooltipRoot :delay-duration="300">
          <TooltipTrigger as-child>
            <h1 class="address-book-title" tabindex="0">Address Book</h1>
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent
              class="address-book-tooltip-content"
              side="bottom"
              align="start"
              :side-offset="6"
              :collision-padding="16"
              :avoid-collisions="true"
            >
              Manage contacts, wallet addresses, companies, and file imports in one place.
              <TooltipArrow class="address-book-tooltip-arrow" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
      </TooltipProvider>
    </header>
<!-- 
    <Separator class="address-book-separator" /> -->

    <section class="address-book-section" aria-label="Address book">
      <div class="address-book-section-content">
        <AddressBookPage embedded />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  Separator,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipPortal,
  TooltipContent,
  TooltipArrow
} from 'radix-vue'
import AddressBookPage from '@/components/addressBook/AddressBookPage.vue'
</script>

<style lang="scss" scoped>
.address-book {
  width: 100%;
  padding: 2rem;
  padding-bottom: 3rem;
  min-height: 100vh;
  background: #fff;
}

.address-book-hero {
  margin-bottom: 0;
}

.address-book-title {
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  cursor: help;
  outline: none;
  border-radius: 0.25rem;
}

.address-book-title:focus-visible {
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px #2563eb;
}

.address-book-tooltip-content {
  max-width: 22rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  line-height: 1.45;
  color: #f9fafb;
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 0.375rem;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.12),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.address-book-tooltip-arrow {
  fill: #1f2937;
}

.address-book-separator {
  display: block;
  height: 1px;
  margin: 1.25rem 0 1.5rem;
  background: #e5e7eb;
}

.address-book-section {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}

.address-book-section-content {
  padding: 1rem;
  padding-bottom: 1.5rem;
  background: #f9fafb;

  :deep(.address-book-container--embedded .table-container) {
    border-radius: 0.375rem;
  }
}
</style>
