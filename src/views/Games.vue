<template>
  <div class="games-view">
    <header class="games-view__header">
      <h1 class="games-view__title">
        <Gamepad2 :size="22" class="games-view__title-icon" aria-hidden="true" />
        Classic games
      </h1>
      <p class="games-view__subtitle">
        Arcade demos fill the panel below — resize the window to scale the playfield; no page scroll.
      </p>
    </header>

    <Separator class="games-view__separator" />

    <section class="games-view__section" aria-label="Games">
      <TabsRoot v-model="activeGame" class="games-tabs">
        <TabsList class="games-tabs__list" aria-label="Select game">
          <TabsTrigger
            v-for="game in games"
            :key="game.id"
            :value="game.id"
            class="games-tabs__trigger"
          >
            <span class="games-tabs__emoji" aria-hidden="true">{{ game.icon }}</span>
            {{ game.name }}
          </TabsTrigger>
        </TabsList>

        <div ref="panelShellRef" class="games-panel-shell">
          <TabsContent value="pong" class="games-tabs__panel">
            <div class="games-panel games-panel--split">
              <div ref="pongStageRef" class="games-panel__stage games-panel__stage--fill">
                <canvas
                  ref="pongCanvas"
                  class="games-canvas"
                  :width="pongSize.w"
                  :height="pongSize.h"
                  @mousemove="updatePongPaddle"
                />
              </div>
              <aside class="games-panel__rail">
                <div class="games-panel__heading">
                  <h2 class="games-panel__h2">Pong</h2>
                  <p class="games-panel__lede">Classic two-paddle ball — first to 10 wins.</p>
                </div>
                <div class="games-controls">
                  <button type="button" class="games-btn games-btn--start" @click="startPong" :disabled="pongRunning">
                    {{ pongRunning ? 'Playing…' : 'Start' }}
                  </button>
                  <button
                    v-if="pongRunning"
                    type="button"
                    class="games-btn games-btn--pause"
                    @click="pausePong"
                  >
                    {{ pongPaused ? 'Resume' : 'Pause' }}
                  </button>
                  <button type="button" class="games-btn games-btn--reset" @click="resetPong">Reset</button>
                </div>
                <div class="games-scoreboard">
                  <div class="games-stat">
                    <span class="games-stat__label">You</span>
                    <span class="games-stat__value">{{ pongScore.player }}</span>
                  </div>
                  <div class="games-stat">
                    <span class="games-stat__label">CPU</span>
                    <span class="games-stat__value">{{ pongScore.computer }}</span>
                  </div>
                </div>
                <p class="games-hint">Move the mouse over the court to steer your paddle.</p>
              </aside>
            </div>
          </TabsContent>

          <TabsContent value="tictactoe" class="games-tabs__panel">
            <div class="games-panel games-panel--split">
              <div class="games-panel__stage games-panel__stage--fill games-panel__stage--ttt">
                <div class="games-ttt-board">
                  <button
                    v-for="(cell, index) in tictactoeBoard"
                    :key="index"
                    type="button"
                    class="games-ttt-cell"
                    :class="{ 'games-ttt-cell--disabled': cell !== '' || tictactoeGameOver }"
                    :disabled="cell !== '' || tictactoeGameOver"
                    @click="makeTictactoeMove(index)"
                  >
                    {{ cell }}
                  </button>
                </div>
              </div>
              <aside class="games-panel__rail">
                <div class="games-panel__heading">
                  <h2 class="games-panel__h2">Tic tac toe</h2>
                  <p class="games-panel__lede">Three in a row — optional vs computer.</p>
                </div>
                <div class="games-controls">
                  <button type="button" class="games-btn games-btn--reset" @click="resetTictactoe">New game</button>
                  <button type="button" class="games-btn games-btn--mode" @click="toggleTictactoeMode">
                    {{ tictactoeVsComputer ? 'vs Computer' : 'vs Human' }}
                  </button>
                </div>
                <div class="games-status">
                  <template v-if="tictactoeWinner">
                    {{ tictactoeWinner === 'tie' ? "It's a tie" : `${tictactoeWinner} wins` }}
                  </template>
                  <template v-else>Turn: {{ tictactoeCurrentPlayer }}</template>
                </div>
                <div class="games-scoreboard games-scoreboard--3">
                  <div class="games-stat">
                    <span class="games-stat__label">X</span>
                    <span class="games-stat__value">{{ tictactoeScore.x }}</span>
                  </div>
                  <div class="games-stat">
                    <span class="games-stat__label">O</span>
                    <span class="games-stat__value">{{ tictactoeScore.o }}</span>
                  </div>
                  <div class="games-stat">
                    <span class="games-stat__label">Ties</span>
                    <span class="games-stat__value">{{ tictactoeScore.ties }}</span>
                  </div>
                </div>
                <p class="games-hint">Tap a square; in vs Computer, O plays after you.</p>
              </aside>
            </div>
          </TabsContent>

          <TabsContent value="breakout" class="games-tabs__panel">
            <div class="games-panel games-panel--split">
              <div ref="breakoutStageRef" class="games-panel__stage games-panel__stage--fill">
                <canvas
                  ref="breakoutCanvas"
                  class="games-canvas"
                  :width="breakoutSize.w"
                  :height="breakoutSize.h"
                  @mousemove="updateBreakoutPaddle"
                />
              </div>
              <aside class="games-panel__rail">
                <div class="games-panel__heading">
                  <h2 class="games-panel__h2">Breakout</h2>
                  <p class="games-panel__lede">Clear bricks; keep the ball in play.</p>
                </div>
                <div class="games-controls">
                  <button type="button" class="games-btn games-btn--start" @click="startBreakout" :disabled="breakoutRunning">
                    {{ breakoutRunning ? 'Playing…' : 'Start' }}
                  </button>
                  <button
                    v-if="breakoutRunning"
                    type="button"
                    class="games-btn games-btn--pause"
                    @click="pauseBreakout"
                  >
                    {{ breakoutPaused ? 'Resume' : 'Pause' }}
                  </button>
                  <button type="button" class="games-btn games-btn--reset" @click="resetBreakout">Reset</button>
                </div>
                <div class="games-scoreboard games-scoreboard--3">
                  <div class="games-stat">
                    <span class="games-stat__label">Score</span>
                    <span class="games-stat__value">{{ breakoutScore }}</span>
                  </div>
                  <div class="games-stat">
                    <span class="games-stat__label">Lives</span>
                    <span class="games-stat__value">{{ breakoutLives }}</span>
                  </div>
                  <div class="games-stat">
                    <span class="games-stat__label">Level</span>
                    <span class="games-stat__value">{{ breakoutLevel }}</span>
                  </div>
                </div>
                <p class="games-hint">Mouse over the canvas to slide the paddle.</p>
              </aside>
            </div>
          </TabsContent>
        </div>
      </TabsRoot>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
} from 'radix-vue'
import { Gamepad2 } from 'lucide-vue-next'

defineOptions({ name: 'GamesPage' })

const PONG_ASPECT = 2
const BREAKOUT_ASPECT = 800 / 600

/** Default until first layout pass. */
const pongSize = ref({ w: 480, h: 240 })
const breakoutSize = ref({ w: 640, h: 480 })

const panelShellRef = ref<HTMLElement | null>(null)
const pongStageRef = ref<HTMLElement | null>(null)
const breakoutStageRef = ref<HTMLElement | null>(null)
let resizeObserver: ResizeObserver | null = null

function fitBox(outerW: number, outerH: number, aspect: number, minW: number, minH: number) {
  if (outerW <= 4 || outerH <= 4) {
    return { w: minW, h: minH }
  }
  let cw = outerW
  let ch = cw / aspect
  if (ch > outerH) {
    ch = outerH
    cw = ch * aspect
  }
  return {
    w: Math.max(minW, Math.floor(cw)),
    h: Math.max(minH, Math.floor(ch)),
  }
}

function syncPongLayout() {
  const el = pongStageRef.value
  if (!el) return
  const r = el.getBoundingClientRect()
  if (r.width < 16 || r.height < 16) return
  const next = fitBox(r.width, r.height, PONG_ASPECT, 200, 100)
  if (next.w === pongSize.value.w && next.h === pongSize.value.h) return

  pongSize.value = next
  if (pongRunning.value) {
    pongRunning.value = false
    pongPaused.value = false
    pongGame = null
  }
  void nextTick(() => {
    const c = pongCanvas.value
    if (!c) return
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, next.w, next.h)
  })
}

function syncBreakoutLayout() {
  const el = breakoutStageRef.value
  if (!el) return
  const r = el.getBoundingClientRect()
  if (r.width < 16 || r.height < 16) return
  const next = fitBox(r.width, r.height, BREAKOUT_ASPECT, 240, 180)
  if (next.w === breakoutSize.value.w && next.h === breakoutSize.value.h) return

  breakoutSize.value = next
  if (breakoutRunning.value) {
    breakoutRunning.value = false
    breakoutPaused.value = false
    breakoutGame = null
  }
  void nextTick(() => {
    const c = breakoutCanvas.value
    if (!c) return
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, next.w, next.h)
  })
}

function syncAllLayouts() {
  syncPongLayout()
  syncBreakoutLayout()
}

const activeGame = ref('pong')

const games = [
  { id: 'pong', name: 'Pong', icon: '🏓' },
  { id: 'tictactoe', name: 'Tic tac toe', icon: '❌' },
  { id: 'breakout', name: 'Breakout', icon: '🧱' },
] as const

const pongCanvas = ref<HTMLCanvasElement>()
const pongRunning = ref(false)
const pongPaused = ref(false)
const pongScore = ref({ player: 0, computer: 0 })
let pongGame: {
  ball: { x: number; y: number; dx: number; dy: number; size: number }
  playerPaddle: { x: number; y: number; width: number; height: number }
  computerPaddle: { x: number; y: number; width: number; height: number }
  mouseY: number
} | null = null

const tictactoeBoard = ref(Array(9).fill(''))
const tictactoeCurrentPlayer = ref('X')
const tictactoeWinner = ref('')
const tictactoeGameOver = ref(false)
const tictactoeVsComputer = ref(true)
const tictactoeScore = ref({ x: 0, o: 0, ties: 0 })

const breakoutCanvas = ref<HTMLCanvasElement>()
const breakoutRunning = ref(false)
const breakoutPaused = ref(false)
const breakoutScore = ref(0)
const breakoutLives = ref(3)
const breakoutLevel = ref(1)
let breakoutGame: {
  ball: { x: number; y: number; dx: number; dy: number; size: number }
  paddle: { x: number; y: number; width: number; height: number }
  bricks: { x: number; y: number; width: number; height: number; visible: boolean; color: string }[]
  mouseX: number
} | null = null

const startPong = () => {
  if (!pongCanvas.value) return

  pongRunning.value = true
  pongPaused.value = false

  const canvas = pongCanvas.value
  const ctx = canvas.getContext('2d')!
  const w = canvas.width
  const h = canvas.height
  const ph = Math.round(h * 0.25)
  const pw = Math.max(6, Math.round(w * 0.017))
  const bs = Math.max(5, Math.round(w * 0.017))
  const baseSpeed = Math.max(2.4, (w / 480) * 4)

  const game = {
    ball: { x: w / 2, y: h / 2, dx: baseSpeed, dy: baseSpeed * 0.62, size: bs },
    playerPaddle: { x: Math.round(w * 0.02), y: h / 2 - ph / 2, width: pw, height: ph },
    computerPaddle: { x: w - Math.round(w * 0.02) - pw, y: h / 2 - ph / 2, width: pw, height: ph },
    mouseY: h / 2,
  }

  const gameLoop = () => {
    if (!pongRunning.value || pongPaused.value) return

    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    game.ball.x += game.ball.dx
    game.ball.y += game.ball.dy

    if (game.ball.y <= 0 || game.ball.y >= canvas.height - game.ball.size) {
      game.ball.dy = -game.ball.dy
    }

    const pr = game.playerPaddle
    const cr = game.computerPaddle
    if (
      game.ball.x <= pr.x + pr.width
      && game.ball.y + game.ball.size >= pr.y
      && game.ball.y <= pr.y + pr.height
    ) {
      game.ball.dx = Math.abs(game.ball.dx)
    }
    if (
      game.ball.x + game.ball.size >= cr.x
      && game.ball.y + game.ball.size >= cr.y
      && game.ball.y <= cr.y + cr.height
    ) {
      game.ball.dx = -Math.abs(game.ball.dx)
    }

    if (game.ball.x < 0) {
      pongScore.value.computer++
      game.ball.x = w / 2
      game.ball.y = h / 2
    }
    if (game.ball.x > canvas.width) {
      pongScore.value.player++
      game.ball.x = w / 2
      game.ball.y = h / 2
    }

    game.playerPaddle.y = game.mouseY - game.playerPaddle.height / 2
    game.playerPaddle.y = Math.max(0, Math.min(h - game.playerPaddle.height, game.playerPaddle.y))

    const cy = cr.y + cr.height / 2
    const step = Math.max(2, h * 0.012)
    if (cy < game.ball.y - 6) cr.y += step
    else if (cy > game.ball.y + 6) cr.y -= step
    cr.y = Math.max(0, Math.min(h - cr.height, cr.y))

    ctx.fillStyle = '#fff'
    ctx.fillRect(game.ball.x, game.ball.y, game.ball.size, game.ball.size)
    ctx.fillRect(pr.x, pr.y, pr.width, pr.height)
    ctx.fillRect(cr.x, cr.y, cr.width, cr.height)

    ctx.strokeStyle = 'rgba(255,255,255,0.35)'
    ctx.setLineDash([5, 12])
    ctx.beginPath()
    ctx.moveTo(w / 2, 0)
    ctx.lineTo(w / 2, h)
    ctx.stroke()
    ctx.setLineDash([])

    requestAnimationFrame(gameLoop)
  }

  pongGame = game
  gameLoop()
}

const pausePong = () => {
  pongPaused.value = !pongPaused.value
  if (!pongPaused.value) startPong()
}

const resetPong = () => {
  pongRunning.value = false
  pongPaused.value = false
  pongScore.value = { player: 0, computer: 0 }
  pongGame = null
  const c = pongCanvas.value
  if (c) {
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, pongSize.value.w, pongSize.value.h)
  }
}

const updatePongPaddle = (event: MouseEvent) => {
  if (pongGame && pongCanvas.value) {
    const rect = pongCanvas.value.getBoundingClientRect()
    pongGame.mouseY = event.clientY - rect.top
  }
}

const makeTictactoeMove = (index: number) => {
  if (tictactoeBoard.value[index] !== '' || tictactoeGameOver.value) return

  tictactoeBoard.value[index] = tictactoeCurrentPlayer.value

  if (checkTictactoeWinner()) {
    tictactoeWinner.value = tictactoeCurrentPlayer.value
    tictactoeGameOver.value = true
    if (tictactoeCurrentPlayer.value === 'X') tictactoeScore.value.x++
    else tictactoeScore.value.o++
  } else if (tictactoeBoard.value.every((cell) => cell !== '')) {
    tictactoeWinner.value = 'tie'
    tictactoeGameOver.value = true
    tictactoeScore.value.ties++
  } else {
    tictactoeCurrentPlayer.value = tictactoeCurrentPlayer.value === 'X' ? 'O' : 'X'
    if (tictactoeVsComputer.value && tictactoeCurrentPlayer.value === 'O') {
      setTimeout(() => makeComputerMove(), 400)
    }
  }
}

const makeComputerMove = () => {
  const emptyIndices = tictactoeBoard.value
    .map((cell, index) => (cell === '' ? index : null))
    .filter((index) => index !== null) as number[]
  if (emptyIndices.length > 0) {
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)]
    makeTictactoeMove(randomIndex)
  }
}

const checkTictactoeWinner = () => {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ]
  return winPatterns.some((pattern) => {
    const [a, b, c] = pattern
    return (
      tictactoeBoard.value[a]
      && tictactoeBoard.value[a] === tictactoeBoard.value[b]
      && tictactoeBoard.value[a] === tictactoeBoard.value[c]
    )
  })
}

const resetTictactoe = () => {
  tictactoeBoard.value = Array(9).fill('')
  tictactoeCurrentPlayer.value = 'X'
  tictactoeWinner.value = ''
  tictactoeGameOver.value = false
}

const toggleTictactoeMode = () => {
  tictactoeVsComputer.value = !tictactoeVsComputer.value
  resetTictactoe()
}

function buildBreakoutBricks(BW: number, BH: number) {
  const padX = Math.max(4, Math.round(BW * 0.017))
  const padTop = Math.max(20, Math.round(BH * 0.085))
  const cols = 8
  const rows = 5
  const gap = Math.max(2, Math.round(BW * 0.007))
  const innerW = BW - 2 * padX - (cols - 1) * gap
  const brickW = innerW / cols
  const brickH = Math.max(10, Math.round(BH * 0.036))
  const bricks: { x: number; y: number; width: number; height: number; visible: boolean; color: string }[] = []
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      bricks.push({
        x: padX + i * (brickW + gap),
        y: padTop + j * (brickH + gap),
        width: brickW,
        height: brickH,
        visible: true,
        color: `hsl(${j * 60}, 70%, 50%)`,
      })
    }
  }
  return bricks
}

const startBreakout = () => {
  if (!breakoutCanvas.value) return

  breakoutRunning.value = true
  breakoutPaused.value = false

  const canvas = breakoutCanvas.value
  const ctx = canvas.getContext('2d')!
  const BW = canvas.width
  const BH = canvas.height
  const paddleW = Math.max(48, Math.round(BW * 0.15))
  const paddleH = Math.max(6, Math.round(BH * 0.022))
  const ballSize = Math.max(5, Math.round(BW * 0.017))
  const paddleY = BH - Math.max(12, Math.round(BH * 0.052))
  const ballBaseY = paddleY - Math.round(BH * 0.12)
  const speed = Math.max(2.5, (BW / 480) * 3)

  const game = {
    ball: { x: BW / 2, y: ballBaseY, dx: speed, dy: -speed, size: ballSize },
    paddle: { x: BW / 2 - paddleW / 2, y: paddleY, width: paddleW, height: paddleH },
    bricks: buildBreakoutBricks(BW, BH),
    mouseX: BW / 2,
  }

  const gameLoop = () => {
    if (!breakoutRunning.value || breakoutPaused.value) return

    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    game.ball.x += game.ball.dx
    game.ball.y += game.ball.dy

    if (game.ball.x <= 0 || game.ball.x >= canvas.width - game.ball.size) {
      game.ball.dx = -game.ball.dx
    }
    if (game.ball.y <= 0) {
      game.ball.dy = -game.ball.dy
    }

    const pad = game.paddle
    if (
      game.ball.y + game.ball.size >= pad.y
      && game.ball.x + game.ball.size >= pad.x
      && game.ball.x <= pad.x + pad.width
    ) {
      game.ball.dy = -Math.abs(game.ball.dy)
    }

    game.bricks.forEach((brick) => {
      if (
        brick.visible
        && game.ball.x < brick.x + brick.width
        && game.ball.x + game.ball.size > brick.x
        && game.ball.y < brick.y + brick.height
        && game.ball.y + game.ball.size > brick.y
      ) {
        brick.visible = false
        game.ball.dy = -game.ball.dy
        breakoutScore.value += 10
      }
    })

    if (game.ball.y > canvas.height) {
      breakoutLives.value--
      if (breakoutLives.value <= 0) {
        breakoutRunning.value = false
      } else {
        game.ball.x = BW / 2
        game.ball.y = ballBaseY
        game.ball.dx = speed
        game.ball.dy = -speed
      }
    }

    pad.x = game.mouseX - pad.width / 2
    pad.x = Math.max(0, Math.min(BW - pad.width, pad.x))

    ctx.fillStyle = '#fff'
    ctx.fillRect(game.ball.x, game.ball.y, game.ball.size, game.ball.size)
    ctx.fillRect(pad.x, pad.y, pad.width, pad.height)

    game.bricks.forEach((brick) => {
      if (brick.visible) {
        ctx.fillStyle = brick.color
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height)
      }
    })

    requestAnimationFrame(gameLoop)
  }

  breakoutGame = game
  gameLoop()
}

const pauseBreakout = () => {
  breakoutPaused.value = !breakoutPaused.value
  if (!breakoutPaused.value) startBreakout()
}

const resetBreakout = () => {
  breakoutRunning.value = false
  breakoutPaused.value = false
  breakoutScore.value = 0
  breakoutLives.value = 3
  breakoutLevel.value = 1
  breakoutGame = null
  const c = breakoutCanvas.value
  if (c) {
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, breakoutSize.value.w, breakoutSize.value.h)
  }
}

const updateBreakoutPaddle = (event: MouseEvent) => {
  if (breakoutGame && breakoutCanvas.value) {
    const rect = breakoutCanvas.value.getBoundingClientRect()
    breakoutGame.mouseX = event.clientX - rect.left
  }
}

watch(activeGame, () => {
  void nextTick(() => {
    requestAnimationFrame(syncAllLayouts)
  })
})

onMounted(() => {
  resizeObserver = new ResizeObserver(() => {
    syncAllLayouts()
  })
  if (panelShellRef.value) resizeObserver.observe(panelShellRef.value)

  void nextTick(() => {
    requestAnimationFrame(() => {
      syncAllLayouts()
      if (pongCanvas.value) {
        const ctx = pongCanvas.value.getContext('2d')!
        ctx.fillStyle = '#000'
        ctx.fillRect(0, 0, pongSize.value.w, pongSize.value.h)
      }
      if (breakoutCanvas.value) {
        const ctx = breakoutCanvas.value.getContext('2d')!
        ctx.fillStyle = '#000'
        ctx.fillRect(0, 0, breakoutSize.value.w, breakoutSize.value.h)
      }
    })
  })
})

onUnmounted(() => {
  pongRunning.value = false
  breakoutRunning.value = false
  resizeObserver?.disconnect()
  resizeObserver = null
})
</script>

<style lang="scss" scoped>
.games-view {
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 0.75rem 1.25rem 0.75rem;
  box-sizing: border-box;
  background: #fff;
  font-family: inherit;
}

.games-view__header {
  flex-shrink: 0;
  margin-bottom: 0.5rem;
}

.games-view__title {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.375rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.25rem;
}

.games-view__title-icon {
  flex-shrink: 0;
  color: #4b5563;
}

.games-view__subtitle {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.45;
  color: #6b7280;
  max-width: 44rem;
}

.games-view__separator {
  flex-shrink: 0;
  display: block;
  height: 1px;
  margin: 0 0 0.5rem;
  background: #e5e7eb;
}

.games-view__section {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: #f9fafb;
  overflow: hidden;
}

.games-tabs {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.games-tabs__list {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: 0.25rem;
  border-bottom: 1px solid #d1d5db;
  padding: 0 0.75rem;
  background: #f9fafb;
}

.games-tabs__trigger {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.55rem 0.85rem;
  border: none;
  background: none;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.15s;
  font-family: inherit;

  &:hover {
    color: #111827;
  }

  &[data-state='active'] {
    color: #2563eb;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background: #2563eb;
      border-radius: 1px;
    }
  }
}

.games-tabs__emoji {
  font-size: 1rem;
  line-height: 1;
}

.games-panel-shell {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
}

.games-tabs__panel {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  outline: none;

  &:focus-visible {
    box-shadow: inset 0 0 0 2px rgba(37, 99, 235, 0.35);
  }
}

.games-panel {
  box-sizing: border-box;
  padding: 0.5rem 0.65rem 0.65rem;
  overflow: hidden;
  gap: 0.65rem 0.85rem;
}

.games-panel--split {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;
}

.games-panel__stage--fill {
  flex: 1 1 0;
  min-width: 0;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.games-panel__stage--ttt {
  padding: 0.25rem;
}

.games-panel__rail {
  flex: 0 0 13.5rem;
  width: 13.5rem;
  max-width: min(13.5rem, 32vw);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  overflow: hidden;
}

.games-panel__heading {
  margin: 0;
}

.games-panel__h2 {
  margin: 0 0 0.15rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #111827;
}

.games-panel__lede {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.35;
  color: #6b7280;
}

.games-canvas {
  display: block;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: #000;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}

.games-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.games-btn {
  padding: 0.35rem 0.65rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  font-size: 0.75rem;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s, opacity 0.15s;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
}

.games-btn--start {
  background: #10b981;
  color: #fff;
  &:hover:not(:disabled) { background: #059669; }
}

.games-btn--pause {
  background: #f59e0b;
  color: #fff;
  &:hover:not(:disabled) { background: #d97706; }
}

.games-btn--reset {
  background: #ef4444;
  color: #fff;
  &:hover:not(:disabled) { background: #dc2626; }
}

.games-btn--mode {
  background: #6366f1;
  color: #fff;
  &:hover:not(:disabled) { background: #4f46e5; }
}

.games-scoreboard {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.games-scoreboard--3 .games-stat {
  flex: 1 1 auto;
  min-width: 3.5rem;
}

.games-stat {
  text-align: center;
  padding: 0.35rem 0.5rem;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
}

.games-stat__label {
  display: block;
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #6b7280;
  margin-bottom: 0.1rem;
}

.games-stat__value {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
}

.games-status {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #374151;
  padding: 0.25rem 0;
}

.games-hint {
  margin: 0;
  font-size: 0.6875rem;
  line-height: 1.35;
  color: #6b7280;
}

.games-ttt-board {
  width: min(100%, min(70vmin, 26rem));
  max-width: 100%;
  max-height: 100%;
  aspect-ratio: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 3px;
  background: #374151;
  padding: 3px;
  border-radius: 0.375rem;
  box-sizing: border-box;
}

.games-ttt-cell {
  border: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  min-height: 0;
  min-width: 0;
  background: #fff;
  font-size: clamp(1rem, 14vmin, 2.25rem);
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  color: #111827;
  transition: background 0.15s;

  &:hover:not(:disabled) {
    background: #f3f4f6;
  }

  &:disabled,
  &.games-ttt-cell--disabled {
    cursor: default;
  }
}

@media (max-width: 700px) {
  .games-panel--split {
    flex-wrap: wrap;
  }

  .games-panel__rail {
    flex: 1 1 100%;
    width: 100%;
    max-width: none;
  }
}
</style>
