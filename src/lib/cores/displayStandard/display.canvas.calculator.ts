import { getFiatCurrencySymbol, fiatByIso } from '@/lib/cores/fiatStandard'

export interface CalculatorCurrency {
  symbol: string
  name: string
  id?: string
  /** Fiat currency glyph from fiatStandard; omitted for crypto. */
  currencySymbol?: string
  /** Fiat flag emoji from fiatStandard; omitted for crypto. */
  flag?: string
}

export interface CalculatorSnapshotData {
  from: CalculatorCurrency
  to: CalculatorCurrency
  amount: number
  solution: {
    amount: string
    rate: string
  }
  /** 24h % change for the From crypto only (CoinGecko); omitted for fiat From or when unavailable. */
  fromChange24h?: number | null
}

export interface CalculatorCanvasOptions {
  width?: number
  height?: number
  symbolSize?: number
  backgroundPath?: string
  cryptoIconBasePath?: string
}

const DEFAULT_WIDTH = 768
const DEFAULT_HEIGHT = 1024
const DEFAULT_SYMBOL_SIZE = 45
const DEFAULT_BACKGROUND_PATH = '/assets/canvases/calculationBackground.png'
const DEFAULT_CRYPTO_ICON_BASE = '/assets/icons/crypto'
/** Right edge of "Convert From:/Into:" labels (textAlign right). */
const LABEL_RIGHT_OFFSET = 40
/** Gap between label end and fiat currency text, or between crypto icon and ticker. */
const LABEL_TO_CONTENT_GAP = 10
/** Left edge of crypto icon beside the row labels. */
const CRYPTO_ICON_LEFT_OFFSET = 50
const PRICE_CHANGE_GREEN = '#16a34a'
const PRICE_CHANGE_RED = '#dc2626'

function isFiatCurrency(currency: CalculatorCurrency): boolean {
  return currency.id == null
}

function resolveFiatGlyph(currency: CalculatorCurrency): string {
  return currency.currencySymbol ?? getFiatCurrencySymbol(currency.symbol)
}

function resolveFiatFlag(currency: CalculatorCurrency): string {
  return currency.flag ?? fiatByIso[currency.symbol.toUpperCase()]?.flag ?? ''
}

/** e.g. "(€) EUR 🇪🇺" for fiat, "BTC" for crypto. */
function formatCurrencyRowLabel(currency: CalculatorCurrency): string {
  if (!isFiatCurrency(currency)) return currency.symbol
  const glyph = resolveFiatGlyph(currency)
  const flag = resolveFiatFlag(currency)
  return flag ? `(${glyph}) ${currency.symbol} ${flag}` : `(${glyph}) ${currency.symbol}`
}

/** Split row label so 24h change can sit immediately after the flag. */
function splitCurrencyRowLabel(currency: CalculatorCurrency): { beforeFlag: string; flag: string } {
  if (!isFiatCurrency(currency)) {
    return { beforeFlag: currency.symbol, flag: '' }
  }
  const glyph = resolveFiatGlyph(currency)
  const flag = resolveFiatFlag(currency)
  return {
    beforeFlag: `(${glyph}) ${currency.symbol}`,
    flag: flag ? ` ${flag}` : '',
  }
}

function getCurrencyRowLabelLeft(
  currency: CalculatorCurrency,
  canvasCenter: number,
  symbolSize: number
): number {
  const labelRightX = canvasCenter + LABEL_RIGHT_OFFSET
  if (isFiatCurrency(currency)) {
    return labelRightX + LABEL_TO_CONTENT_GAP
  }
  return canvasCenter + CRYPTO_ICON_LEFT_OFFSET + symbolSize + LABEL_TO_CONTENT_GAP
}

function formatPriceChange24h(change: number): string {
  const sign = change > 0 ? '+' : ''
  return `${sign}${change.toFixed(2)}%`
}

interface CanvasTextSegment {
  text: string
  color: string
}

const RATE_LINE_Y = 620

function buildRateLineSegments(data: CalculatorSnapshotData): CanvasTextSegment[] {
  const { from, to, solution } = data
  const fromParts = splitCurrencyRowLabel(from)
  const toParts = splitCurrencyRowLabel(to)
  const change = data.fromChange24h
  const showChange = change != null && !isFiatCurrency(from)
  const changeColor = showChange ? (change >= 0 ? PRICE_CHANGE_GREEN : PRICE_CHANGE_RED) : '#111827'

  const segments: CanvasTextSegment[] = [{ text: `1 ${fromParts.beforeFlag}`, color: '#111827' }]

  if (fromParts.flag) {
    segments.push({ text: fromParts.flag, color: '#111827' })
  }

  segments.push({ text: ' ≈ ', color: '#111827' })
  segments.push({ text: solution.rate, color: changeColor })
  segments.push({ text: ` ${toParts.beforeFlag}`, color: '#111827' })

  if (toParts.flag) {
    segments.push({ text: toParts.flag, color: '#111827' })
  }

  if (showChange) {
    segments.push({ text: ` ${formatPriceChange24h(change)}`, color: changeColor })
  }

  return segments
}

function drawCenteredTextSegments(
  ctx: CanvasRenderingContext2D,
  segments: CanvasTextSegment[],
  centerX: number,
  y: number
): void {
  ctx.font = 'bold 36px Arial'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'

  const totalWidth = segments.reduce((sum, segment) => sum + ctx.measureText(segment.text).width, 0)
  let cursorX = centerX - totalWidth / 2

  for (const segment of segments) {
    ctx.fillStyle = segment.color
    ctx.fillText(segment.text, cursorX, y)
    cursorX += ctx.measureText(segment.text).width
  }

  ctx.fillStyle = '#111827'
}

function formatDisplayDate(date: Date = new Date()): string {
  const day = date.getDate()
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
          ? 'rd'
          : 'th'

  const month = date.toLocaleDateString('en-US', { month: 'long' })
  const year = date.getFullYear()
  return `${month} ${day}${suffix} ${year}`
}

function drawImage(
  ctx: CanvasRenderingContext2D,
  path: string,
  x: number,
  y: number,
  width: number,
  height: number
): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = path
    img.onload = () => {
      ctx.drawImage(img, x, y, width, height)
      resolve()
    }
    img.onerror = () => {
      reject(new Error(`Error loading ${path}`))
    }
  })
}

function drawImageOptional(
  ctx: CanvasRenderingContext2D,
  path: string,
  x: number,
  y: number,
  width: number,
  height: number
): Promise<void> {
  return drawImage(ctx, path, x, y, width, height).catch(() => undefined)
}

function drawFallbackBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  const gradient = ctx.createLinearGradient(0, 0, 0, height)
  gradient.addColorStop(0, '#f8fafc')
  gradient.addColorStop(1, '#e2e8f0')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(32, 32, width - 64, height - 64)
}

async function drawBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  backgroundPath: string
): Promise<void> {
  try {
    await drawImage(ctx, backgroundPath, 0, 0, width, height)
  } catch {
    drawFallbackBackground(ctx, width, height)
  }
}

async function drawText(
  ctx: CanvasRenderingContext2D,
  data: CalculatorSnapshotData,
  canvasCenter: number,
  symbolSize: number
): Promise<void> {
  const localeStringOpts: Intl.NumberFormatOptions = { maximumFractionDigits: 6 }
  const { from, to, amount, solution } = data
  const labelRightX = canvasCenter + LABEL_RIGHT_OFFSET

  ctx.font = 'normal 26px Arial'
  ctx.fillStyle = '#111827'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(formatDisplayDate(), 557, 80)

  ctx.font = 'bold 36px Arial'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'top'
  ctx.fillText('Convert From:', labelRightX, 260)
  ctx.fillText('Convert Into:', labelRightX, 360)

  ctx.textAlign = 'left'
  ctx.fillStyle = '#111827'
  ctx.fillText(formatCurrencyRowLabel(from), getCurrencyRowLabelLeft(from, canvasCenter, symbolSize), 260)
  ctx.fillText(formatCurrencyRowLabel(to), getCurrencyRowLabelLeft(to, canvasCenter, symbolSize), 360)

  drawCenteredTextSegments(ctx, buildRateLineSegments(data), canvasCenter, RATE_LINE_Y)

  const amountFormatted = parseFloat(String(amount)).toLocaleString('en-US', localeStringOpts)
  const conversion = `${amountFormatted} ${formatCurrencyRowLabel(from)} ≈ ${solution.amount} ${formatCurrencyRowLabel(to)}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.fillStyle = '#111827'
  ctx.fillText(conversion, canvasCenter, 740)
}

async function drawCurrencySymbol(
  ctx: CanvasRenderingContext2D,
  currency: CalculatorCurrency,
  x: number,
  y: number,
  size: number,
  cryptoIconBasePath: string
): Promise<void> {
  if (isFiatCurrency(currency)) {
    return
  }

  await drawImageOptional(
    ctx,
    `${cryptoIconBasePath}/${currency.symbol.toLowerCase()}.svg`,
    x,
    y,
    size,
    size
  )
}

async function drawSymbols(
  ctx: CanvasRenderingContext2D,
  data: CalculatorSnapshotData,
  canvasCenter: number,
  symbolSize: number,
  cryptoIconBasePath: string
): Promise<void> {
  const { from, to } = data
  const posX = canvasCenter + CRYPTO_ICON_LEFT_OFFSET

  await drawCurrencySymbol(ctx, from, posX, 260 - 7, symbolSize, cryptoIconBasePath)
  await drawCurrencySymbol(ctx, to, posX, 360 - 7, symbolSize, cryptoIconBasePath)
}

export async function drawCalculatorCanvas(
  ctx: CanvasRenderingContext2D,
  data: CalculatorSnapshotData,
  options: CalculatorCanvasOptions = {}
): Promise<void> {
  const width = options.width ?? DEFAULT_WIDTH
  const height = options.height ?? DEFAULT_HEIGHT
  const symbolSize = options.symbolSize ?? DEFAULT_SYMBOL_SIZE
  const backgroundPath = options.backgroundPath ?? DEFAULT_BACKGROUND_PATH
  const cryptoIconBasePath = options.cryptoIconBasePath ?? DEFAULT_CRYPTO_ICON_BASE
  const canvasCenter = Math.floor(width / 2)

  await drawBackground(ctx, width, height, backgroundPath)
  await drawText(ctx, data, canvasCenter, symbolSize)
  await drawSymbols(ctx, data, canvasCenter, symbolSize, cryptoIconBasePath)
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

export async function captureCalculatorCanvas(
  data: CalculatorSnapshotData,
  options: CalculatorCanvasOptions = {}
): Promise<HTMLCanvasElement> {
  const snapshot = enrichSnapshotData(data)
  const width = options.width ?? DEFAULT_WIDTH
  const height = options.height ?? DEFAULT_HEIGHT

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Could not get canvas context')
  }

  await drawCalculatorCanvas(ctx, snapshot, options)
  return canvas
}
