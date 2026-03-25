export interface Contact {
  id?: number;
  type: string;
  firstname: string;
  lastname: string;
  company: string;
  email: string;
  notes: string;
  website?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
}

const STORAGE_KEY = 'sparkplate.addressbook.contacts.v1';

let contacts: Contact[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
let nextId = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;

function saveContacts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

export async function getContacts() {
  return [...contacts];
}

export async function addContact(contact: Omit<Contact, 'id'>) {
  const newContact: Contact = { ...contact, id: nextId++ };
  contacts.push(newContact);
  saveContacts();
  return newContact;
}

export async function updateContact(updatedContact: Contact) {
  const index = contacts.findIndex(c => c.id === updatedContact.id);
  if (index !== -1) {
    contacts[index] = updatedContact;
    saveContacts();
  }
}

export async function deleteContact(id: number) {
  contacts = contacts.filter(c => c.id !== id);
  saveContacts();
}

export async function getContact(id: number) {
    return contacts.find(c => c.id === id) || null;
}