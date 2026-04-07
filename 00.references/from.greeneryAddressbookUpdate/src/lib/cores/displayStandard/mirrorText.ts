/**
 * Mirror/Reverse Text Utilities
 * 
 * These functions provide text obfuscation by reversing character order.
 * Used for privacy features where text should not be immediately readable.
 * 
 * Example:
 *   "Hello World" → "dlroW olleH"
 */

/**
 * Reverse the character order of a string (mirror text)
 * @param text - The text to reverse
 * @returns The reversed text
 */
export function reverseText(text: string): string {
  if (!text) return '';
  return text.split('').reverse().join('');
}

/**
 * Alias for reverseText - mirrors text for privacy/obfuscation
 * @param text - The text to mirror
 * @returns The mirrored text
 */
export function mirrorText(text: string): string {
  return reverseText(text);
}

/**
 * Unmirror text (same operation as mirror, since reversing twice returns original)
 * @param text - The mirrored text to unmirror
 * @returns The unmirrored (readable) text
 */
export function unmirrorText(text: string): string {
  return reverseText(text);
}

/**
 * Prepare text content for storage - ensures text is in mirrored format
 * @param text - The current text content
 * @param isMirrored - Whether the text is currently in mirrored state
 * @returns The text in mirrored format ready for storage
 */
export function prepareTextForStorage(text: string, isMirrored: boolean): string {
  if (!text) return '';
  // If already mirrored, save as-is
  // If not mirrored (readable), reverse before saving
  return isMirrored ? text : reverseText(text);
}

/**
 * Determine initial mirror state when loading a note
 * @param content - The note content
 * @returns true if content exists (should display mirrored), false if empty (new note)
 */
export function getInitialMirrorState(content: string | undefined | null): boolean {
  return !!content;
}

