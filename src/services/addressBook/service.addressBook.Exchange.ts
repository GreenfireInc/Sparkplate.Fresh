export interface ExchangeRecord {
  id: number
  name: string
  url: string
  referralUrl: string
  referralCode: string
  currencies: { name: string; abbreviation: string; address: string }[]
  email: string
  notes: string
}

const STORAGE_KEY = 'sparkplate.addressbook.exchanges.v1'

let exchanges: ExchangeRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
let nextId = exchanges.length > 0 ? Math.max(...exchanges.map((e) => e.id)) + 1 : 1

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(exchanges))
}

export async function getExchanges(): Promise<ExchangeRecord[]> {
  return [...exchanges]
}

export async function addExchange(data: Omit<ExchangeRecord, 'id'>): Promise<ExchangeRecord> {
  const row: ExchangeRecord = {
    ...data,
    currencies: data.currencies.map((c) => ({ ...c })),
    id: nextId++,
  }
  exchanges.push(row)
  persist()
  return row
}

export async function updateExchange(updated: ExchangeRecord): Promise<void> {
  const i = exchanges.findIndex((e) => e.id === updated.id)
  if (i !== -1) {
    exchanges[i] = {
      ...updated,
      currencies: updated.currencies.map((c) => ({ ...c })),
    }
    persist()
  }
}

export async function deleteExchange(id: number): Promise<void> {
  exchanges = exchanges.filter((e) => e.id !== id)
  persist()
}
