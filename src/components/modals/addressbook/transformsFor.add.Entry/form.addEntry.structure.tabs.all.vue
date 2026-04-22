<template>
  <TabsList class="ac-tabs__list" :aria-label="listAriaLabel">
    <TabsTrigger :value="generalValue" class="ac-tabs__trigger">
      {{ generalLabel }}
    </TabsTrigger>
    <TabsTrigger :value="secondaryValue" class="ac-tabs__trigger">
      <span class="ac-tabs-all__secondary-label">
        <Coins
          v-if="showSecondaryCoinsIcon"
          :size="14"
          class="ac-tabs-all__secondary-icon"
          aria-hidden="true"
        />
        {{ secondaryLabel }}
        <span v-if="showSecondaryBadge" class="ac-tabs-all__badge">{{ secondaryBadgeCount }}</span>
      </span>
    </TabsTrigger>
  </TabsList>
</template>

<script setup lang="ts">
import { TabsList, TabsTrigger } from 'radix-vue'
import { Coins } from 'lucide-vue-next'

defineOptions({ name: 'FormAddEntryStructureTabsAll' })

withDefaults(
  defineProps<{
    listAriaLabel?: string
    generalValue?: string
    generalLabel?: string
    secondaryValue?: string
    secondaryLabel?: string
    /** Shown in a pill on the second tab (e.g. currency / wallet count). */
    secondaryBadgeCount?: number
    /** When true, shows the Coins icon before the secondary label. */
    showSecondaryCoinsIcon?: boolean
    /** When true, shows the count pill on the second tab. */
    showSecondaryBadge?: boolean
  }>(),
  {
    listAriaLabel: 'Sections',
    generalValue: 'general',
    generalLabel: 'General',
    secondaryValue: 'currencies',
    secondaryLabel: 'Currencies',
    secondaryBadgeCount: 0,
    showSecondaryCoinsIcon: true,
    showSecondaryBadge: true,
  },
)
</script>

<style scoped lang="scss">
.ac-tabs__list {
  display: flex;
  flex-shrink: 0;
  gap: 0.25rem;
  border-bottom: 1px solid #d1d5db;
  margin-bottom: 1.25rem;
}

.ac-tabs__trigger {
  position: relative;
  background: none;
  border: none;
  padding: 0.65rem 1rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: #111827;
  }

  &[data-state='active'] {
    color: #2563eb;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background: #2563eb;
      border-radius: 1px;
    }
  }
}

.ac-tabs-all__secondary-label {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.ac-tabs-all__secondary-icon {
  flex-shrink: 0;
  color: #6b7280;
}

.ac-tabs-all__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.35rem;
  font-size: 0.6875rem;
  font-weight: 600;
  color: #2563eb;
  background: #eff6ff;
  border-radius: 999px;
}
</style>
