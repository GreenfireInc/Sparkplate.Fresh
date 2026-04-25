/**
 * Wallets shown on the Address Book "Wallets" tab (external / standalone entries),
 * distinct from per-contact rows in `service.addressBook.Wallet`.
 */
export interface StandaloneWalletRecord {
  id: number
  name: string
  currencies: { name: string; abbreviation: string; address: string }[]
  mnemonicWordCount?: number
  mnemonicFirst?: string
  mnemonicLast?: string
  notes?: string
  passwordHint?: string
}

const STORAGE_KEY = 'sparkplate.addressbook.standaloneWallets.v1'

let records: StandaloneWalletRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
let nextId = records.length > 0 ? Math.max(...records.map((w) => w.id)) + 1 : 1

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}

export async function getStandaloneWallets(): Promise<StandaloneWalletRecord[]> {
  return records.map((w) => ({
    ...w,
    currencies: w.currencies.map((c) => ({ ...c })),
  }))
}

export async function addStandaloneWallet(
  data: Omit<StandaloneWalletRecord, 'id'>,
): Promise<StandaloneWalletRecord> {
  const row: StandaloneWalletRecord = {
    ...data,
    currencies: data.currencies.map((c) => ({ ...c })),
    id: nextId++,
  }
  records.push(row)
  persist()
  return row
}

export async function updateStandaloneWallet(updated: StandaloneWalletRecord): Promise<void> {
  const i = records.findIndex((w) => w.id === updated.id)
  if (i !== -1) {
    records[i] = {
      ...updated,
      currencies: updated.currencies.map((c) => ({ ...c })),
    }
    persist()
  }
}

export async function deleteStandaloneWallet(id: number): Promise<void> {
  records = records.filter((w) => w.id !== id)
  persist()
}
