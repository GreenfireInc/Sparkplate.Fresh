import { ref } from 'vue'

export interface Note {
  id: string
  contactId: number
  title: string
  content: string
  createdAt: string
  modifiedAt: string
  isLocked: boolean
  password?: string
  isPasswordProtected: boolean
  textColor?: string // Optional text color for the note
}

/** Where notes are persisted (separate localStorage keys per kind). */
export type NoteOwnerKind = 'contact' | 'exchange' | 'company' | 'wallet'

// Reactive signal consumers can watch to refresh derived UI (counts, lists, etc.)
export const notesRevision = ref(0)

function getStorageKey(ownerKind: NoteOwnerKind, ownerId: number): string {
  if (ownerKind === 'exchange') return `notes-exchange-${ownerId}`
  if (ownerKind === 'company') return `notes-company-${ownerId}`
  if (ownerKind === 'wallet') return `notes-wallet-${ownerId}`
  return `notes-${ownerId}`
}

function readNotes(ownerKind: NoteOwnerKind, ownerId: number): Note[] {
  return JSON.parse(localStorage.getItem(getStorageKey(ownerKind, ownerId)) || '[]')
}

function writeNotes(ownerKind: NoteOwnerKind, ownerId: number, notes: Note[]) {
  localStorage.setItem(getStorageKey(ownerKind, ownerId), JSON.stringify(notes))
  notesRevision.value++
}

export function isNoteLocked(createdAt: string): boolean {
  const created = new Date(createdAt)
  const now = new Date()

  const endOfCreationDay = new Date(created)
  endOfCreationDay.setHours(23, 59, 59, 999)

  return now > endOfCreationDay
}

export async function getNotesForOwnerId(
  ownerId: number,
  ownerKind: NoteOwnerKind = 'contact',
): Promise<Note[]> {
  return [...readNotes(ownerKind, ownerId)]
}

export async function getNotesForContactId(contactId: number): Promise<Note[]> {
  return getNotesForOwnerId(contactId, 'contact')
}

export async function getNotesForExchangeId(exchangeId: number): Promise<Note[]> {
  return getNotesForOwnerId(exchangeId, 'exchange')
}

export async function getNoteCountForContact(contactId: number): Promise<number> {
  return readNotes('contact', contactId).length
}

export async function getNote(
  ownerId: number,
  noteId: string,
  ownerKind: NoteOwnerKind = 'contact',
): Promise<Note | null> {
  const notes = readNotes(ownerKind, ownerId)
  const note = notes.find((n) => n.id === noteId)
  return note ? { ...note } : null
}

export async function addNote(
  ownerId: number,
  note: Omit<Note, 'id' | 'contactId' | 'createdAt' | 'modifiedAt' | 'isLocked'>,
  ownerKind: NoteOwnerKind = 'contact',
): Promise<Note> {
  const notes = readNotes(ownerKind, ownerId)
  const now = new Date().toISOString()
  const newNote: Note = {
    ...note,
    id: crypto.randomUUID(),
    contactId: ownerId,
    createdAt: now,
    modifiedAt: now,
    isLocked: false,
  }
  const updatedNotes = [newNote, ...notes]
  writeNotes(ownerKind, ownerId, updatedNotes)
  return { ...newNote }
}

export async function updateNote(
  ownerId: number,
  noteId: string,
  updates: Partial<Note>,
  ownerKind: NoteOwnerKind = 'contact',
): Promise<Note | null> {
  const notes = readNotes(ownerKind, ownerId)
  const noteIndex = notes.findIndex((n) => n.id === noteId)

  if (noteIndex === -1) {
    return null
  }

  const existingNote = notes[noteIndex]

  if (isNoteLocked(existingNote.createdAt)) {
    throw new Error('Note is locked and cannot be modified')
  }

  const updatedNote: Note = {
    ...existingNote,
    ...updates,
    modifiedAt: new Date().toISOString(),
    isLocked: isNoteLocked(existingNote.createdAt),
  }

  const updatedNotes = notes.map((note, index) => (index === noteIndex ? updatedNote : note))

  writeNotes(ownerKind, ownerId, updatedNotes)
  return { ...updatedNote }
}

export async function deleteNote(
  ownerId: number,
  noteId: string,
  ownerKind: NoteOwnerKind = 'contact',
): Promise<void> {
  const notes = readNotes(ownerKind, ownerId)
  const updatedNotes = notes.filter((n) => n.id !== noteId)
  writeNotes(ownerKind, ownerId, updatedNotes)
}

export async function deleteAllNotesForContact(contactId: number): Promise<void> {
  localStorage.removeItem(getStorageKey('contact', contactId))
  notesRevision.value++
}

export async function deleteAllNotesForExchange(exchangeId: number): Promise<void> {
  localStorage.removeItem(getStorageKey('exchange', exchangeId))
  notesRevision.value++
}
