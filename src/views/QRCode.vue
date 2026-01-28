<template>
  <div class="view qrcode-view">
    <h1 class="view-name">QR Code</h1>
    <p class="view-desc">Encode text, add a center logo from an SVG file, and export as SVG or PNG.</p>

    <div class="qrcode-layout">
      <div class="panel options-panel">
        <h2 class="panel-title">Options</h2>
        <div class="field">
          <label for="qr-text">Content (text or URL)</label>
          <textarea
            id="qr-text"
            v-model="text"
            rows="3"
            placeholder="Enter text or URL to encode"
            class="input"
          />
        </div>
        <div class="field">
          <label>Center logo (optional SVG)</label>
          <div class="file-row">
            <input
              ref="fileInput"
              type="file"
              accept=".svg,image/svg+xml"
              class="hidden"
              @change="onSvgFileSelected"
            />
            <button type="button" class="btn btn-secondary" @click="fileInput?.click()">
              {{ centerSvgFilename || 'Choose SVG file' }}
            </button>
            <button
              v-if="centerSvgDataUrl"
              type="button"
              class="btn btn-ghost"
              title="Remove logo"
              @click="clearCenterSvg"
            >
              Clear
            </button>
          </div>
        </div>
        <div class="field">
          <label for="quality">Error correction (quality)</label>
          <select id="quality" v-model="quality" class="input">
            <option value="L">L — Low (~7%)</option>
            <option value="M">M — Medium (~15%)</option>
            <option value="Q">Q — Quartile (~25%)</option>
            <option value="H">H — High (~30%)</option>
          </select>
        </div>
        <div class="field">
          <label for="module-size">Size (px)</label>
          <div class="range-row">
            <input
              id="module-size"
              v-model.number="moduleSize"
              type="range"
              min="64"
              max="512"
              step="16"
              class="range"
            />
            <span class="range-value">{{ moduleSize }}px</span>
          </div>
        </div>
      </div>

      <div class="panel preview-panel">
        <h2 class="panel-title">Preview</h2>
        <div class="preview-wrap" :class="{ empty: !previewDataUrl }">
          <img v-if="previewDataUrl" :src="previewDataUrl" alt="QR preview" class="preview-img" />
          <p v-else class="preview-placeholder">Enter content to generate QR code</p>
        </div>
        <div class="export-row">
          <button
            type="button"
            class="btn btn-primary"
            :disabled="!canExport"
            @click="exportSvg"
          >
            Export SVG
          </button>
          <button
            type="button"
            class="btn btn-primary"
            :disabled="!canExport"
            @click="exportPng"
          >
            Export PNG
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import QRCodeLib from 'qrcode'
import { generateQRCodeSvgFilename, generateQRCodePngFilename } from '@/lib/cores/exportStandard/qrCode.filename.standAlone'

function useDebounce<T>(fn: () => T, ms: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  return () => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      timeoutId = null
      fn()
    }, ms)
  }
}

defineOptions({ name: 'QRCode' })

const text = ref('')
const centerSvgFile = ref<File | null>(null)
const centerSvgFilename = ref('')
const centerSvgDataUrl = ref('')
const centerSvgRaw = ref('')
const quality = ref<'L' | 'M' | 'Q' | 'H'>('M')
const moduleSize = ref(256)
const fileInput = ref<HTMLInputElement | null>(null)
const previewDataUrl = ref('')
const previewSvg = ref('')

const canExport = computed(() => Boolean(previewDataUrl.value && text.value.trim()))

function svgToDataUrl(svgString: string): string {
  const encoded = btoa(unescape(encodeURIComponent(svgString)))
  return `data:image/svg+xml;base64,${encoded}`
}

function onSvgFileSelected(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    const result = reader.result as string
    centerSvgRaw.value = result
    centerSvgDataUrl.value = result.startsWith('data:') ? result : svgToDataUrl(result)
    centerSvgFile.value = file
    centerSvgFilename.value = file.name
  }
  reader.readAsText(file)
  input.value = ''
}

function clearCenterSvg() {
  centerSvgFile.value = null
  centerSvgFilename.value = ''
  centerSvgDataUrl.value = ''
  centerSvgRaw.value = ''
}

const qrOptions = computed(() => ({
  // Force high error correction when a center logo is present
  errorCorrectionLevel: centerSvgDataUrl.value ? 'H' : quality.value,
  margin: 2,
  width: moduleSize.value,
  color: { dark: '#000000', light: '#ffffff' }
}))

function injectCenterLogoSvg(svgString: string, logoDataUrl: string): string {
  const viewBoxMatch = svgString.match(/viewBox="([^"]+)"/)
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 100 100'
  const parts = viewBox.split(/\s+/).map(Number)
  const vbWidth = parts[2] || 100
  const vbHeight = parts[3] || 100
  // Use 20% of QR size for the logo (safe for scanning with H error correction)
  const logoSize = Math.min(vbWidth, vbHeight) * 0.20
  const cx = vbWidth / 2
  const cy = vbHeight / 2
  // White circle background to clear QR modules behind logo (minimal padding)
  const bgCircle = `<circle cx="${cx}" cy="${cy}" r="${logoSize / 2 + 0.5}" fill="#ffffff"/>`
  // Embed as a nested SVG for better scaling
  const nestedSvg = `<svg x="${cx - logoSize / 2}" y="${cy - logoSize / 2}" width="${logoSize}" height="${logoSize}" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet"><image href="${logoDataUrl.replace(/"/g, '&quot;')}" x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid meet"/></svg>`
  return svgString.replace('</svg>', `${bgCircle}${nestedSvg}</svg>`)
}

async function generatePreview() {
  const content = text.value.trim()
  if (!content) {
    previewDataUrl.value = ''
    previewSvg.value = ''
    return
  }
  try {
    const opts = qrOptions.value
    // Generate SVG for export
    previewSvg.value = await QRCodeLib.toString(content, { ...opts, type: 'svg' })
    // Generate PNG for preview display
    const dataUrl = await QRCodeLib.toDataURL(content, { ...opts, type: 'image/png' })
    
    if (!centerSvgDataUrl.value) {
      previewDataUrl.value = dataUrl
      return
    }
    // Add center logo to PNG preview
    const img = new Image()
    img.crossOrigin = 'anonymous'
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = reject
      img.src = dataUrl
    })
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img, 0, 0)
    const logoImg = new Image()
    logoImg.crossOrigin = 'anonymous'
    await new Promise<void>((resolve, reject) => {
      logoImg.onload = () => resolve()
      logoImg.onerror = reject
      logoImg.src = centerSvgDataUrl.value
    })
    const logoSize = Math.min(canvas.width, canvas.height) * 0.20
    const lx = (canvas.width - logoSize) / 2
    const ly = (canvas.height - logoSize) / 2
    ctx.drawImage(logoImg, lx, ly, logoSize, logoSize)
    previewDataUrl.value = canvas.toDataURL('image/png')
  } catch (err) {
    console.error('QR generate failed', err)
    previewDataUrl.value = ''
    previewSvg.value = ''
  }
}

const debouncedGenerate = useDebounce(generatePreview, 200)

watch(text, debouncedGenerate, { immediate: true })
watch([quality, moduleSize, centerSvgDataUrl], () => {
  if (text.value.trim()) generatePreview()
})

function exportSvg() {
  if (!previewSvg.value || !text.value.trim()) return
  let svg = previewSvg.value
  if (centerSvgDataUrl.value) svg = injectCenterLogoSvg(svg, centerSvgDataUrl.value)
  const blob = new Blob([svg], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = generateQRCodeSvgFilename(text.value.trim(), centerSvgFilename.value || undefined)
  a.click()
  URL.revokeObjectURL(url)
}

async function exportPng() {
  const content = text.value.trim()
  if (!content) return
  try {
    const opts = qrOptions.value
    let dataUrl = await QRCodeLib.toDataURL(content, { ...opts, type: 'image/png' })
    if (centerSvgDataUrl.value) {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = reject
        img.src = dataUrl
      })
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      const logoImg = new Image()
      logoImg.crossOrigin = 'anonymous'
      await new Promise<void>((resolve, reject) => {
        logoImg.onload = () => resolve()
        logoImg.onerror = reject
        logoImg.src = centerSvgDataUrl.value
      })
      const logoSize = Math.min(canvas.width, canvas.height) * 0.20
      const lx = (canvas.width - logoSize) / 2
      const ly = (canvas.height - logoSize) / 2
      ctx.drawImage(logoImg, lx, ly, logoSize, logoSize)
      dataUrl = canvas.toDataURL('image/png')
    }
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = generateQRCodePngFilename(text.value.trim(), centerSvgFilename.value || undefined)
    a.click()
  } catch (err) {
    console.error('Export PNG failed', err)
  }
}
</script>

<style scoped>
.qrcode-view {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.view-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.view-desc {
  color: #6b7280;
  margin-bottom: 1.5rem;
  font-size: 0.9375rem;
}

.qrcode-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .qrcode-layout {
    grid-template-columns: 1fr;
  }
}

.panel {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.25rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.panel-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.field {
  margin-bottom: 1rem;
}

.field label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}

.input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

textarea.input {
  resize: vertical;
  min-height: 4rem;
}

.file-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.hidden {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
}

.range-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.range {
  flex: 1;
  max-width: 12rem;
}

.range-value {
  font-size: 0.875rem;
  font-weight: 500;
  min-width: 2.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: #3b82f6;
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.btn-ghost {
  background: transparent;
  color: #6b7280;
}

.btn-ghost:hover {
  background: #f3f4f6;
}

.preview-wrap {
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fafb;
  border: 1px dashed #d1d5db;
  border-radius: 0.5rem;
  padding: 1rem;
}

.preview-wrap.empty {
  border-color: #e5e7eb;
}

.preview-img {
  max-width: 100%;
  max-height: 280px;
  object-fit: contain;
}

.preview-placeholder {
  color: #9ca3af;
  font-size: 0.875rem;
  margin: 0;
}

.export-row {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}
</style>
