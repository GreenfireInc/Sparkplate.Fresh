export interface Currency {
  name: string;
  abbreviation: string;
  address: string;
}

export interface StandaloneWallet {
  id: number;
  name: string;
  keyFingerprint?: string;
  firstAndLast?: string;
  currencies: Currency[];
}

let standaloneWallets: StandaloneWallet[] = JSON.parse(localStorage.getItem('standaloneWallets') || '[]');
let nextId = standaloneWallets.length > 0 ? Math.max(...standaloneWallets.map(w => w.id)) + 1 : 1;

function saveStandaloneWallets() {
  localStorage.setItem('standaloneWallets', JSON.stringify(standaloneWallets));
}

export async function getStandaloneWallets() {
  return [...standaloneWallets];
}

export async function addStandaloneWallet(wallet: Omit<StandaloneWallet, 'id'>) {
  const newWallet: StandaloneWallet = { ...wallet, id: nextId++ };
  standaloneWallets.push(newWallet);
  saveStandaloneWallets();
  return newWallet;
}

export async function updateStandaloneWallet(updatedWallet: StandaloneWallet) {
  const index = standaloneWallets.findIndex(w => w.id === updatedWallet.id);
  if (index !== -1) {
    standaloneWallets[index] = updatedWallet;
    saveStandaloneWallets();
  }
}

export async function deleteStandaloneWallet(id: number) {
  standaloneWallets = standaloneWallets.filter(w => w.id !== id);
  saveStandaloneWallets();
}

export async function getStandaloneWallet(id: number) {
  return standaloneWallets.find(w => w.id === id) || null;
}



