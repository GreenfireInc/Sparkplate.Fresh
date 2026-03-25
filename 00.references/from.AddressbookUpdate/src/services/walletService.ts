
export interface Wallet {
  id: number;
  contactId: number;
  coinTicker: string;
  address: string;
  keyFingerprint?: string;
  cryptoPublicKey?: string;
  gpgPublicKey?: string;
}

let wallets: Wallet[] = JSON.parse(localStorage.getItem('wallets') || '[]');
let nextId = wallets.length > 0 ? Math.max(...wallets.map(w => w.id)) + 1 : 1;

function saveWallets() {
  localStorage.setItem('wallets', JSON.stringify(wallets));
}

export async function addWallet(wallet: Omit<Wallet, 'id'>) {
  const newWallet: Wallet = { ...wallet, id: nextId++ };
  wallets.push(newWallet);
  saveWallets();
  return newWallet;
}

export async function getWalletsForContact(contactId: number) {
  return wallets.filter(w => w.contactId === contactId);
}

export async function getWalletCountForContact(contactId: number): Promise<number> {
  return wallets.filter(w => w.contactId === contactId).length;
}

export async function updateWallet(updatedWallet: Wallet) {
  const index = wallets.findIndex(w => w.id === updatedWallet.id);
  if (index !== -1) {
    wallets[index] = updatedWallet;
    saveWallets();
  }
}

export async function deleteWallet(id: number) {
  wallets = wallets.filter(w => w.id !== id);
  saveWallets();
}

export async function deleteWalletsForContact(contactId: number) {
    wallets = wallets.filter(w => w.contactId !== contactId);
    saveWallets();
}
