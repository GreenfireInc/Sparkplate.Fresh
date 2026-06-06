import type {
  CalculatorCanvasOptions,
  CalculatorCurrency,
  CalculatorSnapshotData,
} from './display.canvas.calculator.static'
import { getFiatCurrencySymbol, fiatByIso } from '@/lib/cores/fiatStandard'

export type { CalculatorSnapshotData, CalculatorCanvasOptions }

export interface CalculatorDynamicCanvasOptions extends CalculatorCanvasOptions {
  devicePixelRatio?: number
}

const DEFAULT_WIDTH = 768
const DEFAULT_HEIGHT = 1024
const DEFAULT_SYMBOL_SIZE = 40

function isFiatCurrency(currency: CalculatorCurrency): boolean {
  return currency.id == null
}

function resolveFiatGlyph(currency: CalculatorCurrency): string {
  return currency.currencySymbol ?? getFiatCurrencySymbol(currency.symbol)
}

function resolveFiatFlag(currency: CalculatorCurrency): string {
  return currency.flag ?? fiatByIso[currency.symbol.toUpperCase()]?.flag ?? ''
}

function formatCurrencyLabel(currency: CalculatorCurrency): string {
  if (!isFiatCurrency(currency)) return currency.symbol
  const glyph = resolveFiatGlyph(currency)
  const flag = resolveFiatFlag(currency)
  return flag ? `(${glyph}) ${currency.symbol} ${flag}` : `(${glyph}) ${currency.symbol}`
}

function formatDisplayDate(date: Date = new Date()): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function enrichCalculatorCurrency(currency: CalculatorCurrency): CalculatorCurrency {
  if (currency.id != null) return currency
  const fiat = fiatByIso[currency.symbol.toUpperCase()]
  return {
    ...currency,
    currencySymbol: currency.currencySymbol ?? fiat?.currencySymbol ?? getFiatCurrencySymbol(currency.symbol),
    flag: currency.flag ?? fiat?.flag,
  }
}

function enrichSnapshotData(data: CalculatorSnapshotData): CalculatorSnapshotData {
  return {
    ...data,
    from: enrichCalculatorCurrency(data.from),
    to: enrichCalculatorCurrency(data.to),
  }
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): void {
  const r = Math.min(radius, width / 2, height / 2)
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + width, y, x + width, y + height, r)
  ctx.arcTo(x + width, y + height, x, y + height, r)
  ctx.arcTo(x, y + height, x, y, r)
  ctx.arcTo(x, y, x + width, y, r)
  ctx.closePath()
}

function drawDynamicBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
): void {
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#5b21b6')
  gradient.addColorStop(0.45, '#7c3aed')
  gradient.addColorStop(1, '#4c1d95')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  const glow = ctx.createRadialGradient(width * 0.82, height * 0.18, 0, width * 0.82, height * 0.18, width * 0.35)
  glow.addColorStop(0, 'rgba(255, 255, 255, 0.18)')
  glow.addColorStop(1, 'rgba(255, 255, 255, 0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, width, height)
}

async function drawCryptoIcon(
  ctx: CanvasRenderingContext2D,
  currency: CalculatorCurrency,
  x: number,
  y: number,
  size: number,
  cryptoIconBasePath: string,
): Promise<void> {
  if (isFiatCurrency(currency)) return

  await new Promise<void>((resolve) => {
    const img = new Image()
    img.src = `${cryptoIconBasePath}/${currency.symbol.toLowerCase()}.svg`
    img.onload = () => {
      ctx.drawImage(img, x, y, size, size)
      resolve()
    }
    img.onerror = () => resolve()
  })
}

async function drawDynamicCalculatorCanvas(
  ctx: CanvasRenderingContext2D,
  data: CalculatorSnapshotData,
  width: number,
  height: number,
  options: CalculatorDynamicCanvasOptions = {},
): Promise<void> {
  const symbolSize = options.symbolSize ?? DEFAULT_SYMBOL_SIZE
  const cryptoIconBasePath = options.cryptoIconBasePath ?? '/assets/icons/crypto'
  const cardX = Math.round(width * 0.08)
  const cardY = Math.round(height * 0.1)
  const cardW = Math.round(width * 0.84)
  const cardH = Math.round(height * 0.8)
  const centerX = Math.round(width / 2)
  const localeStringOpts: Intl.NumberFormatOptions = { maximumFractionDigits: 6 }
  const amountFormatted = parseFloat(String(data.amount)).toLocaleString('en-US', localeStringOpts)
  const change = data.fromChange24h
  const showChange = change != null && !isFiatCurrency(data.from)
  const changeColor = showChange ? (change >= 0 ? '#16a34a' : '#dc2626') : '#6b7280'

  drawDynamicBackground(ctx, width, height)

  ctx.save()
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 28)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.97)'
  ctx.fill()
  ctx.restore()

  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.fillStyle = '#6b7280'
  ctx.font = '500 22px Arial'
  ctx.fillText(formatDisplayDate(), centerX, cardY + 42)

  ctx.fillStyle = '#111827'
  ctx.font = '700 34px Arial'
  ctx.fillText('Currency Conversion', centerX, cardY + 88)

  const rowStartY = cardY + 170
  const rowGap = 110
  const iconX = cardX + 56

  for (const [index, row] of [
    { label: 'From', currency: data.from },
    { label: 'To', currency: data.to },
  ].entries()) {
    const y = rowStartY + index * rowGap

    ctx.textAlign = 'left'
    ctx.fillStyle = '#6b7280'
    ctx.font = '600 18px Arial'
    ctx.fillText(row.label, iconX, y)

    await drawCryptoIcon(ctx, row.currency, iconX, y + 30, symbolSize, cryptoIconBasePath)

    const textX = isFiatCurrency(row.currency) ? iconX : iconX + symbolSize + 14
    ctx.fillStyle = '#111827'
    ctx.font = '700 28px Arial'
    ctx.fillText(formatCurrencyLabel(row.currency), textX, y + 34)
  }

  ctx.textAlign = 'center'
  ctx.fillStyle = '#6b7280'
  ctx.font = '600 20px Arial'
  ctx.fillText('Exchange rate', centerX, cardY + cardH - 250)

  ctx.fillStyle = changeColor
  ctx.font = '700 30px Arial'
  ctx.fillText(`1 ${formatCurrencyLabel(data.from)} ≈ ${data.solution.rate} ${formatCurrencyLabel(data.to)}`, centerX, cardY + cardH - 210)

  if (showChange) {
    const sign = change > 0 ? '+' : ''
    ctx.font = '600 22px Arial'
    ctx.fillText(`${sign}${change.toFixed(2)}% (24h)`, centerX, cardY + cardH - 168)
  }

  ctx.fillStyle = '#111827'
  ctx.font = '600 24px Arial'
  ctx.fillText(
    `${amountFormatted} ${formatCurrencyLabel(data.from)} ≈ ${data.solution.amount} ${formatCurrencyLabel(data.to)}`,
    centerX,
    cardY + cardH - 110,
  )
}

function prepareCanvas(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  devicePixelRatio: number,
): CanvasRenderingContext2D {
  canvas.width = Math.round(width * devicePixelRatio)
  canvas.height = Math.round(height * devicePixelRatio)
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Could not get canvas context')
  }

  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
  return ctx
}

export async function mountCalculatorDynamicCanvas(
  canvas: HTMLCanvasElement,
  data: CalculatorSnapshotData,
  options: CalculatorDynamicCanvasOptions = {},
): Promise<void> {
  const snapshot = enrichSnapshotData(data)
  const width = options.width ?? DEFAULT_WIDTH
  const height = options.height ?? DEFAULT_HEIGHT
  const devicePixelRatio = options.devicePixelRatio ?? (typeof window !== 'undefined' ? window.devicePixelRatio : 1)
  const ctx = prepareCanvas(canvas, width, height, devicePixelRatio)
  await drawDynamicCalculatorCanvas(ctx, snapshot, width, height, options)
}

export async function captureCalculatorDynamicCanvas(
  data: CalculatorSnapshotData,
  options: CalculatorDynamicCanvasOptions = {},
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas')
  await mountCalculatorDynamicCanvas(canvas, data, options)
  return canvas
}
