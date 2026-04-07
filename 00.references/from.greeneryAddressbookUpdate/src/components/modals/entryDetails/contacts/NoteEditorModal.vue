<template>
  <div v-if="show" class="modal-overlay" @click.self="handleClose">
    <div class="modal-content" @click="closeExportMenu">
      <div class="modal-header">
        <div class="header-left">
          <Clock :size="16" class="header-icon" />
          <span class="created-date">
            Created: {{ formatDateTime(note?.createdAt || '') }}
          </span>
        </div>
        <div class="header-right">
          <!-- Export Dropdown -->
          <div class="export-dropdown" v-if="note">
            <button 
              class="export-button"
              @click="toggleExportMenu"
              title="Export note"
            >
              <Download :size="16" />
              Export
            </button>
            <div v-if="showExportMenu" class="export-menu">
              <button @click="exportAsMarkdown" class="export-menu-item">
                <FileText :size="14" />
                Markdown (.md)
              </button>
              <button @click="exportAsJson" class="export-menu-item">
                <FileJson :size="14" />
                JSON (.json)
              </button>
            </div>
          </div>
          
          <div v-if="isLocked" class="locked-badge">
            <Lock :size="14" />
            <span>Locked</span>
          </div>
          <button 
            v-else
            class="save-button"
            @click="handleSave"
            title="Save note"
          >
            <Save :size="16" />
            Save
          </button>
          <button 
            class="delete-button"
            @click="handleDelete"
            title="Delete note"
          >
            <Trash2 :size="16" />
            Delete
          </button>
          <button class="close-button" @click="handleClose" title="Close">
            <X :size="20" />
          </button>
        </div>
      </div>
      
      <div v-if="!isLocked && note" class="lock-warning">
        <p>This note will be locked at {{ getLockTime() }}</p>
      </div>

      <!-- Unmirror toolbar for locked notes -->
      <div v-if="isLocked && note" class="mirror-toolbar">
        <button 
          class="toolbar-button toolbar-button-unmirror"
          :class="{ active: !isMirrored }"
          @click="toggleMirror"
          :title="isMirrored ? 'Unmirror text (click to read)' : 'Mirror text (for privacy)'"
        >
          <span class="toolbar-icon">↺</span>
        </button>
        <span v-if="isMirrored" class="mirror-hint">Text is mirrored - click ↺ to read</span>
        <span v-else class="mirror-hint mirror-hint-edit">Reading mode - text displayed unmirrored</span>
      </div>

      <!-- Formatting Toolbar -->
      <div v-if="!isLocked && note" class="formatting-toolbar">
        <button 
          class="toolbar-button"
          @click="handleFormat('bold')"
          title="Bold"
        >
          <span class="toolbar-icon"><b>B</b></span>
        </button>
        <button 
          class="toolbar-button"
          @click="handleFormat('italic')"
          title="Italic"
        >
          <span class="toolbar-icon"><i>I</i></span>
        </button>
        <button 
          class="toolbar-button"
          @click="handleFormat('underline')"
          title="Underline"
        >
          <span class="toolbar-icon"><u>U</u></span>
        </button>
        
        <div class="toolbar-separator"></div>
        
        <select 
          class="toolbar-select"
          @change="handleFormat('fontSize', ($event.target as HTMLSelectElement).value)"
        >
          <option value="">Font size</option>
          <option value="2">Small</option>
          <option value="3">Normal</option>
          <option value="5">Large</option>
          <option value="7">Extra Large</option>
        </select>
        
        <select 
          class="toolbar-select toolbar-select-color"
          v-model="textColor"
          @change="applyTextColor"
        >
          <option value="">Text color</option>
          <option value="#000000" style="color: #000000;">● Black</option>
          <option value="#6B7280" style="color: #6B7280;">● Gray</option>
          <option value="#DC2626" style="color: #DC2626;">● Red</option>
          <option value="#EA580C" style="color: #EA580C;">● Orange</option>
          <option value="#D97706" style="color: #D97706;">● Amber</option>
          <option value="#16A34A" style="color: #16A34A;">● Green</option>
          <option value="#2563EB" style="color: #2563EB;">● Blue</option>
          <option value="#9333EA" style="color: #9333EA;">● Purple</option>
        </select>
        
        <div class="toolbar-separator"></div>
        
        <button 
          class="toolbar-button"
          @click="handleFormat('justifyLeft')"
          title="Align Left"
        >
          <span class="toolbar-icon">⫷</span>
        </button>
        <button 
          class="toolbar-button"
          @click="handleFormat('justifyCenter')"
          title="Align Center"
        >
          <span class="toolbar-icon">☰</span>
        </button>
        <button 
          class="toolbar-button"
          @click="handleFormat('justifyRight')"
          title="Align Right"
        >
          <span class="toolbar-icon">⫸</span>
        </button>
        
        <div class="toolbar-separator"></div>
        
        <button 
          class="toolbar-button toolbar-button-unmirror"
          :class="{ active: !isMirrored }"
          @click="toggleMirror"
          :title="isMirrored ? 'Unmirror text (click to read)' : 'Mirror text (for privacy)'"
        >
          <span class="toolbar-icon">↺</span>
        </button>
        <span v-if="isMirrored" class="mirror-hint">Text is mirrored - click ↺ to read</span>
        <span v-else class="mirror-hint mirror-hint-edit">Editing mode - text will be mirrored on close</span>
      </div>

      <!-- Content -->
      <div class="modal-body" dir="ltr">
        <input
          v-if="note"
          v-model="noteTitle"
          type="text"
          class="note-title-input"
          placeholder="Note title"
          :disabled="isLocked"
          dir="ltr"
          @input="handleTitleChange"
        />
        <div v-if="note" class="content-wrapper">
          <textarea
            ref="contentRef"
            v-model="noteContent"
            class="note-content-editor"
            :class="{ locked: isLocked }"
            :style="{ color: textColor || '#111827' }"
            :disabled="isLocked"
            placeholder="Start writing..."
            @input="handleContentChange"
          ></textarea>
        </div>
      </div>
    </div>
    
    <NoteDeleteConfirmModal
      :show="showDeleteConfirm"
      :note="note"
      @close="showDeleteConfirm = false"
      @confirm="handleDeleteConfirmed"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Clock, Lock, Save, Trash2, X, Download, FileText, FileJson } from 'lucide-vue-next';
import { isNoteLocked, updateNote, type Note } from '../../../../services/noteService';
import { reverseText, getInitialMirrorState } from '../../../../lib/cores/displayStandard/mirrorText';
import { exportNoteAsMarkdown, exportNoteAsJson } from '../../../../lib/cores/exportStandard/filenameStructureAndContent.Contact.notes';
import NoteDeleteConfirmModal from '../../confirmations/NoteDeleteConfirmModal.vue';

const props = defineProps<{
  show: boolean;
  note: Note | null;
  contactId: number | null;
  contactName?: string; // Contact name for export filename
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'note-updated'): void;
  (e: 'note-deleted'): void;
}>();

const contentRef = ref<HTMLTextAreaElement | null>(null);
const noteTitle = ref('');
const noteContent = ref('');
const isMirrored = ref(true); // Text starts mirrored for privacy
const showExportMenu = ref(false); // Export dropdown visibility
const isActivelyEditing = ref(false); // Track if user is currently editing
const textColor = ref(''); // Track selected text color
const showDeleteConfirm = ref(false); // Delete confirmation modal visibility

const isLocked = computed(() => {
  if (!props.note) return false;
  return isNoteLocked(props.note.createdAt);
});

// Toggle between mirrored and readable text
// Works even for locked notes (view-only toggle, no save)
const toggleMirror = () => {
  // Reverse the current content using imported utility
  noteContent.value = reverseText(noteContent.value);
  isMirrored.value = !isMirrored.value;
};

// Only update content/state when modal opens, not during editing
watch(() => props.show, (newVal, oldVal) => {
  if (newVal && !oldVal && props.note) {
    // Modal just opened - initialize state
    noteTitle.value = props.note.title || '';
    noteContent.value = props.note.content || '';
    // Existing notes with content are stored mirrored, new notes are not
    isMirrored.value = getInitialMirrorState(props.note.content);
    isActivelyEditing.value = false;
    textColor.value = props.note.textColor || ''; // Load saved text color
  } else if (!newVal && oldVal) {
    // Modal just closed - reset editing flag
    isActivelyEditing.value = false;
  }
});

// Handle note changes only when not actively editing
watch(() => props.note, (newNote) => {
  if (!props.show || isActivelyEditing.value) {
    // Don't update if modal is closed or user is editing
    return;
  }
  if (newNote) {
    noteTitle.value = newNote.title;
    noteContent.value = newNote.content || '';
    isMirrored.value = getInitialMirrorState(newNote.content);
    textColor.value = newNote.textColor || ''; // Load saved text color
  } else {
    noteTitle.value = '';
    noteContent.value = '';
    isMirrored.value = false;
    textColor.value = '';
  }
}, { immediate: true });

const handleFormat = (command: string, value?: string) => {
  // Note: Formatting is limited with textarea - these are placeholder actions
  // For full rich text support, consider using a library like TipTap or Quill
  console.log('Format command:', command, value);
};

const applyTextColor = () => {
  if (!props.note || isLocked.value) return;
  isActivelyEditing.value = true;
  // Save the text color to the note
  handleUpdateNote({ textColor: textColor.value || undefined });
};

const handleTitleChange = () => {
  if (!props.note || isLocked.value) return;
  isActivelyEditing.value = true; // Mark as editing
  handleUpdateNote({ title: noteTitle.value });
};

const handleContentChange = () => {
  if (!props.note || isLocked.value) return;
  isActivelyEditing.value = true; // Mark as editing
  
  // Save text as-is during editing - mirroring happens on close
  handleUpdateNote({ content: noteContent.value });
};

const handleUpdateNote = async (updates: Partial<Note>) => {
  if (!props.note || !props.contactId || isLocked.value) return;
  
  try {
    await updateNote(props.contactId, props.note.id, updates);
    emit('note-updated');
  } catch (error) {
    console.error('Error updating note:', error);
    if (error instanceof Error && error.message.includes('locked')) {
      alert('This note is locked and cannot be modified.');
    }
  }
};

const handleSave = () => {
  if (!props.note || isLocked.value) return;
  // Save is handled automatically on input, but we can show a confirmation
  alert('Note saved successfully!');
};

// Export functions
const toggleExportMenu = (event: Event) => {
  event.stopPropagation();
  showExportMenu.value = !showExportMenu.value;
};

const closeExportMenu = () => {
  showExportMenu.value = false;
};

const exportAsMarkdown = async () => {
  if (!props.note) return;
  
  await exportNoteAsMarkdown({
    note: { ...props.note, title: noteTitle.value, content: noteContent.value },
    contactName: props.contactName || 'unknown',
    isMirrored: isMirrored.value,
    textColor: textColor.value,
  });
  
  showExportMenu.value = false;
};

const exportAsJson = async () => {
  if (!props.note) return;
  
  await exportNoteAsJson({
    note: { ...props.note, title: noteTitle.value, content: noteContent.value },
    contactName: props.contactName || 'unknown',
    isMirrored: isMirrored.value,
    textColor: textColor.value,
  });
  
  showExportMenu.value = false;
};

const handleDelete = () => {
  if (!props.note || !props.contactId) return;
  showDeleteConfirm.value = true;
};

const handleDeleteConfirmed = async () => {
  if (!props.note || !props.contactId) return;
  
  try {
    const { deleteNote } = await import('../../../../services/noteService');
    await deleteNote(props.contactId, props.note.id);
    showDeleteConfirm.value = false;
    emit('note-deleted');
    emit('close'); // Close directly without mirroring (note is deleted)
  } catch (error) {
    console.error('Error deleting note:', error);
    alert('Failed to delete note. Please try again.');
    showDeleteConfirm.value = false;
  }
};

const handleClose = async () => {
  // For unlocked notes: If text is not mirrored (user was editing in readable mode), mirror it before closing
  if (!isMirrored.value && props.note && props.contactId && noteContent.value && !isLocked.value) {
    const mirroredContent = reverseText(noteContent.value);
    await updateNote(props.contactId, props.note.id, { content: mirroredContent });
    emit('note-updated');
  }
  // For locked notes: The unmirror toggle is view-only, no save needed
  isActivelyEditing.value = false;
  showExportMenu.value = false;
  emit('close');
};

const formatDateTime = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getLockTime = (): string => {
  if (!props.note) return '';
  const createdDate = new Date(props.note.createdAt);
  const endOfDay = new Date(createdDate);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background-color: #fef9e7;
  border-radius: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: #ffffff;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header-icon {
  color: #6b7280;
}

.created-date {
  font-size: 0.875rem;
  color: #6b7280;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.export-dropdown {
  position: relative;
}

.export-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #2563eb;
  border-radius: 0.375rem;
  background-color: #ffffff;
  color: #2563eb;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.export-button:hover {
  background-color: #eff6ff;
  border-color: #1d4ed8;
}

.export-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.25rem;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
  min-width: 160px;
  overflow: hidden;
}

.export-menu-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.625rem 1rem;
  border: none;
  background-color: transparent;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: left;
}

.export-menu-item:hover {
  background-color: #f3f4f6;
}

.export-menu-item:first-child {
  border-bottom: 1px solid #e5e7eb;
}

.locked-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  background-color: #f3f4f6;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #374151;
}

.save-button,
.delete-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #ffffff;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.save-button {
  color: #374151;
}

.save-button:hover {
  background-color: #f3f4f6;
  border-color: #9ca3af;
}

.delete-button {
  color: #dc2626;
  border-color: #dc2626;
}

.delete-button:hover {
  background-color: #fee2e2;
  border-color: #b91c1c;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  border-radius: 0.25rem;
  transition: all 0.2s;
}

.close-button:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.lock-warning {
  padding: 0.5rem 1.5rem;
  background-color: #fef3c7;
  border-bottom: 1px solid #e5e7eb;
}

.lock-warning p {
  margin: 0;
  font-size: 0.75rem;
  color: #92400e;
}

.mirror-toolbar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

.formatting-toolbar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: #ffffff;
  flex-wrap: wrap;
}

.toolbar-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.2s;
  color: #000000;
}

.toolbar-button:hover {
  background-color: #f3f4f6;
  border-color: #9ca3af;
}

.toolbar-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: #000000;
  width: 16px;
  height: 16px;
}

.toolbar-separator {
  width: 1px;
  height: 1.5rem;
  background-color: #e5e7eb;
}

.toolbar-select {
  padding: 0.375rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  background-color: #ffffff;
  font-size: 0.875rem;
  cursor: pointer;
  min-width: 120px;
}

.toolbar-select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

.toolbar-select-color option {
  padding: 0.25rem 0.5rem;
}

.toolbar-button-unmirror {
  border-color: #f59e0b;
  color: #f59e0b;
}

.toolbar-button-unmirror:hover {
  background-color: #fffbeb;
  border-color: #d97706;
}

.toolbar-button-unmirror.active {
  background-color: #d1fae5;
  border-color: #10b981;
  color: #10b981;
}

.mirror-hint {
  font-size: 0.75rem;
  color: #f59e0b;
  font-style: italic;
  margin-left: 0.5rem;
}

.mirror-hint-edit {
  color: #10b981;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  background-color: #fef9e7;
  direction: ltr;
  text-align: left;
}

.note-title-input {
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
  outline: none;
  direction: ltr !important;
  text-align: left !important;
}

.note-title-input:disabled {
  color: #6b7280;
  cursor: not-allowed;
}

.content-wrapper {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.note-content-editor {
  flex: 1;
  min-height: 400px;
  padding: 0.5rem;
  border: none;
  background: transparent;
  font-size: 1rem;
  line-height: 1.75;
  color: #111827;
  outline: none;
  width: 100%;
  resize: none;
  font-family: inherit;
}

.note-content-editor::placeholder {
  color: #9ca3af;
}

.note-content-editor:disabled {
  cursor: not-allowed;
  color: #6b7280;
  background-color: rgba(0, 0, 0, 0.02);
}
</style>

