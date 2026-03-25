
import { getContacts, deleteContact } from './contactService';
import { getWalletsForContact, getWalletCountForContact, deleteWalletsForContact } from './walletService';
import type { Contact } from './contactService';

export interface Company {
  id: number;
  name: string;
  mainContact: string;
  position: string;
  email: string;
  numCurrencies: number;
  mainCurrencyAddress: string;
}

export async function getCompanies(): Promise<Company[]> {
  const contacts = await getContacts();
  const companyContacts = contacts.filter(c => c.company && c.company.trim() !== '');

  if (companyContacts.length === 0) {
    return [];
  }

  const companyData: { [key: string]: any } = {};

  for (const contact of companyContacts) {
    const companyName = contact.company;
    if (!companyData[companyName]) {
      companyData[companyName] = {
        id: Object.keys(companyData).length + 1,
        name: companyName,
        mainContact: `${contact.firstname} ${contact.lastname}`,
        position: '', // Position data is not available
        email: contact.email,
        numCurrencies: 0,
        mainCurrencyAddress: ''
      };
    }

    if (contact.id) {
        const walletCount = await getWalletCountForContact(contact.id);
        companyData[companyName].numCurrencies += walletCount;

        if (walletCount > 0 && !companyData[companyName].mainCurrencyAddress) {
          const wallets = await getWalletsForContact(contact.id);
          if (wallets.length > 0) {
            companyData[companyName].mainCurrencyAddress = wallets[0].address;
          }
        }
    }
  }

  return Object.values(companyData);
}

export async function deleteCompany(companyId: number): Promise<void> {
    const companies = await getCompanies();
    const company = companies.find(c => c.id === companyId);

    if(company) {
        const allContacts = await getContacts();
        const contactsToDelete = allContacts.filter(c => c.company === company.name);

        for (const contact of contactsToDelete) {
            if (contact.id) {
                await deleteWalletsForContact(contact.id);
                await deleteContact(contact.id);
            }
        }
    }
}
