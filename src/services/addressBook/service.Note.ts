import { ref } from 'vue';

export interface Note {
  id: string;
  contactId: number;
  title: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
  isLocked: boolean;
  password?: string;
  isPasswordProtected: boolean;
  textColor?: string; // Optional text color for the note
}

// Reactive signal consumers can watch to refresh derived UI (counts, lists, etc.)
export const notesRevision = ref(0);

function getStorageKey(contactId: number): string {
  return `notes-${contactId}`;
}

function getNotesForContact(contactId: number): Note[] {
  const storageKey = getStorageKey(contactId);
  return JSON.parse(localStorage.getItem(storageKey) || '[]');
}

function saveNotes(contactId: number, notes: Note[]) {
  const storageKey = getStorageKey(contactId);
  localStorage.setItem(storageKey, JSON.stringify(notes));
  notesRevision.value++;
}

export function isNoteLocked(createdAt: string): boolean {
  const created = new Date(createdAt);
  const now = new Date();
  
  // Check if it's past 23:59 of the creation day
  const endOfCreationDay = new Date(created);
  endOfCreationDay.setHours(23, 59, 59, 999);
  
  return now > endOfCreationDay;
}

export async function getNotesForContactId(contactId: number): Promise<Note[]> {
  return [...getNotesForContact(contactId)];
}

export async function getNoteCountForContact(contactId: number): Promise<number> {
  return getNotesForContact(contactId).length;
}

export async function getNote(contactId: number, noteId: string): Promise<Note | null> {
  const notes = getNotesForContact(contactId);
  const note = notes.find(n => n.id === noteId);
  return note ? { ...note } : null;
}

export async function addNote(contactId: number, note: Omit<Note, 'id' | 'contactId' | 'createdAt' | 'modifiedAt' | 'isLocked'>): Promise<Note> {
  const notes = getNotesForContact(contactId);
  const now = new Date().toISOString();
  const newNote: Note = {
    ...note,
    id: crypto.randomUUID(),
    contactId,
    createdAt: now,
    modifiedAt: now,
    isLocked: false,
  };
  const updatedNotes = [newNote, ...notes];
  saveNotes(contactId, updatedNotes);
  return { ...newNote };
}

export async function updateNote(contactId: number, noteId: string, updates: Partial<Note>): Promise<Note | null> {
  const notes = getNotesForContact(contactId);
  const noteIndex = notes.findIndex(n => n.id === noteId);
  
  if (noteIndex === -1) {
    return null;
  }
  
  const existingNote = notes[noteIndex];
  
  // Check if note is locked - if so, don't allow updates
  if (isNoteLocked(existingNote.createdAt)) {
    throw new Error('Note is locked and cannot be modified');
  }
  
  const updatedNote: Note = {
    ...existingNote,
    ...updates,
    modifiedAt: new Date().toISOString(),
    isLocked: isNoteLocked(existingNote.createdAt), // Recalculate lock status
  };
  
  const updatedNotes = notes.map((note, index) =>
    index === noteIndex ? updatedNote : note
  );
  
  saveNotes(contactId, updatedNotes);
  return { ...updatedNote };
}

export async function deleteNote(contactId: number, noteId: string): Promise<void> {
  const notes = getNotesForContact(contactId);
  const updatedNotes = notes.filter(n => n.id !== noteId);
  saveNotes(contactId, updatedNotes);
}

export async function deleteAllNotesForContact(contactId: number): Promise<void> {
  const storageKey = getStorageKey(contactId);
  localStorage.removeItem(storageKey);
  notesRevision.value++;
}

