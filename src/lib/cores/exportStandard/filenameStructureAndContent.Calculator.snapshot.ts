/**
 * Calculator snapshot export (PNG)
 *
 * Filename structure (Greenery-compatible):
 *   YYYYMMDD.FROM.TO.HHMMSS.png
 *
 * Canvas rendering lives in displayStandard/display.canvas.calculator.ts
 */

import {
  captureCalculatorCanvas,
  type CalculatorSnapshotData,
} from '@/lib/cores/displayStandard/display.canvas.calculator'

export type { CalculatorSnapshotData }

function formatDateYYYYMMDD(date: Date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}${month}${day}`
}

function formatTimeHHMMSS(date: Date = new Date()): string {
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${hours}${minutes}${seconds}`
}

export function generateCalculatorSnapshotFilename(
  fromSymbol: string,
  toSymbol: string,
  customDate?: Date
): string {
  const date = customDate || new Date()
  const dateStr = formatDateYYYYMMDD(date)
  const timeStr = formatTimeHHMMSS(date)
  return `${dateStr}.${fromSymbol.toUpperCase()}.${toSymbol.toUpperCase()}.${timeStr}.png`
}

function downloadPng(dataUrl: string, filename: string): void {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  link.remove()
}

/**
 * Save a calculator snapshot PNG.
 * Uses Electron save dialog when available (Greenery helper.js pattern), otherwise browser download.
 */
export async function exportCalculatorSnapshotToPNG(
  imageDataUrl: string,
  filename: string,
  callback: ((filePath: string) => void) | null = null
): Promise<void> {
  const dialog = (window as Window & { dialog?: { showSaveDialog: Function; showErrorBox: Function } }).dialog
  const fs = (window as Window & { fs?: { writeFile: Function } }).fs

  if (dialog?.showSaveDialog && fs?.writeFile) {
    const { filePath: fileName, canceled } = await dialog.showSaveDialog({
      defaultPath: `*/${filename}`,
      filters: [{ name: 'PNG', extensions: ['png'] }],
    })

    if (canceled || fileName === undefined) {
      return
    }

    const data = imageDataUrl.replace(/^data:image\/\w+;base64,/, '')
    const buf = Buffer.from(data, 'base64')

    return new Promise((resolve, reject) => {
      fs.writeFile(fileName, buf, (err: Error | null) => {
        if (err) {
          dialog.showErrorBox?.('Error!', `${err}`)
          reject(err)
          return
        }

        callback?.(fileName)
        resolve()
      })
    })
  }

  downloadPng(imageDataUrl, filename)
  callback?.(filename)
}

export async function exportCalculatorSnapshotAsPNG(
  data: CalculatorSnapshotData
): Promise<void> {
  const canvas = await captureCalculatorCanvas(data)
  const imageDataUrl = canvas.toDataURL('image/png')
  const filename = generateCalculatorSnapshotFilename(data.from.symbol, data.to.symbol)
  await exportCalculatorSnapshotToPNG(imageDataUrl, filename)
}
