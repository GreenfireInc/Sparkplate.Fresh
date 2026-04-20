/**
 * Mirror/Reverse Text Utilities
 *
 * These functions provide text obfuscation by reversing character order.
 * Used for privacy features where text should not be immediately readable.
 *
 * Example:
 *   "Hello World" → "dlroW olleH"
 */

export function reverseText(text: string): string {
  if (!text) return ''
  return text.split('').reverse().join('')
}

export function mirrorText(text: string): string {
  return reverseText(text)
}

export function unmirrorText(text: string): string {
  return reverseText(text)
}

/**
 * Prepare text content for storage — always stored in mirrored form.
 * If the text is currently mirrored (as displayed), save as-is.
 * If the text is currently readable, reverse it before saving.
 */
export function prepareTextForStorage(text: string, isMirrored: boolean): string {
  if (!text) return ''
  return isMirrored ? text : reverseText(text)
}

/**
 * Determine initial mirror state when loading a note.
 * Existing content is assumed to be mirrored; empty content starts unmirrored.
 */
export function getInitialMirrorState(content: string | undefined | null): boolean {
  return !!content
}
