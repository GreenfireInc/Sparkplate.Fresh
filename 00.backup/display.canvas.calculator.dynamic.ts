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

// ── Dimensions — match calculationBackground.png exactly ─────────────────────
const DEFAULT_WIDTH  = 768
const DEFAULT_HEIGHT = 1024
const DEFAULT_SYMBOL_SIZE = 45

// ── Layout constants — mirror display.canvas.calculator.static.ts ─────────────
const LABEL_RIGHT_OFFSET      = 40
const LABEL_TO_CONTENT_GAP    = 10
const CRYPTO_ICON_LEFT_OFFSET = 50
const PRICE_CHANGE_GREEN = '#16a34a'
const PRICE_CHANGE_RED   = '#dc2626'

// ── Border style ──────────────────────────────────────────────────────────────
const BORDER_INSET  = 18   // px from canvas edge to border outer stroke
const BORDER_RADIUS = 28   // rounded-corner radius
const BORDER_WIDTH  = 28   // stroke width of the outer frame
/** Overlaps the top border stroke, nudged slightly above center. */
const DATE_Y        = BORDER_INSET + BORDER_WIDTH / 2 - 12

// ── Text Y positions — identical to static canvas ─────────────────────────────
const FROM_LABEL_Y = 260
const TO_LABEL_Y   = 360
const RATE_LINE_Y  = 620
const AMOUNT_Y     = 740

// ── Helpers ───────────────────────────────────────────────────────────────────

function isFiatCurrency(currency: CalculatorCurrency): boolean {
  return currency.id == null
}

function resolveFiatGlyph(currency: CalculatorCurrency): string {
  return currency.currencySymbol ?? getFiatCurrencySymbol(currency.symbol)
}

function resolveFiatFlag(currency: CalculatorCurrency): string {
  return currency.flag ?? fiatByIso[currency.symbol.toUpperCase()]?.flag ?? ''
}

function formatCurrencyRowLabel(currency: CalculatorCurrency): string {
  if (!isFiatCurrency(currency)) return currency.symbol
  const glyph = resolveFiatGlyph(currency)
  const flag  = resolveFiatFlag(currency)
  return flag ? `(${glyph}) ${currency.symbol} ${flag}` : `(${glyph}) ${currency.symbol}`
}

function splitCurrencyRowLabel(currency: CalculatorCurrency): { beforeFlag: string; flag: string } {
  if (!isFiatCurrency(currency)) return { beforeFlag: currency.symbol, flag: '' }
  const glyph = resolveFiatGlyph(currency)
  const flag  = resolveFiatFlag(currency)
  return { beforeFlag: `(${glyph}) ${currency.symbol}`, flag: flag ? ` ${flag}` : '' }
}

function getCurrencyRowLabelLeft(currency: CalculatorCurrency, centerX: number, symbolSize: number): number {
  const labelRightX = centerX + LABEL_RIGHT_OFFSET
  if (isFiatCurrency(currency)) return labelRightX + LABEL_TO_CONTENT_GAP
  return centerX + CRYPTO_ICON_LEFT_OFFSET + symbolSize + LABEL_TO_CONTENT_GAP
}

function formatDisplayDate(date: Date = new Date()): string {
  const day = date.getDate()
  const suffix =
    day % 10 === 1 && day !== 11 ? 'st'
    : day % 10 === 2 && day !== 12 ? 'nd'
    : day % 10 === 3 && day !== 13 ? 'rd'
    : 'th'
  const month = date.toLocaleDateString('en-US', { month: 'long' })
  return `${month} ${day}${suffix} ${date.getFullYear()}`
}

function enrichCurrency(currency: CalculatorCurrency): CalculatorCurrency {
  if (currency.id != null) return currency
  const fiat = fiatByIso[currency.symbol.toUpperCase()]
  return {
    ...currency,
    currencySymbol: currency.currencySymbol ?? fiat?.currencySymbol ?? getFiatCurrencySymbol(currency.symbol),
    flag: currency.flag ?? fiat?.flag,
  }
}

function enrichData(data: CalculatorSnapshotData): CalculatorSnapshotData {
  return { ...data, from: enrichCurrency(data.from), to: enrichCurrency(data.to) }
}

// ── Drawing primitives ────────────────────────────────────────────────────────

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
): void {
  const cr = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + cr, y)
  ctx.arcTo(x + w, y,     x + w, y + h, cr)
  ctx.arcTo(x + w, y + h, x,     y + h, cr)
  ctx.arcTo(x,     y + h, x,     y,     cr)
  ctx.arcTo(x,     y,     x + w, y,     cr)
  ctx.closePath()
}

interface TextSegment {
  text: string
  color: string
}

function buildRateLineSegments(data: CalculatorSnapshotData): TextSegment[] {
  const { from, to, solution } = data
  const fromParts = splitCurrencyRowLabel(from)
  const toParts   = splitCurrencyRowLabel(to)
  const change    = data.fromChange24h
  const showChange  = change != null && !isFiatCurrency(from)
  const changeColor = showChange ? (change >= 0 ? PRICE_CHANGE_GREEN : PRICE_CHANGE_RED) : '#111827'

  const segments: TextSegment[] = [{ text: `1 ${fromParts.beforeFlag}`, color: '#111827' }]
  if (fromParts.flag) segments.push({ text: fromParts.flag, color: '#111827' })
  segments.push({ text: ' ≈ ', color: '#111827' })
  segments.push({ text: solution.rate, color: changeColor })
  segments.push({ text: ` ${toParts.beforeFlag}`, color: '#111827' })
  if (toParts.flag) segments.push({ text: toParts.flag, color: '#111827' })
  if (showChange) {
    const sign = change > 0 ? '+' : ''
    segments.push({ text: ` ${sign}${change.toFixed(2)}%`, color: changeColor })
  }
  return segments
}

function drawCenteredTextSegments(
  ctx: CanvasRenderingContext2D,
  segments: TextSegment[],
  centerX: number,
  y: number,
): void {
  ctx.font = 'bold 36px Arial'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'

  const totalWidth = segments.reduce((sum, s) => sum + ctx.measureText(s.text).width, 0)
  let cursorX = centerX - totalWidth / 2

  for (const seg of segments) {
    ctx.fillStyle = seg.color
    ctx.fillText(seg.text, cursorX, y)
    cursorX += ctx.measureText(seg.text).width
  }
  ctx.fillStyle = '#111827'
}

async function drawCryptoIcon(
  ctx: CanvasRenderingContext2D,
  currency: CalculatorCurrency,
  x: number, y: number, size: number,
  basePath: string,
): Promise<void> {
  if (isFiatCurrency(currency)) return
  await new Promise<void>((resolve) => {
    const img = new Image()
    img.src = `${basePath}/${currency.symbol.toLowerCase()}.svg`
    img.onload = () => { ctx.drawImage(img, x, y, size, size); resolve() }
    img.onerror = () => resolve()
  })
}

// ── Background: white card with thick black rounded border ────────────────────

function drawDynamicBackground(ctx: CanvasRenderingContext2D, W: number, H: number): void {
  // White fill
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, W, H)

  // Outer frame border
  ctx.save()
  roundedRect(ctx, BORDER_INSET, BORDER_INSET, W - BORDER_INSET * 2, H - BORDER_INSET * 2, BORDER_RADIUS)
  ctx.strokeStyle = '#111111'
  ctx.lineWidth   = BORDER_WIDTH
  ctx.stroke()
  ctx.restore()
}

// ── Main draw — uses same Y positions as static canvas ───────────────────────

async function drawDynamicCalculatorCanvas(
  ctx: CanvasRenderingContext2D,
  data: CalculatorSnapshotData,
  W: number,
  H: number,
  options: CalculatorDynamicCanvasOptions = {},
): Promise<void> {
  const symbolSize          = options.symbolSize ?? DEFAULT_SYMBOL_SIZE
  const cryptoIconBasePath  = options.cryptoIconBasePath ?? '/assets/icons/crypto'
  const centerX             = Math.floor(W / 2)
  const labelRightX         = centerX + LABEL_RIGHT_OFFSET
  const localeOpts: Intl.NumberFormatOptions = { maximumFractionDigits: 6 }

  drawDynamicBackground(ctx, W, H)

  // ── Date (overlaps top border) ───────────────────────────────────────────
  ctx.font         = 'normal 26px Arial'
  ctx.fillStyle    = '#ffffff'
  ctx.textAlign    = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(formatDisplayDate(), 557, DATE_Y)

  // ── Row labels ───────────────────────────────────────────────────────────
  ctx.font         = 'bold 36px Arial'
  ctx.fillStyle    = '#111827'
  ctx.textAlign    = 'right'
  ctx.textBaseline = 'top'
  ctx.fillText('Convert From:', labelRightX, FROM_LABEL_Y)
  ctx.fillText('Convert Into:', labelRightX, TO_LABEL_Y)

  // ── Currency row values ──────────────────────────────────────────────────
  ctx.textAlign = 'left'
  ctx.fillStyle = '#111827'
  ctx.fillText(
    formatCurrencyRowLabel(data.from),
    getCurrencyRowLabelLeft(data.from, centerX, symbolSize),
    FROM_LABEL_Y,
  )
  ctx.fillText(
    formatCurrencyRowLabel(data.to),
    getCurrencyRowLabelLeft(data.to, centerX, symbolSize),
    TO_LABEL_Y,
  )

  // ── Crypto icons ─────────────────────────────────────────────────────────
  const iconX = centerX + CRYPTO_ICON_LEFT_OFFSET
  await drawCryptoIcon(ctx, data.from, iconX, FROM_LABEL_Y - 7, symbolSize, cryptoIconBasePath)
  await drawCryptoIcon(ctx, data.to,   iconX, TO_LABEL_Y   - 7, symbolSize, cryptoIconBasePath)

  // ── Rate line (with coloured change segment) ─────────────────────────────
  drawCenteredTextSegments(ctx, buildRateLineSegments(data), centerX, RATE_LINE_Y)

  // ── Conversion amount ────────────────────────────────────────────────────
  const amountFormatted = parseFloat(String(data.amount)).toLocaleString('en-US', localeOpts)
  const conversion = `${amountFormatted} ${formatCurrencyRowLabel(data.from)} ≈ ${data.solution.amount} ${formatCurrencyRowLabel(data.to)}`
  ctx.textAlign    = 'center'
  ctx.textBaseline = 'top'
  ctx.fillStyle    = '#111827'
  ctx.fillText(conversion, centerX, AMOUNT_Y)
}

// ── Canvas setup ──────────────────────────────────────────────────────────────

function prepareCanvas(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  devicePixelRatio: number,
): CanvasRenderingContext2D {
  canvas.width  = Math.round(width  * devicePixelRatio)
  canvas.height = Math.round(height * devicePixelRatio)

  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Could not get canvas context')

  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
  return ctx
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Mounts the dynamic canvas onto an existing <canvas> element.
 * Intentionally does NOT set canvas.style.width/height so the surrounding
 * CSS (max-width: 100%; max-height: 100%) controls the display size in the
 * preview container.
 */
export async function mountCalculatorDynamicCanvas(
  canvas: HTMLCanvasElement,
  data: CalculatorSnapshotData,
  options: CalculatorDynamicCanvasOptions = {},
): Promise<void> {
  const snapshot = enrichData(data)
  const width  = options.width  ?? DEFAULT_WIDTH
  const height = options.height ?? DEFAULT_HEIGHT
  const dpr = options.devicePixelRatio ?? (typeof window !== 'undefined' ? window.devicePixelRatio : 1)
  const ctx = prepareCanvas(canvas, width, height, dpr)
  // Do NOT set inline canvas.style.width / canvas.style.height here —
  // leaving them unset lets the scoped CSS (max-width / max-height) scale
  // the canvas element correctly inside the preview container.
  await drawDynamicCalculatorCanvas(ctx, snapshot, width, height, options)
}

/**
 * Renders the dynamic canvas off-screen and returns it for capture/export.
 * Sets explicit inline dimensions so the exported canvas has the correct size.
 */
export async function captureCalculatorDynamicCanvas(
  data: CalculatorSnapshotData,
  options: CalculatorDynamicCanvasOptions = {},
): Promise<HTMLCanvasElement> {
  const width  = options.width  ?? DEFAULT_WIDTH
  const height = options.height ?? DEFAULT_HEIGHT
  const canvas = document.createElement('canvas')
  canvas.style.width  = `${width}px`
  canvas.style.height = `${height}px`
  await mountCalculatorDynamicCanvas(canvas, data, options)
  return canvas
}
