<template>
  <div class="hardware-settings">

    <h4 class="text-sm font-semibold text-gray-700 mb-3">Hardware overview</h4>
    <div class="rounded-lg border border-gray-200 overflow-hidden">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-50 border-b border-gray-200">
            <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
              Component
            </th>
            <th class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            class="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="py-3 px-4 text-sm text-gray-900"
            >
              <FlexRender :render="cell.column.columnDef.cell!" :props="cell.getContext()" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import {
  useVueTable,
  getCoreRowModel,
  createColumnHelper,
  type ColumnDef,
  FlexRender,
} from '@tanstack/vue-table'
import { Separator } from 'radix-vue'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useUsbDrives } from '@/components/partials/hardware/usb'

type HardwareRow = {
  id: string
  category: string
  value: string
  icon: string
}

const columnHelper = createColumnHelper<HardwareRow>()

function formatBytes(bytes: number, decimals = 0): string {
  if (!+bytes) return '0 Bytes'
  const kb = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(kb))
  return `${parseFloat((bytes / Math.pow(kb, i)).toFixed(dm))} ${sizes[i]}`
}

const { usbDisplayValue } = useUsbDrives()

const processorValue = computed(() => window.appData?.processor ?? '—')
const memorySizeValue = computed(() =>
  window.appData?.systemMemory ? formatBytes(window.appData.systemMemory) : '—'
)

const hardwareData = computed<HardwareRow[]>(() => [
  { id: 'cpu', category: 'CPU', value: processorValue.value, icon: 'cpu' },
  { id: 'gpu', category: 'GPU', value: '—', icon: 'gpu-card' },
  { id: 'ram', category: 'RAM', value: memorySizeValue.value, icon: 'memory' },
  { id: 'usb', category: 'USB', value: usbDisplayValue.value, icon: 'usb-symbol' },
  { id: 'network', category: 'Network', value: '—', icon: 'pci-card-network' },
])

const columns = computed<ColumnDef<HardwareRow, unknown>[]>(() => [
  columnHelper.accessor('category', {
    header: 'Component',
    cell: (info) => {
      const row = info.row.original
      const icon = row.icon
      const iconEl =
        typeof icon === 'string'
          ? h('i', { class: `bi bi-${icon} h-4 w-4 text-gray-500 shrink-0` })
          : h(icon, { class: 'h-4 w-4 text-gray-500 shrink-0' })
      return h('div', { class: 'flex items-center gap-2' }, [iconEl, h('span', row.category)])
    },
  }),
  columnHelper.accessor('value', {
    header: 'Value',
    cell: (info) => h('span', { class: 'text-gray-600' }, info.getValue() as string),
  }),
])

const table = useVueTable({
  get data() {
    return hardwareData.value
  },
  get columns() {
    return columns.value
  },
  getCoreRowModel: getCoreRowModel(),
})
</script>
