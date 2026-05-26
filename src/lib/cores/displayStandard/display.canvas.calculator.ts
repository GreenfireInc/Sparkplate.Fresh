export interface CalculatorCurrency {
  symbol: string
  name: string
  id?: string
}

export interface CalculatorSnapshotData {
  from: CalculatorCurrency
  to: CalculatorCurrency
  amount: number
  solution: {
    amount: string
    rate: string
  }
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
const DEFAULT_BACKGROUND_PATH = '/assets/calculator/calculatorCanvasBackground.png'
const DEFAULT_CRYPTO_ICON_BASE = '/assets/icons/crypto'

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
  canvasCenter: number
): Promise<void> {
  const localeStringOpts: Intl.NumberFormatOptions = { maximumFractionDigits: 6 }
  const { from, to, amount, solution } = data

  ctx.font = 'normal 26px Arial'
  ctx.fillStyle = '#111827'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(formatDisplayDate(), 557, 80)

  ctx.font = 'bold 36px Arial'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'top'
  ctx.fillText('Convert From:', canvasCenter + 40, 260)
  ctx.fillText('Convert Into:', canvasCenter + 40, 360)

  ctx.textAlign = 'left'
  const symbolTextLeft = canvasCenter + 105
  ctx.fillText(from.symbol, symbolTextLeft, 260)
  ctx.fillText(to.symbol, symbolTextLeft, 360)

  ctx.textAlign = 'center'
  const rate = `1 ${from.symbol} ≈ ${solution.rate} ${to.symbol}`
  ctx.fillText(rate, canvasCenter, 620)

  const amountFormatted = parseFloat(String(amount)).toLocaleString('en-US', localeStringOpts)
  const conversion = `${amountFormatted} ${from.symbol} ≈ ${solution.amount} ${to.symbol}`
  ctx.fillText(conversion, canvasCenter, 740)
}

async function drawSymbols(
  ctx: CanvasRenderingContext2D,
  data: CalculatorSnapshotData,
  canvasCenter: number,
  symbolSize: number,
  cryptoIconBasePath: string
): Promise<void> {
  const { from, to } = data
  const posX = canvasCenter + 50

  await drawImageOptional(
    ctx,
    `${cryptoIconBasePath}/${from.symbol.toLowerCase()}.svg`,
    posX,
    260 - 7,
    symbolSize,
    symbolSize
  )

  await drawImageOptional(
    ctx,
    `${cryptoIconBasePath}/${to.symbol.toLowerCase()}.svg`,
    posX,
    360 - 7,
    symbolSize,
    symbolSize
  )
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
  await drawText(ctx, data, canvasCenter)
  await drawSymbols(ctx, data, canvasCenter, symbolSize, cryptoIconBasePath)
}

export async function captureCalculatorCanvas(
  data: CalculatorSnapshotData,
  options: CalculatorCanvasOptions = {}
): Promise<HTMLCanvasElement> {
  const width = options.width ?? DEFAULT_WIDTH
  const height = options.height ?? DEFAULT_HEIGHT

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Could not get canvas context')
  }

  await drawCalculatorCanvas(ctx, data, options)
  return canvas
}
