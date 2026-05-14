/**
 * Contact Notes Export Utilities
 *
 * Centralizes the note export formats (Markdown/JSON).
 * Filename structure: %projectName%.%date%.%time%.%contactName%.note.%noteTitle%.%extension%
 *
 * Example: sparkplate.20260420.143052.John_Doe.note.meeting_notes.md
 */

import type { Note } from '@/services/addressBook/service.addressBook.Note'
import { reverseText } from '@/lib/cores/displayStandard/display.text.mirrored'

const PROJECT_NAME = 'sparkplate'

export interface NoteExportFilenameParams {
  extension: 'md' | 'json'
  contactName: string
  noteTitle: string
  projectName?: string
}

export interface NoteExportData {
  note: Note
  contactName: string
  isMirrored: boolean
  textColor?: string
}

export function generateNoteExportFilename(params: NoteExportFilenameParams): string {
  const { extension, contactName, noteTitle, projectName = PROJECT_NAME } = params

  const now = new Date()

  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  const date = `${yyyy}${mm}${dd}`

  const hh = String(now.getHours()).padStart(2, '0')
  const mi = String(now.getMinutes()).padStart(2, '0')
  const ss = String(now.getSeconds()).padStart(2, '0')
  const time = `${hh}${mi}${ss}`

  const sanitizedContact = sanitizeForFilename(contactName)
  const sanitizedTitle = sanitizeForFilename(noteTitle || 'untitled')

  return `${projectName}.${date}.${time}.${sanitizedContact}.note.${sanitizedTitle}.${extension}`
}

function sanitizeForFilename(name: string): string {
  return (
    name
      .replace(/[^a-zA-Z0-9_]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '')
      .toLowerCase()
      .substring(0, 50) || 'unnamed'
  )
}

function downloadBlob(blob: Blob, filename: string) {
  const link = document.createElement('a')
  link.download = filename
  link.href = URL.createObjectURL(blob)
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(link.href), 1000)
}

function getReadableContent(content: string, isMirrored: boolean): string {
  if (!content) return ''
  return isMirrored ? reverseText(content) : content
}

function formatDateTime(dateString: string): string {
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

export async function exportNoteAsMarkdown(data: NoteExportData): Promise<void> {
  const { note, contactName, isMirrored, textColor } = data
  const readableContent = getReadableContent(note.content, isMirrored)
  const title = note.title || 'Untitled Note'

  const md: string[] = []
  md.push(`# ${title}`)
  md.push('')
  md.push(`> **Contact**: ${contactName}`)
  md.push(`> **Created**: ${formatDateTime(note.createdAt)}`)
  md.push(`> **Modified**: ${formatDateTime(note.modifiedAt)}`)
  if (textColor) {
    md.push(`> **Text Color**: ${textColor}`)
  }
  md.push('')
  md.push('---')
  md.push('')
  md.push(readableContent || '_No content_')
  md.push('')

  const filename = generateNoteExportFilename({
    extension: 'md',
    contactName,
    noteTitle: title,
  })

  downloadBlob(
    new Blob([md.join('\n')], { type: 'text/markdown;charset=utf-8' }),
    filename,
  )
}

export async function exportNoteAsJson(data: NoteExportData): Promise<void> {
  const { note, contactName, isMirrored, textColor } = data
  const readableContent = getReadableContent(note.content, isMirrored)
  const title = note.title || 'Untitled Note'

  const jsonData = {
    id: note.id,
    contactName,
    title,
    content: readableContent,
    createdAt: note.createdAt,
    modifiedAt: note.modifiedAt,
    textColor: textColor || null,
    isLocked: note.isLocked,
    exportedAt: new Date().toISOString(),
  }

  const filename = generateNoteExportFilename({
    extension: 'json',
    contactName,
    noteTitle: title,
  })

  downloadBlob(
    new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json;charset=utf-8' }),
    filename,
  )
}
