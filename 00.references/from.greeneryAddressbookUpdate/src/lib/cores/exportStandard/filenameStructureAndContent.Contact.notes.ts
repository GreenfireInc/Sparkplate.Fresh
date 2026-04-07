/**
 * Contact Notes Export Utilities
 *
 * This module centralizes the note export formats (Markdown/JSON).
 * Filename structure: %projectName%.%date%.%time%.%contactName%.note.%noteTitle%.%extension%
 * 
 * Example: greeneryaddressbook.20260112.143052.John_Doe.note.meeting_notes.md
 */

import type { Note } from '../../../services/noteService';
import { reverseText } from '../displayStandard/mirrorText';

// Project name from package.json: "greenery.addressbook" -> "greeneryaddressbook"
const PROJECT_NAME = 'greeneryaddressbook';

export interface NoteExportFilenameParams {
  extension: 'md' | 'json';
  contactName: string;
  noteTitle: string;
  projectName?: string;
}

export interface NoteExportData {
  note: Note;
  contactName: string;
  isMirrored: boolean; // Whether the content is currently mirrored
  textColor?: string;
}

/**
 * Generate filename for note export
 * Format: %projectName%.%date%.%time%.%contactName%.note.%noteTitle%.%extension%
 */
export function generateNoteExportFilename(params: NoteExportFilenameParams): string {
  const { extension, contactName, noteTitle, projectName = PROJECT_NAME } = params;

  const now = new Date();

  // Date: YYYYMMDD
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const date = `${yyyy}${mm}${dd}`;

  // Time: HHMMSS
  const hh = String(now.getHours()).padStart(2, '0');
  const mi = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  const time = `${hh}${mi}${ss}`;

  const sanitizedContact = sanitizeForFilename(contactName);
  const sanitizedTitle = sanitizeForFilename(noteTitle || 'untitled');

  return `${projectName}.${date}.${time}.${sanitizedContact}.note.${sanitizedTitle}.${extension}`;
}

/**
 * Sanitize a string for use in a filename
 */
function sanitizeForFilename(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .toLowerCase()
    .substring(0, 50) || 'unnamed';
}

/**
 * Download a blob as a file
 */
function downloadBlob(blob: Blob, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Delay revoke to avoid Safari issues
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

/**
 * Get readable content (unmirror if necessary)
 */
function getReadableContent(content: string, isMirrored: boolean): string {
  if (!content) return '';
  return isMirrored ? reverseText(content) : content;
}

/**
 * Format date/time for display in exports
 */
function formatDateTime(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Export note as Markdown file
 */
export async function exportNoteAsMarkdown(data: NoteExportData): Promise<void> {
  const { note, contactName, isMirrored, textColor } = data;
  const readableContent = getReadableContent(note.content, isMirrored);
  const title = note.title || 'Untitled Note';
  
  const md: string[] = [];
  md.push(`# ${title}`);
  md.push('');
  md.push(`> **Contact**: ${contactName}`);
  md.push(`> **Created**: ${formatDateTime(note.createdAt)}`);
  md.push(`> **Modified**: ${formatDateTime(note.modifiedAt)}`);
  if (textColor) {
    md.push(`> **Text Color**: ${textColor}`);
  }
  md.push('');
  md.push('---');
  md.push('');
  md.push(readableContent || '_No content_');
  md.push('');

  const filename = generateNoteExportFilename({
    extension: 'md',
    contactName,
    noteTitle: title,
  });

  downloadBlob(
    new Blob([md.join('\n')], { type: 'text/markdown;charset=utf-8' }),
    filename
  );
}

/**
 * Export note as JSON file
 */
export async function exportNoteAsJson(data: NoteExportData): Promise<void> {
  const { note, contactName, isMirrored, textColor } = data;
  const readableContent = getReadableContent(note.content, isMirrored);
  const title = note.title || 'Untitled Note';

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
  };

  const filename = generateNoteExportFilename({
    extension: 'json',
    contactName,
    noteTitle: title,
  });

  downloadBlob(
    new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json;charset=utf-8' }),
    filename
  );
}


