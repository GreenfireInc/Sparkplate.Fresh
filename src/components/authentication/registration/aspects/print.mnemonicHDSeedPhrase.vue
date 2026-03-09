<template>
  <canvas ref="canvasEl" :width="WIDTH" :height="HEIGHT" style="display:none" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  phrase: string
}

const props = defineProps<Props>()

const WIDTH  = 1056
const HEIGHT = 816
const canvasEl = ref<HTMLCanvasElement | null>(null)

function getCtx(): CanvasRenderingContext2D {
  const ctx = canvasEl.value!.getContext('2d')!
  return ctx
}

function drawCanvas() {
  const ctx = getCtx()
  const words = props.phrase.trim().split(/\s+/)

  // ── Background ─────────────────────────────────────────────────────────────
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  // ── Border ─────────────────────────────────────────────────────────────────
  ctx.strokeStyle = '#2563eb'
  ctx.lineWidth = 6
  ctx.strokeRect(18, 18, WIDTH - 36, HEIGHT - 36)

  // ── Header bar ─────────────────────────────────────────────────────────────
  ctx.fillStyle = '#2563eb'
  ctx.fillRect(18, 18, WIDTH - 36, 80)

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 28px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('BIP39 Recovery Phrase — Keep This Safe', WIDTH / 2, 58)

  // ── Warning strip ──────────────────────────────────────────────────────────
  ctx.fillStyle = '#fffbeb'
  ctx.fillRect(18, 98, WIDTH - 36, 48)
  ctx.strokeStyle = '#fde68a'
  ctx.lineWidth = 1
  ctx.strokeRect(18, 98, WIDTH - 36, 48)

  ctx.fillStyle = '#92400e'
  ctx.font = '15px Arial'
  ctx.textAlign = 'center'
  ctx.fillText(
    '⚠  Never share this phrase with anyone. Store it offline in a secure location.',
    WIDTH / 2,
    122
  )

  // ── Word grid ──────────────────────────────────────────────────────────────
  const cols     = 6
  const rows     = Math.ceil(words.length / cols)
  const cellW    = (WIDTH - 96) / cols
  const gridTop  = 166
  const cellH    = 84

  for (let i = 0; i < words.length; i++) {
    const col = i % cols
    const row = Math.floor(i / cols)
    const x   = 48 + col * cellW
    const y   = gridTop + row * cellH

    // Cell background
    ctx.fillStyle = '#f9fafb'
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.roundRect(x, y, cellW - 12, cellH - 12, 6)
    ctx.fill()
    ctx.stroke()

    // Word number
    ctx.fillStyle = '#9ca3af'
    ctx.font = '13px Arial'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.fillText(String(i + 1), x + 10, y + 8)

    // Word
    ctx.fillStyle = '#111827'
    ctx.font = 'bold 20px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(words[i], x + (cellW - 12) / 2, y + (cellH - 12) / 2 + 6)
  }

  // ── GPG note area (label only — user writes in fingerprint manually) ───────
  const noteY = gridTop + rows * cellH + 14
  ctx.fillStyle = '#f3f4f6'
  ctx.strokeStyle = '#e5e7eb'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.roundRect(48, noteY, WIDTH - 96, 56, 6)
  ctx.fill()
  ctx.stroke()

  ctx.fillStyle = '#6b7280'
  ctx.font = '13px Arial'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillText('BIP32 Root GPG Fingerprint:', 68, noteY + 18)

  // Dotted line for handwritten fingerprint
  ctx.strokeStyle = '#d1d5db'
  ctx.lineWidth = 1
  ctx.setLineDash([4, 4])
  ctx.beginPath()
  ctx.moveTo(68, noteY + 40)
  ctx.lineTo(WIDTH - 68, noteY + 40)
  ctx.stroke()
  ctx.setLineDash([])

  // ── Date + footer ──────────────────────────────────────────────────────────
  const footerY = HEIGHT - 36
  ctx.fillStyle = '#9ca3af'
  ctx.font = '13px Arial'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillText(`Printed: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 48, footerY)

  ctx.textAlign = 'right'
  ctx.fillText(`${words.length}-word BIP39 mnemonic`, WIDTH - 48, footerY)
}

function printCanvas() {
  const dataUrl = canvasEl.value!.toDataURL('image/png')

  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Recovery Phrase</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #fff; display: flex; justify-content: center; padding: 16px; }
    img { max-width: 100%; height: auto; }
    @media print {
      body { padding: 0; }
      img { width: 100%; page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <img src="${dataUrl}" onload="window.print()" />
</body>
</html>`

  const blob = new Blob([html], { type: 'text/html' })
  const blobUrl = URL.createObjectURL(blob)

  const win = window.open(blobUrl, '_blank', 'width=1100,height=860')
  if (!win) {
    // Fallback: download the PNG directly
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = 'recovery-phrase.png'
    a.click()
  }

  setTimeout(() => URL.revokeObjectURL(blobUrl), 30_000)
}

function print() {
  drawCanvas()
  printCanvas()
}

defineExpose({ print })
</script>
