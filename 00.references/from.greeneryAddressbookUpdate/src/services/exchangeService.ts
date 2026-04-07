export interface Currency {
  name: string;
  abbreviation: string;
  address: string;
}

export interface Exchange {
  id: number;
  name: string;
  url: string;
  referralUrl: string;
  referralCode: string;
  currencies: Currency[];
  email: string;
}

let exchanges: Exchange[] = JSON.parse(localStorage.getItem('exchanges') || '[]');
let nextId = exchanges.length > 0 ? Math.max(...exchanges.map(e => e.id)) + 1 : 1;

function saveExchanges() {
  localStorage.setItem('exchanges', JSON.stringify(exchanges));
}

export async function getExchanges() {
  return [...exchanges];
}

export async function addExchange(exchange: Omit<Exchange, 'id'>) {
  const newExchange: Exchange = { ...exchange, id: nextId++ };
  exchanges.push(newExchange);
  saveExchanges();
  return newExchange;
}

export async function updateExchange(updatedExchange: Exchange) {
  const index = exchanges.findIndex(e => e.id === updatedExchange.id);
  if (index !== -1) {
    exchanges[index] = updatedExchange;
    saveExchanges();
  }
}

export async function deleteExchange(id: number) {
  exchanges = exchanges.filter(e => e.id !== id);
  saveExchanges();
}

export async function getExchange(id: number) {
  return exchanges.find(e => e.id === id) || null;
}



