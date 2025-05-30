<template>
  <div class="view games">
    <div class="content">
      <h1 class="text-4xl font-bold mb-8 text-center">Classic Games</h1>
      <p class="text-lg mb-8 text-center text-gray-600">
        Enjoy classic games built with modern web technologies
      </p>

      <div class="game-tabs">
        <div class="tab-headers">
          <button 
            v-for="game in games" 
            :key="game.id"
            @click="activeGame = game.id"
            :class="['tab-header', { active: activeGame === game.id }]"
          >
            <span class="game-icon">{{ game.icon }}</span>
            {{ game.name }}
          </button>
        </div>

        <div class="tab-content">
          <!-- Pong Game -->
          <div v-if="activeGame === 'pong'" class="tab-panel">
            <div class="game-header">
              <h2 class="text-2xl font-semibold mb-4">🏓 Pong</h2>
              <p class="text-gray-600 mb-6">The classic arcade game that started it all</p>
            </div>

            <div class="game-container">
              <canvas 
                ref="pongCanvas" 
                class="game-canvas" 
                width="800" 
                height="400"
                @mousemove="updatePongPaddle"
              ></canvas>
              
              <div class="game-controls">
                <button @click="startPong" :disabled="pongRunning" class="game-btn start">
                  {{ pongRunning ? 'Playing...' : 'Start Game' }}
                </button>
                <button @click="pausePong" v-if="pongRunning" class="game-btn pause">
                  {{ pongPaused ? 'Resume' : 'Pause' }}
                </button>
                <button @click="resetPong" class="game-btn reset">Reset</button>
              </div>

              <div class="game-score">
                <div class="score-item">
                  <span class="score-label">Player</span>
                  <span class="score-value">{{ pongScore.player }}</span>
                </div>
                <div class="score-item">
                  <span class="score-label">Computer</span>
                  <span class="score-value">{{ pongScore.computer }}</span>
                </div>
              </div>

              <div class="game-instructions">
                <h3>How to Play:</h3>
                <ul>
                  <li>Move your mouse to control the left paddle</li>
                  <li>Prevent the ball from reaching your side</li>
                  <li>First to 10 points wins!</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Tic Tac Toe Game -->
          <div v-if="activeGame === 'tictactoe'" class="tab-panel">
            <div class="game-header">
              <h2 class="text-2xl font-semibold mb-4">❌ Tic Tac Toe</h2>
              <p class="text-gray-600 mb-6">The timeless strategy game of X's and O's</p>
            </div>

            <div class="game-container">
              <div class="tictactoe-board">
                <div 
                  v-for="(cell, index) in tictactoeBoard" 
                  :key="index"
                  class="tictactoe-cell"
                  :class="{ disabled: cell !== '' || tictactoeGameOver }"
                  @click="makeTictactoeMove(index)"
                >
                  {{ cell }}
                </div>
              </div>

              <div class="game-controls">
                <button @click="resetTictactoe" class="game-btn reset">New Game</button>
                <button @click="toggleTictactoeMode" class="game-btn mode">
                  {{ tictactoeVsComputer ? 'vs Computer' : 'vs Human' }}
                </button>
              </div>

              <div class="game-status">
                <div v-if="tictactoeWinner" class="winner-message">
                  {{ tictactoeWinner === 'tie' ? "It's a tie!" : `${tictactoeWinner} wins!` }}
                </div>
                <div v-else class="current-player">
                  Current player: {{ tictactoeCurrentPlayer }}
                </div>
              </div>

              <div class="game-score">
                <div class="score-item">
                  <span class="score-label">X Wins</span>
                  <span class="score-value">{{ tictactoeScore.x }}</span>
                </div>
                <div class="score-item">
                  <span class="score-label">O Wins</span>
                  <span class="score-value">{{ tictactoeScore.o }}</span>
                </div>
                <div class="score-item">
                  <span class="score-label">Ties</span>
                  <span class="score-value">{{ tictactoeScore.ties }}</span>
                </div>
              </div>

              <div class="game-instructions">
                <h3>How to Play:</h3>
                <ul>
                  <li>Click on empty squares to place your mark</li>
                  <li>Get three in a row horizontally, vertically, or diagonally</li>
                  <li>Switch between human vs human or vs computer modes</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Breakout Game -->
          <div v-if="activeGame === 'breakout'" class="tab-panel">
            <div class="game-header">
              <h2 class="text-2xl font-semibold mb-4">🧱 Breakout</h2>
              <p class="text-gray-600 mb-6">Break all the bricks with your bouncing ball</p>
            </div>

            <div class="game-container">
              <canvas 
                ref="breakoutCanvas" 
                class="game-canvas" 
                width="800" 
                height="600"
                @mousemove="updateBreakoutPaddle"
              ></canvas>
              
              <div class="game-controls">
                <button @click="startBreakout" :disabled="breakoutRunning" class="game-btn start">
                  {{ breakoutRunning ? 'Playing...' : 'Start Game' }}
                </button>
                <button @click="pauseBreakout" v-if="breakoutRunning" class="game-btn pause">
                  {{ breakoutPaused ? 'Resume' : 'Pause' }}
                </button>
                <button @click="resetBreakout" class="game-btn reset">Reset</button>
              </div>

              <div class="game-stats">
                <div class="stat-item">
                  <span class="stat-label">Score</span>
                  <span class="stat-value">{{ breakoutScore }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Lives</span>
                  <span class="stat-value">{{ breakoutLives }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Level</span>
                  <span class="stat-value">{{ breakoutLevel }}</span>
                </div>
              </div>

              <div class="game-instructions">
                <h3>How to Play:</h3>
                <ul>
                  <li>Move your mouse to control the paddle</li>
                  <li>Keep the ball in play and break all the bricks</li>
                  <li>Different colored bricks give different points</li>
                  <li>Complete each level to advance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const activeGame = ref('pong')

const games = [
  { id: 'pong', name: 'Pong', icon: '🏓' },
  { id: 'tictactoe', name: 'Tic Tac Toe', icon: '❌' },
  { id: 'breakout', name: 'Breakout', icon: '🧱' }
]

// Pong Game State
const pongCanvas = ref<HTMLCanvasElement>()
const pongRunning = ref(false)
const pongPaused = ref(false)
const pongScore = ref({ player: 0, computer: 0 })
let pongGame: any = null

// Tic Tac Toe State
const tictactoeBoard = ref(Array(9).fill(''))
const tictactoeCurrentPlayer = ref('X')
const tictactoeWinner = ref('')
const tictactoeGameOver = ref(false)
const tictactoeVsComputer = ref(true)
const tictactoeScore = ref({ x: 0, o: 0, ties: 0 })

// Breakout Game State
const breakoutCanvas = ref<HTMLCanvasElement>()
const breakoutRunning = ref(false)
const breakoutPaused = ref(false)
const breakoutScore = ref(0)
const breakoutLives = ref(3)
const breakoutLevel = ref(1)
let breakoutGame: any = null

// Pong Game Logic
const startPong = () => {
  if (!pongCanvas.value) return
  
  pongRunning.value = true
  pongPaused.value = false
  
  const canvas = pongCanvas.value
  const ctx = canvas.getContext('2d')!
  
  const game = {
    ball: { x: 400, y: 200, dx: 5, dy: 3, size: 10 },
    playerPaddle: { x: 10, y: 150, width: 10, height: 100 },
    computerPaddle: { x: 780, y: 150, width: 10, height: 100 },
    mouseY: 200
  }
  
  const gameLoop = () => {
    if (!pongRunning.value || pongPaused.value) return
    
    // Clear canvas
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Update ball
    game.ball.x += game.ball.dx
    game.ball.y += game.ball.dy
    
    // Ball collision with top/bottom
    if (game.ball.y <= 0 || game.ball.y >= canvas.height) {
      game.ball.dy = -game.ball.dy
    }
    
    // Ball collision with paddles
    if (game.ball.x <= 20 && game.ball.y >= game.playerPaddle.y && game.ball.y <= game.playerPaddle.y + 100) {
      game.ball.dx = -game.ball.dx
    }
    
    if (game.ball.x >= 770 && game.ball.y >= game.computerPaddle.y && game.ball.y <= game.computerPaddle.y + 100) {
      game.ball.dx = -game.ball.dx
    }
    
    // Score
    if (game.ball.x < 0) {
      pongScore.value.computer++
      game.ball.x = 400
      game.ball.y = 200
    }
    
    if (game.ball.x > canvas.width) {
      pongScore.value.player++
      game.ball.x = 400
      game.ball.y = 200
    }
    
    // Update player paddle
    game.playerPaddle.y = game.mouseY - 50
    
    // Update computer paddle (simple AI)
    if (game.computerPaddle.y + 50 < game.ball.y) {
      game.computerPaddle.y += 3
    } else if (game.computerPaddle.y + 50 > game.ball.y) {
      game.computerPaddle.y -= 3
    }
    
    // Draw everything
    ctx.fillStyle = '#fff'
    ctx.fillRect(game.ball.x, game.ball.y, game.ball.size, game.ball.size)
    ctx.fillRect(game.playerPaddle.x, game.playerPaddle.y, game.playerPaddle.width, game.playerPaddle.height)
    ctx.fillRect(game.computerPaddle.x, game.computerPaddle.y, game.computerPaddle.width, game.computerPaddle.height)
    
    // Center line
    ctx.setLineDash([5, 15])
    ctx.beginPath()
    ctx.moveTo(400, 0)
    ctx.lineTo(400, canvas.height)
    ctx.stroke()
    
    requestAnimationFrame(gameLoop)
  }
  
  pongGame = game
  gameLoop()
}

const pausePong = () => {
  pongPaused.value = !pongPaused.value
  if (!pongPaused.value) {
    startPong()
  }
}

const resetPong = () => {
  pongRunning.value = false
  pongPaused.value = false
  pongScore.value = { player: 0, computer: 0 }
  
  if (pongCanvas.value) {
    const ctx = pongCanvas.value.getContext('2d')!
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, pongCanvas.value.width, pongCanvas.value.height)
  }
}

const updatePongPaddle = (event: MouseEvent) => {
  if (pongGame && pongCanvas.value) {
    const rect = pongCanvas.value.getBoundingClientRect()
    pongGame.mouseY = event.clientY - rect.top
  }
}

// Tic Tac Toe Logic
const makeTictactoeMove = (index: number) => {
  if (tictactoeBoard.value[index] !== '' || tictactoeGameOver.value) return
  
  tictactoeBoard.value[index] = tictactoeCurrentPlayer.value
  
  if (checkTictactoeWinner()) {
    tictactoeWinner.value = tictactoeCurrentPlayer.value
    tictactoeGameOver.value = true
    
    if (tictactoeCurrentPlayer.value === 'X') {
      tictactoeScore.value.x++
    } else {
      tictactoeScore.value.o++
    }
  } else if (tictactoeBoard.value.every(cell => cell !== '')) {
    tictactoeWinner.value = 'tie'
    tictactoeGameOver.value = true
    tictactoeScore.value.ties++
  } else {
    tictactoeCurrentPlayer.value = tictactoeCurrentPlayer.value === 'X' ? 'O' : 'X'
    
    // Computer move
    if (tictactoeVsComputer.value && tictactoeCurrentPlayer.value === 'O') {
      setTimeout(() => {
        makeComputerMove()
      }, 500)
    }
  }
}

const makeComputerMove = () => {
  const emptyIndices = tictactoeBoard.value
    .map((cell, index) => cell === '' ? index : null)
    .filter(index => index !== null) as number[]
  
  if (emptyIndices.length > 0) {
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)]
    makeTictactoeMove(randomIndex)
  }
}

const checkTictactoeWinner = () => {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ]
  
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern
    return tictactoeBoard.value[a] && 
           tictactoeBoard.value[a] === tictactoeBoard.value[b] && 
           tictactoeBoard.value[a] === tictactoeBoard.value[c]
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

// Breakout Game Logic
const startBreakout = () => {
  if (!breakoutCanvas.value) return
  
  breakoutRunning.value = true
  breakoutPaused.value = false
  
  const canvas = breakoutCanvas.value
  const ctx = canvas.getContext('2d')!
  
  const bricks = []
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 5; j++) {
      bricks.push({
        x: i * 100 + 10,
        y: j * 30 + 50,
        width: 90,
        height: 25,
        visible: true,
        color: `hsl(${j * 60}, 70%, 50%)`
      })
    }
  }
  
  const game = {
    ball: { x: 400, y: 500, dx: 4, dy: -4, size: 10 },
    paddle: { x: 350, y: 580, width: 100, height: 10 },
    bricks,
    mouseX: 400
  }
  
  const gameLoop = () => {
    if (!breakoutRunning.value || breakoutPaused.value) return
    
    // Clear canvas
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Update ball
    game.ball.x += game.ball.dx
    game.ball.y += game.ball.dy
    
    // Ball collision with walls
    if (game.ball.x <= 0 || game.ball.x >= canvas.width - game.ball.size) {
      game.ball.dx = -game.ball.dx
    }
    
    if (game.ball.y <= 0) {
      game.ball.dy = -game.ball.dy
    }
    
    // Ball collision with paddle
    if (game.ball.y + game.ball.size >= game.paddle.y && 
        game.ball.x >= game.paddle.x && 
        game.ball.x <= game.paddle.x + game.paddle.width) {
      game.ball.dy = -game.ball.dy
    }
    
    // Ball collision with bricks
    game.bricks.forEach(brick => {
      if (brick.visible && 
          game.ball.x < brick.x + brick.width &&
          game.ball.x + game.ball.size > brick.x &&
          game.ball.y < brick.y + brick.height &&
          game.ball.y + game.ball.size > brick.y) {
        brick.visible = false
        game.ball.dy = -game.ball.dy
        breakoutScore.value += 10
      }
    })
    
    // Check for ball falling
    if (game.ball.y > canvas.height) {
      breakoutLives.value--
      if (breakoutLives.value <= 0) {
        breakoutRunning.value = false
      } else {
        game.ball.x = 400
        game.ball.y = 500
        game.ball.dx = 4
        game.ball.dy = -4
      }
    }
    
    // Update paddle
    game.paddle.x = game.mouseX - game.paddle.width / 2
    
    // Draw everything
    ctx.fillStyle = '#fff'
    ctx.fillRect(game.ball.x, game.ball.y, game.ball.size, game.ball.size)
    ctx.fillRect(game.paddle.x, game.paddle.y, game.paddle.width, game.paddle.height)
    
    // Draw bricks
    game.bricks.forEach(brick => {
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
  if (!breakoutPaused.value) {
    startBreakout()
  }
}

const resetBreakout = () => {
  breakoutRunning.value = false
  breakoutPaused.value = false
  breakoutScore.value = 0
  breakoutLives.value = 3
  breakoutLevel.value = 1
  
  if (breakoutCanvas.value) {
    const ctx = breakoutCanvas.value.getContext('2d')!
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, breakoutCanvas.value.width, breakoutCanvas.value.height)
  }
}

const updateBreakoutPaddle = (event: MouseEvent) => {
  if (breakoutGame && breakoutCanvas.value) {
    const rect = breakoutCanvas.value.getBoundingClientRect()
    breakoutGame.mouseX = event.clientX - rect.left
  }
}

onMounted(() => {
  // Initialize canvases
  if (pongCanvas.value) {
    const ctx = pongCanvas.value.getContext('2d')!
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, pongCanvas.value.width, pongCanvas.value.height)
  }
  
  if (breakoutCanvas.value) {
    const ctx = breakoutCanvas.value.getContext('2d')!
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, breakoutCanvas.value.width, breakoutCanvas.value.height)
  }
})

onUnmounted(() => {
  pongRunning.value = false
  breakoutRunning.value = false
})
</script>

<style lang="scss" scoped>
.games {
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);

  .content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .game-tabs {
    .tab-headers {
      display: flex;
      justify-content: center;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 0.5rem;
      margin-bottom: 2rem;
      backdrop-filter: blur(10px);

      .tab-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem 2rem;
        background: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.7);
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        border-radius: 8px;

        .game-icon {
          font-size: 1.5rem;
        }

        &.active {
          background: white;
          color: #8b5cf6;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        &:hover:not(.active) {
          color: rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.1);
        }
      }
    }

    .tab-content {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }
  }

  .game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .game-canvas {
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    background: #000;
  }

  .game-controls {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;

    .game-btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;

      &.start {
        background: #10b981;
        color: white;

        &:hover:not(:disabled) {
          background: #059669;
        }

        &:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }
      }

      &.pause {
        background: #f59e0b;
        color: white;

        &:hover {
          background: #d97706;
        }
      }

      &.reset {
        background: #ef4444;
        color: white;

        &:hover {
          background: #dc2626;
        }
      }

      &.mode {
        background: #6366f1;
        color: white;

        &:hover {
          background: #4f46e5;
        }
      }
    }
  }

  .game-score, .game-stats {
    display: flex;
    gap: 2rem;
    justify-content: center;
    flex-wrap: wrap;

    .score-item, .stat-item {
      text-align: center;
      padding: 1rem;
      background: #f8fafc;
      border-radius: 8px;
      border: 1px solid #e2e8f0;

      .score-label, .stat-label {
        display: block;
        font-size: 0.875rem;
        color: #6b7280;
        margin-bottom: 0.25rem;
      }

      .score-value, .stat-value {
        display: block;
        font-size: 1.5rem;
        font-weight: bold;
        color: #1a202c;
      }
    }
  }

  .tictactoe-board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
    background: #374151;
    padding: 4px;
    border-radius: 8px;

    .tictactoe-cell {
      width: 100px;
      height: 100px;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover:not(.disabled) {
        background: #f3f4f6;
      }

      &.disabled {
        cursor: not-allowed;
      }
    }
  }

  .game-status {
    text-align: center;
    padding: 1rem;
    border-radius: 8px;
    
    .winner-message {
      font-size: 1.25rem;
      font-weight: bold;
      color: #10b981;
    }

    .current-player {
      font-size: 1.125rem;
      color: #374151;
    }
  }

  .game-instructions {
    background: #f8fafc;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    max-width: 400px;

    h3 {
      margin-bottom: 1rem;
      color: #1a202c;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        padding: 0.5rem 0;
        color: #4a5568;
        display: flex;
        align-items: center;

        &:before {
          content: '•';
          color: #8b5cf6;
          font-weight: bold;
          margin-right: 0.75rem;
        }
      }
    }
  }
}
</style> 