<template>
  <DialogRoot :open="dialogOpen" @update:open="onDialogOpen">
    <DialogPortal>
      <DialogOverlay class="cne-overlay" />
      <DialogContent
        class="cne-modal"
        data-stacked-modal="note-editor"
        :aria-describedby="undefined"
        @click="closeExportMenu"
      >
        <div class="cne-header">
          <div class="cne-header__left">
            <Clock :size="16" class="cne-header__icon" />
            <span class="cne-header__date">
              Created: {{ formatDateTime(note?.createdAt || '') }}
            </span>
            <DialogTitle class="cne-header__title sr-only">Note Editor</DialogTitle>
          </div>

          <div class="cne-header__right">
            <div class="cne-export" v-if="note">
              <button
                type="button"
                class="cne-btn cne-btn--outline"
                @click="toggleExportMenu"
                title="Export note"
              >
                <Download :size="16" />
                Export
              </button>
              <div v-if="showExportMenu" class="cne-export__menu">
                <button type="button" class="cne-export__item" @click="exportAsMarkdown">
                  <FileText :size="14" />
                  Markdown (.md)
                </button>
                <button type="button" class="cne-export__item" @click="exportAsJson">
                  <FileJson :size="14" />
                  JSON (.json)
                </button>
              </div>
            </div>

            <div v-if="isLocked" class="cne-badge cne-badge--locked">
              <Lock :size="14" />
              <span>Locked</span>
            </div>
            <button
              v-else
              type="button"
              class="cne-btn cne-btn--muted"
              @click="handleSave"
              title="Save note"
            >
              <Save :size="16" />
              Save
            </button>

            <button
              type="button"
              class="cne-btn cne-btn--danger"
              @click="handleDelete"
              title="Delete note"
            >
              <Trash2 :size="16" />
              Delete
            </button>

            <DialogClose class="cne-close" aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </DialogClose>
          </div>
        </div>

        <Separator class="cne-separator" />

        <div v-if="!isLocked && note" class="cne-lock-warning">
          <p>This note will be locked at {{ getLockTime() }}</p>
        </div>

        <div v-if="isLocked && note" class="cne-toolbar cne-toolbar--mirror">
          <button
            type="button"
            class="cne-tool cne-tool--mirror"
            :class="{ 'is-active': !isMirrored }"
            :title="isMirrored ? 'Unmirror text (click to read)' : 'Mirror text (for privacy)'"
            @click="toggleMirror"
          >
            <span class="cne-tool__icon">↺</span>
          </button>
          <span v-if="isMirrored" class="cne-hint">Text is mirrored — click ↺ to read</span>
          <span v-else class="cne-hint cne-hint--edit">Reading mode — text displayed unmirrored</span>
        </div>

        <div v-if="!isLocked && note" class="cne-toolbar">
          <button type="button" class="cne-tool" title="Bold" @click="handleFormat('bold')">
            <span class="cne-tool__icon"><b>B</b></span>
          </button>
          <button type="button" class="cne-tool" title="Italic" @click="handleFormat('italic')">
            <span class="cne-tool__icon"><i>I</i></span>
          </button>
          <button type="button" class="cne-tool" title="Underline" @click="handleFormat('underline')">
            <span class="cne-tool__icon"><u>U</u></span>
          </button>

          <Separator orientation="vertical" class="cne-toolbar__separator" />

          <select
            class="cne-select"
            @change="handleFormat('fontSize', ($event.target as HTMLSelectElement).value)"
          >
            <option value="">Font size</option>
            <option value="2">Small</option>
            <option value="3">Normal</option>
            <option value="5">Large</option>
            <option value="7">Extra Large</option>
          </select>

          <select
            class="cne-select cne-select--color"
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

          <Separator orientation="vertical" class="cne-toolbar__separator" />

          <button type="button" class="cne-tool" title="Align Left" @click="handleFormat('justifyLeft')">
            <span class="cne-tool__icon">⫷</span>
          </button>
          <button type="button" class="cne-tool" title="Align Center" @click="handleFormat('justifyCenter')">
            <span class="cne-tool__icon">☰</span>
          </button>
          <button type="button" class="cne-tool" title="Align Right" @click="handleFormat('justifyRight')">
            <span class="cne-tool__icon">⫸</span>
          </button>

          <Separator orientation="vertical" class="cne-toolbar__separator" />

          <button
            type="button"
            class="cne-tool cne-tool--mirror"
            :class="{ 'is-active': !isMirrored }"
            :title="isMirrored ? 'Unmirror text (click to read)' : 'Mirror text (for privacy)'"
            @click="toggleMirror"
          >
            <span class="cne-tool__icon">↺</span>
          </button>
          <span v-if="isMirrored" class="cne-hint">Text is mirrored — click ↺ to read</span>
          <span v-else class="cne-hint cne-hint--edit">Editing mode — text will be mirrored on close</span>
        </div>

        <div class="cne-body" dir="ltr">
          <input
            v-if="note"
            v-model="noteTitle"
            type="text"
            class="cne-title-input"
            placeholder="Note title"
            :disabled="isLocked"
            dir="ltr"
            @input="handleTitleChange"
          />
          <div v-if="note" class="cne-content-wrapper">
            <textarea
              ref="contentRef"
              v-model="noteContent"
              class="cne-content-editor"
              :class="{ 'is-locked': isLocked }"
              :style="{ color: textColor || '#111827' }"
              :disabled="isLocked"
              placeholder="Start writing..."
              @input="handleContentChange"
            ></textarea>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>

  <NoteDeleteConfirmModal
    :show="showDeleteConfirm"
    :note="note"
    @close="showDeleteConfirm = false"
    @confirm="handleDeleteConfirmed"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
  Separator,
} from 'radix-vue'
import { Clock, Lock, Save, Trash2, Download, FileText, FileJson } from 'lucide-vue-next'
import {
  isNoteLocked,
  updateNote,
  deleteNote,
  type Note,
  type NoteOwnerKind,
} from '@/services/addressBook/service.addressBook.Note'
import { reverseText, getInitialMirrorState } from '@/lib/cores/displayStandard/mirrorText'
import { exportNoteAsMarkdown, exportNoteAsJson } from '@/lib/cores/exportStandard/filenameStructureAndContent.Contact.notes'
import NoteDeleteConfirmModal from '@/components/modals/confirmations/modal.confirm.delete.Note.vue'

defineOptions({ name: 'SubModalNoteEditor' })

const props = withDefaults(
  defineProps<{
    show: boolean
    note: Note | null
    contactId: number | null
    contactName?: string
    noteOwnerKind?: NoteOwnerKind
  }>(),
  { noteOwnerKind: 'contact' },
)

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'note-updated'): void
  (e: 'note-deleted'): void
}>()

const dialogOpen = computed(() => props.show)

function onDialogOpen(open: boolean) {
  if (!open) handleClose()
}

const contentRef = ref<HTMLTextAreaElement | null>(null)
const noteTitle = ref('')
const noteContent = ref('')
const isMirrored = ref(true)
const showExportMenu = ref(false)
const isActivelyEditing = ref(false)
const textColor = ref('')
const showDeleteConfirm = ref(false)

const isLocked = computed(() => {
  if (!props.note) return false
  return isNoteLocked(props.note.createdAt)
})

const toggleMirror = () => {
  noteContent.value = reverseText(noteContent.value)
  isMirrored.value = !isMirrored.value
}

watch(() => props.show, (newVal, oldVal) => {
  if (newVal && !oldVal && props.note) {
    noteTitle.value = props.note.title || ''
    noteContent.value = props.note.content || ''
    isMirrored.value = getInitialMirrorState(props.note.content)
    isActivelyEditing.value = false
    textColor.value = props.note.textColor || ''
  } else if (!newVal && oldVal) {
    isActivelyEditing.value = false
  }
})

watch(() => props.note, (newNote) => {
  if (!props.show || isActivelyEditing.value) return
  if (newNote) {
    noteTitle.value = newNote.title
    noteContent.value = newNote.content || ''
    isMirrored.value = getInitialMirrorState(newNote.content)
    textColor.value = newNote.textColor || ''
  } else {
    noteTitle.value = ''
    noteContent.value = ''
    isMirrored.value = false
    textColor.value = ''
  }
}, { immediate: true })

const handleFormat = (command: string, value?: string) => {
  // Note: formatting commands are placeholders — textarea has limited rich-text support.
  console.log('Format command:', command, value)
}

const applyTextColor = () => {
  if (!props.note || isLocked.value) return
  isActivelyEditing.value = true
  handleUpdateNote({ textColor: textColor.value || undefined })
}

const handleTitleChange = () => {
  if (!props.note || isLocked.value) return
  isActivelyEditing.value = true
  handleUpdateNote({ title: noteTitle.value })
}

const handleContentChange = () => {
  if (!props.note || isLocked.value) return
  isActivelyEditing.value = true
  handleUpdateNote({ content: noteContent.value })
}

const handleUpdateNote = async (updates: Partial<Note>) => {
  if (!props.note || !props.contactId || isLocked.value) return
  try {
    await updateNote(props.contactId, props.note.id, updates, props.noteOwnerKind)
    emit('note-updated')
  } catch (err) {
    console.error('Error updating note:', err)
    if (err instanceof Error && err.message.includes('locked')) {
      alert('This note is locked and cannot be modified.')
    }
  }
}

const handleSave = () => {
  if (!props.note || isLocked.value) return
  alert('Note saved successfully!')
}

const toggleExportMenu = (event: Event) => {
  event.stopPropagation()
  showExportMenu.value = !showExportMenu.value
}

const closeExportMenu = () => {
  showExportMenu.value = false
}

const exportAsMarkdown = async () => {
  if (!props.note) return
  await exportNoteAsMarkdown({
    note: { ...props.note, title: noteTitle.value, content: noteContent.value },
    contactName: props.contactName || 'unknown',
    isMirrored: isMirrored.value,
    textColor: textColor.value,
  })
  showExportMenu.value = false
}

const exportAsJson = async () => {
  if (!props.note) return
  await exportNoteAsJson({
    note: { ...props.note, title: noteTitle.value, content: noteContent.value },
    contactName: props.contactName || 'unknown',
    isMirrored: isMirrored.value,
    textColor: textColor.value,
  })
  showExportMenu.value = false
}

const handleDelete = () => {
  if (!props.note || !props.contactId) return
  showDeleteConfirm.value = true
}

const handleDeleteConfirmed = async () => {
  if (!props.note || !props.contactId) return
  try {
    await deleteNote(props.contactId, props.note.id, props.noteOwnerKind)
    showDeleteConfirm.value = false
    emit('note-deleted')
    emit('close')
  } catch (err) {
    console.error('Error deleting note:', err)
    alert('Failed to delete note. Please try again.')
    showDeleteConfirm.value = false
  }
}

const handleClose = async () => {
  if (!isMirrored.value && props.note && props.contactId && noteContent.value && !isLocked.value) {
    const mirroredContent = reverseText(noteContent.value)
    await updateNote(props.contactId, props.note.id, { content: mirroredContent }, props.noteOwnerKind)
    emit('note-updated')
  }
  isActivelyEditing.value = false
  showExportMenu.value = false
  emit('close')
}

const formatDateTime = (dateString: string): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const getLockTime = (): string => {
  if (!props.note) return ''
  const createdDate = new Date(props.note.createdAt)
  const endOfDay = new Date(createdDate)
  endOfDay.setHours(23, 59, 59, 999)
  return endOfDay.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Stacks above Contact Details (10061) and below top-level alerts */
.cne-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10100;
  animation: cne-fade 0.15s ease;
}

@keyframes cne-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

.cne-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10101;
  width: min(95vw, 60rem);
  max-height: 90vh;
  background: #fef9e7;
  border-radius: 0.75rem;
  box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: cne-pop 0.18s ease;
}

@keyframes cne-pop {
  from {
    opacity: 0;
    transform: translate(-50%, -48%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.cne-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  background: #ffffff;
  flex-shrink: 0;
  flex-wrap: wrap;
}

.cne-header__left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.cne-header__icon {
  color: #6b7280;
  flex-shrink: 0;
}

.cne-header__date {
  font-size: 0.875rem;
  color: #6b7280;
  white-space: nowrap;
}

.cne-header__right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.cne-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.8125rem;
  font-weight: 600;
  font-family: inherit;
  transition: background 0.12s, color 0.12s, border-color 0.12s;
  border: 1px solid transparent;
}

.cne-btn--outline {
  background: #ffffff;
  color: #2563eb;
  border-color: #2563eb;
}

.cne-btn--outline:hover {
  background: #eff6ff;
  border-color: #1d4ed8;
}

.cne-btn--muted {
  background: #ffffff;
  color: #374151;
  border-color: #d1d5db;
}

.cne-btn--muted:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.cne-btn--danger {
  background: #ffffff;
  color: #dc2626;
  border-color: #dc2626;
}

.cne-btn--danger:hover {
  background: #fee2e2;
  border-color: #b91c1c;
}

.cne-export {
  position: relative;
}

.cne-export__menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.25rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  min-width: 10rem;
  overflow: hidden;
}

.cne-export__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.625rem 1rem;
  border: none;
  background: transparent;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.12s;
  text-align: left;
  font-family: inherit;
}

.cne-export__item:hover {
  background: #f3f4f6;
}

.cne-export__item + .cne-export__item {
  border-top: 1px solid #e5e7eb;
}

.cne-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 600;
}

.cne-badge--locked {
  background: #f3f4f6;
  color: #374151;
}

.cne-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  background: #f3f4f6;
  border-radius: 0.375rem;
  color: #6b7280;
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
}

.cne-close svg {
  width: 1rem;
  height: 1rem;
}

.cne-close:hover {
  background: #e5e7eb;
  color: #111827;
}

.cne-separator {
  height: 1px;
  background: #e5e7eb;
  flex-shrink: 0;
}

.cne-lock-warning {
  padding: 0.5rem 1.25rem;
  background: #fef3c7;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.cne-lock-warning p {
  margin: 0;
  font-size: 0.75rem;
  color: #92400e;
}

.cne-toolbar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  flex-wrap: wrap;
  flex-shrink: 0;
}

.cne-toolbar--mirror {
  background: #f9fafb;
}

.cne-toolbar__separator {
  width: 1px;
  height: 1.5rem;
  background: #e5e7eb;
  margin: 0 0.125rem;
}

.cne-tool {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: #ffffff;
  cursor: pointer;
  color: #111827;
  transition: background 0.12s, border-color 0.12s, color 0.12s;
}

.cne-tool:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.cne-tool__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
  width: 1rem;
  height: 1rem;
}

.cne-tool--mirror {
  border-color: #f59e0b;
  color: #f59e0b;
}

.cne-tool--mirror:hover {
  background: #fffbeb;
  border-color: #d97706;
}

.cne-tool--mirror.is-active {
  background: #d1fae5;
  border-color: #10b981;
  color: #10b981;
}

.cne-select {
  padding: 0.375rem 0.625rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: #ffffff;
  font-size: 0.8125rem;
  font-family: inherit;
  cursor: pointer;
  min-width: 7rem;
}

.cne-select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

.cne-hint {
  font-size: 0.75rem;
  color: #f59e0b;
  font-style: italic;
  margin-left: 0.25rem;
}

.cne-hint--edit {
  color: #10b981;
}

.cne-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 1.25rem 1.5rem 1.5rem;
  background: #fef9e7;
  direction: ltr;
  text-align: left;
  display: flex;
  flex-direction: column;
}

.cne-title-input {
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
  font-family: inherit;
}

.cne-title-input:disabled {
  color: #6b7280;
  cursor: not-allowed;
}

.cne-content-wrapper {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.cne-content-editor {
  flex: 1;
  min-height: 24rem;
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

.cne-content-editor::placeholder {
  color: #9ca3af;
}

.cne-content-editor:disabled,
.cne-content-editor.is-locked {
  cursor: not-allowed;
  color: #6b7280;
  background: rgba(0, 0, 0, 0.02);
}
</style>
