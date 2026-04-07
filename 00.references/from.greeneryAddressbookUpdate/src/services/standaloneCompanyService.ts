import { type Currency } from './exchangeService';

export interface StandaloneCompany {
  id: number;
  name: string;
  email: string;
  contact: string;
  contactEmail: string;
  contactPosition?: string;
  currencies: Currency[];
}

let standaloneCompanies: StandaloneCompany[] = JSON.parse(localStorage.getItem('standaloneCompanies') || '[]');
let nextId = standaloneCompanies.length > 0 ? Math.max(...standaloneCompanies.map(c => c.id)) + 1 : 1;

function saveStandaloneCompanies() {
  localStorage.setItem('standaloneCompanies', JSON.stringify(standaloneCompanies));
}

export async function getStandaloneCompanies() {
  return [...standaloneCompanies];
}

export async function addStandaloneCompany(company: Omit<StandaloneCompany, 'id'>) {
  const newCompany: StandaloneCompany = { ...company, id: nextId++ };
  standaloneCompanies.push(newCompany);
  saveStandaloneCompanies();
  return newCompany;
}

export async function updateStandaloneCompany(updatedCompany: StandaloneCompany) {
  const index = standaloneCompanies.findIndex(c => c.id === updatedCompany.id);
  if (index !== -1) {
    standaloneCompanies[index] = updatedCompany;
    saveStandaloneCompanies();
  }
}

export async function deleteStandaloneCompany(id: number) {
  standaloneCompanies = standaloneCompanies.filter(c => c.id !== id);
  saveStandaloneCompanies();
}

export async function getStandaloneCompany(id: number) {
  return standaloneCompanies.find(c => c.id === id) || null;
}



