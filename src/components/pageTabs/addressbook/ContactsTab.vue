<template>
  <TabsContent value="Contacts" class="ab-page__tab-panel">
    <div class="ab-table-wrapper">
    <table class="ab-table">
      <thead>
        <tr>
          <th class="ab-table__th ab-table__th--checkbox" scope="col">
            <input
              type="checkbox"
              class="ab-table__checkbox"
              :checked="isCurrentPageSelected"
              :disabled="paginatedContacts.length === 0"
              aria-label="Select all contacts on this page"
              @change="emit('select-all', $event)"
            />
          </th>
          <th
            scope="col"
            class="ab-table__th ab-table__th--sortable"
            :class="{ 'ab-table__th--sorted': sortKey === 'id' }"
            @click="emit('sort', 'id')"
          >
            ID
            <span v-if="sortKey === 'id'" class="ab-table__sort-arrow" aria-hidden="true">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
          </th>
          <th
            scope="col"
            class="ab-table__th ab-table__th--sortable"
            :class="{ 'ab-table__th--sorted': sortKey === 'firstname' }"
            @click="emit('sort', 'firstname')"
          >
            First name
            <span v-if="sortKey === 'firstname'" class="ab-table__sort-arrow" aria-hidden="true">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
          </th>
          <th
            scope="col"
            class="ab-table__th ab-table__th--sortable"
            :class="{ 'ab-table__th--sorted': sortKey === 'lastname' }"
            @click="emit('sort', 'lastname')"
          >
            Last name
            <span v-if="sortKey === 'lastname'" class="ab-table__sort-arrow" aria-hidden="true">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
          </th>
          <th
            scope="col"
            class="ab-table__th ab-table__th--sortable"
            :class="{ 'ab-table__th--sorted': sortKey === 'company' }"
            @click="emit('sort', 'company')"
          >
            Company
            <span v-if="sortKey === 'company'" class="ab-table__sort-arrow" aria-hidden="true">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
          </th>
          <th
            scope="col"
            class="ab-table__th ab-table__th--sortable"
            :class="{ 'ab-table__th--sorted': sortKey === 'email' }"
            @click="emit('sort', 'email')"
          >
            Email
            <span v-if="sortKey === 'email'" class="ab-table__sort-arrow" aria-hidden="true">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
          </th>
          <th
            scope="col"
            class="ab-table__th ab-table__th--sortable"
            :class="{ 'ab-table__th--sorted': sortKey === 'wallets' }"
            @click="emit('sort', 'wallets')"
          >
            Wallets
            <span v-if="sortKey === 'wallets'" class="ab-table__sort-arrow" aria-hidden="true">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span>
          </th>
          <th class="ab-table__th ab-table__th--actions" scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="paginatedContacts.length === 0">
          <td colspan="8" class="ab-table__empty">
            No contacts found.
          </td>
        </tr>
        <tr
          v-for="contact in paginatedContacts"
          :key="contact.id"
          class="ab-table__row"
          @click="emit('open-contact', contact)"
        >
          <td class="ab-table__td ab-table__td--checkbox">
            <input
              v-model="selectedContactsProxy"
              type="checkbox"
              class="ab-table__checkbox"
              :value="contact.id"
              :aria-label="`Select ${contact.firstname} ${contact.lastname}`"
              @click.stop
            />
          </td>
          <td class="ab-table__td">{{ contact.id }}</td>
          <td class="ab-table__td">{{ contact.firstname }}</td>
          <td class="ab-table__td">{{ contact.lastname }}</td>
          <td class="ab-table__td">{{ contact.company }}</td>
          <td class="ab-table__td">{{ contact.email }}</td>
          <td class="ab-table__td">{{ contact.wallets }}</td>
          <td class="ab-table__td ab-table__td--actions" @click.stop>
            <ActionsDropdown
              :contact="contact"
              @add-currency-request="emit('add-currency-request', contact)"
              @generate-qrcode-png="emit('generate-qrcode-png', $event)"
              @generate-qrcode-svg="emit('generate-qrcode-svg', $event)"
              @export-csv="emit('export-csv', $event)"
              @export-vcf="emit('export-vcf', $event)"
            />
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </TabsContent>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TabsContent } from 'radix-vue'
import type { Contact } from '@/services/addressBook/contactService'
import ActionsDropdown from '@/components/dropdown/dropdown.actions.vue'

defineOptions({ name: 'ContactsTab' })

export interface ContactTableRow extends Contact {
  wallets: number
}

const props = defineProps<{
  paginatedContacts: ContactTableRow[]
  isCurrentPageSelected: boolean
  sortKey: keyof ContactTableRow
  sortOrder: 'asc' | 'dsc'
  selectedContacts: number[]
}>()

const emit = defineEmits<{
  'update:selectedContacts': [value: number[]]
  sort: [key: keyof ContactTableRow]
  'select-all': [event: Event]
  'open-contact': [contact: ContactTableRow]
  'add-currency-request': [contact: ContactTableRow]
  'generate-qrcode-png': [contact: Contact]
  'generate-qrcode-svg': [contact: Contact]
  'export-csv': [contact: Contact]
  'export-vcf': [contact: Contact]
}>()

const selectedContactsProxy = computed({
  get: () => props.selectedContacts,
  set: (value: number[]) => emit('update:selectedContacts', value),
})
</script>

<style lang="scss" scoped>
.ab-table {
  width: 100%;
  border-collapse: collapse;
}

.ab-table__th {
  padding: 0.35rem 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: #4b5563;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  white-space: nowrap;
  border-bottom: 1px solid #e5e7eb;
  background: #f3f4f6;
  position: sticky;
  top: 0;
  z-index: 2;
}

.ab-table__th--sortable {
  cursor: pointer;
  user-select: none;

  &:hover {
    background: #e5e7eb;
  }
}

.ab-table__th--sorted {
  color: #2563eb;
}

.ab-table__sort-arrow {
  margin-left: 0.25rem;
  font-size: 0.625rem;
}

.ab-table__th--checkbox {
  width: 4%;
}

.ab-table__th--actions {
  width: 15%;
}

.ab-table__row {
  cursor: pointer;
  transition: background 0.1s;

  &:hover {
    background: #f9fafb;
  }
}

.ab-table__td {
  padding: 0.3rem 1rem;
  text-align: left;
  white-space: nowrap;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
  font-size: 0.875rem;
}

.ab-table__td--checkbox {
  width: 4%;
}

.ab-table__td--actions {
  width: 15%;
}

.ab-table__checkbox {
  cursor: pointer;
}

.ab-table__empty {
  text-align: center;
  padding: 5rem 1rem;
  color: #6b7280;
  font-size: 0.9375rem;
}

.ab-page__tab-panel {
  outline: none;
}

.ab-table-wrapper {
  width: 100%;
  /* overflow-x lives on the parent .ab-scroll-area so sticky thead is not trapped */
}
</style>
