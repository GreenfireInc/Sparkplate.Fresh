<template>
  <div class="notes-tab">
    <div class="notes-header">
      <div class="notes-header-left">
        <h3>Notes</h3>
        <div class="search-wrapper">
          <Search :size="16" class="search-icon" />
          <input
            type="text"
            class="search-input"
            placeholder="Search notes..."
            v-model="searchQuery"
          />
        </div>
      </div>
      <button class="new-note-button" @click="handleNewNote" title="New Note">
        <Plus :size="18" />
        New Note
      </button>
    </div>
    
    <div v-if="notes.length === 0" class="empty-state">
      <FileText :size="48" class="empty-icon" />
      <p>No notes found for this contact.</p>
      <p class="empty-hint">Click "New Note" to create your first note.</p>
    </div>
    
    <div v-else class="notes-list">
      <div 
        v-for="note in filteredNotes" 
        :key="note.id" 
        class="note-item"
        :class="{ selected: selectedNote?.id === note.id }"
        @click="selectNote(note)"
      >
        <div class="note-item-header">
          <h4 class="note-title">{{ note.title || 'Untitled Note' }}</h4>
          <div class="note-actions">
            <Lock v-if="isNoteLocked(note.createdAt)" :size="16" class="lock-icon" title="Locked" />
            <button 
              v-else
              class="delete-note-button" 
              @click.stop="handleDeleteNote(note)"
              title="Delete note"
            >
              <Trash2 :size="14" />
            </button>
          </div>
        </div>
        <p class="note-preview">{{ getNotePreview(note.content) }}</p>
        <div class="note-meta">
          <span class="note-date">{{ formatDate(note.createdAt) }}</span>
        </div>
      </div>
    </div>
    
    <NoteEditorModal
      :show="showNoteEditor"
      :note="selectedNote"
      :contactId="contactId"
      :contactName="contactName"
      @close="showNoteEditor = false"
      @note-updated="handleNoteUpdated"
      @note-deleted="handleNoteDeleted"
    />
    
    <NoteDeleteConfirmModal
      :show="showDeleteConfirm"
      :note="noteToDelete"
      @close="showDeleteConfirm = false"
      @confirm="handleDeleteConfirmed"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { Plus, FileText, Lock, Trash2, Search } from 'lucide-vue-next';
import { 
  getNotesForContactId, 
  addNote, 
  deleteNote, 
  isNoteLocked,
  notesRevision,
  type Note 
} from '../../../services/noteService';
import NoteEditorModal from '../../modals/entryDetails/contacts/NoteEditorModal.vue';
import NoteDeleteConfirmModal from '../../modals/confirmations/NoteDeleteConfirmModal.vue';

const props = defineProps<{
  contactId: number | null;
  contactName?: string; // For export filename
}>();

const notes = ref<Note[]>([]);
const selectedNote = ref<Note | null>(null);
const searchQuery = ref('');
const showNoteEditor = ref(false);
const showDeleteConfirm = ref(false);
const noteToDelete = ref<Note | null>(null);

const filteredNotes = computed(() => {
  if (!searchQuery.value) {
    return notes.value;
  }
  const query = searchQuery.value.toLowerCase();
  return notes.value.filter(note => 
    note.title.toLowerCase().includes(query) ||
    note.content.toLowerCase().includes(query)
  );
});

const loadNotes = async () => {
  if (props.contactId) {
    const loadedNotes = await getNotesForContactId(props.contactId);
    // Create new array to maintain immutability
    notes.value = [...loadedNotes];
  } else {
    notes.value = [];
  }
};

onMounted(() => {
  loadNotes();
});

watch(() => props.contactId, () => {
  loadNotes();
}, { immediate: true });

// Watch notesRevision to refresh when notes change globally
watch(notesRevision, () => {
  if (props.contactId) {
    loadNotes();
  }
});

const selectNote = (note: Note) => {
  // Create new object reference to maintain immutability
  selectedNote.value = { ...note };
  showNoteEditor.value = true;
};

const handleNewNote = async () => {
  if (!props.contactId) return;
  
  try {
    const newNote = await addNote(props.contactId, {
      title: '',
      content: '',
      isLocked: false,
      isPasswordProtected: false,
    });
    
    // Create new array with new note at the beginning (immutability)
    await loadNotes();
    selectedNote.value = { ...newNote };
    showNoteEditor.value = true;
  } catch (error) {
    console.error('Error creating note:', error);
    alert('Failed to create note. Please try again.');
  }
};

const handleNoteUpdated = async () => {
  await loadNotes();
  // Update selected note if it's still the same one
  if (selectedNote.value) {
    const updated = notes.value.find(n => n.id === selectedNote.value!.id);
    if (updated) {
      selectedNote.value = { ...updated };
    }
  }
};

const handleNoteDeleted = async () => {
  await loadNotes();
  selectedNote.value = null;
  showNoteEditor.value = false;
};

const handleDeleteNote = (note: Note) => {
  if (!props.contactId) return;
  
  if (isNoteLocked(note.createdAt)) {
    alert('This note is locked and cannot be deleted.');
    return;
  }
  
  noteToDelete.value = note;
  showDeleteConfirm.value = true;
};

const handleDeleteConfirmed = async () => {
  if (!props.contactId || !noteToDelete.value) return;
  
  try {
    await deleteNote(props.contactId, noteToDelete.value.id);
    // Reload notes to get updated list (immutability)
    await loadNotes();
    
    if (selectedNote.value?.id === noteToDelete.value.id) {
      selectedNote.value = null;
    }
  } catch (error) {
    console.error('Error deleting note:', error);
    alert('Failed to delete note. Please try again.');
  } finally {
    showDeleteConfirm.value = false;
    noteToDelete.value = null;
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const getNotePreview = (content: string): string => {
  if (!content) return 'No content';
  // Strip HTML tags for preview
  const text = content.replace(/<[^>]*>/g, '');
  return text.length > 100 ? text.substring(0, 100) + '...' : text;
};

// Expose a method to refresh notes and the count from parent
defineExpose({
  refresh: loadNotes,
  get count() {
    return notes.value.length;
  }
});
</script>

<style scoped>
.notes-tab {
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0; /* Allow flex shrinking */
  flex: 1;
}

.notes-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.notes-header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.notes-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  white-space: nowrap;
}

.search-wrapper {
  position: relative;
  flex: 1;
  max-width: 300px;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.5rem 0.75rem 0.5rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #fff;
  font-size: 0.875rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

.search-input::placeholder {
  color: #9ca3af;
}

.new-note-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #f97316;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.new-note-button:hover {
  background-color: #ea580c;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.empty-icon {
  margin-bottom: 1rem;
  opacity: 0.4;
}

.empty-state p {
  margin: 0.5rem 0;
}

.empty-hint {
  font-size: 0.875rem;
  color: #9ca3af;
}

.notes-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  overflow-y: auto;
  flex: 1;
  min-height: 0; /* Allow flex shrinking for proper scroll */
}

.note-item {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.2s;
}

.note-item:hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.note-item.selected {
  background-color: #fef3c7;
  border-color: #f97316;
  box-shadow: 0 2px 4px rgba(249, 115, 22, 0.2);
}

.note-item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.note-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  flex: 1;
}

.note-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.lock-icon {
  color: #ef4444;
  flex-shrink: 0;
}

.delete-note-button {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
}

.delete-note-button:hover {
  background-color: #fee2e2;
}

.note-preview {
  margin: 0.5rem 0;
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.note-meta {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.note-date {
  font-size: 0.75rem;
  color: #9ca3af;
}
</style>
