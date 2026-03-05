import './style.css'
import { Game } from './game/Game'
import { Renderer } from './ui/renderer'

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20
const BLOCK_SIZE = 30
const GAME_SPEED = 1000 // 毫秒

let game = new Game(BOARD_WIDTH, BOARD_HEIGHT)
let renderer: Renderer
let gameLoop: number | null = null

function initUI() {
  const app = document.getElementById('app')
  if (!app) return

  app.innerHTML = `
    <div class="game-container">
      <div class="game-title">俄羅斯方塊</div>
      <canvas id="gameCanvas" width="${BOARD_WIDTH * BLOCK_SIZE}" height="${BOARD_HEIGHT * BLOCK_SIZE}"></canvas>
      <div class="controls">
        <button id="pauseBtn">暫停</button>
        <button id="restartBtn">重新開始</button>
      </div>
    </div>
    <div class="info-panel">
      <div class="info-item">
        <span class="info-label">分數</span>
        <span class="info-value" id="score">0</span>
      </div>
      <div class="info-item">
        <span class="info-label">等級</span>
        <span class="info-value" id="level">1</span>
      </div>
      <div class="info-item">
        <span class="info-label">消除行數</span>
        <span class="info-value" id="lines">0</span>
      </div>
      <div class="keyboard-hints">
        <strong>操作方式：</strong>
        <div class="hint-item">← → : 左右移動</div>
        <div class="hint-item">↓ : 下降</div>
        <div class="hint-item">空格 : 快速下降</div>
        <div class="hint-item">Z/X : 旋轉</div>
        <div class="hint-item">P : 暫停/繼續</div>
      </div>
    </div>
  `

  renderer = new Renderer('gameCanvas', BLOCK_SIZE)

  setupEventListeners()
  startGameLoop()
  render()
}

function setupEventListeners() {
  // 鍵盤控制
  document.addEventListener('keydown', handleKeyDown)

  // 按鈕控制
  const pauseBtn = document.getElementById('pauseBtn')
  const restartBtn = document.getElementById('restartBtn')

  if (pauseBtn) {
    pauseBtn.addEventListener('click', togglePause)
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', restart)
  }
}

function handleKeyDown(e: KeyboardEvent) {
  switch (e.key) {
    case 'ArrowLeft':
      game.moveLeft()
      e.preventDefault()
      break
    case 'ArrowRight':
      game.moveRight()
      e.preventDefault()
      break
    case 'ArrowDown':
      game.moveDown()
      e.preventDefault()
      break
    case ' ':
      game.hardDrop()
      e.preventDefault()
      break
    case 'z':
    case 'Z':
      game.rotate()
      e.preventDefault()
      break
    case 'x':
    case 'X':
      game.rotate()
      e.preventDefault()
      break
    case 'p':
    case 'P':
      togglePause()
      e.preventDefault()
      break
  }
}

function togglePause() {
  const state = game.getState()
  if (state === 'PLAYING') {
    game.pause()
  } else if (state === 'PAUSED') {
    game.resume()
  }
  updateUI()
}

function restart() {
  game.restart()
  updateUI()
}

function startGameLoop() {
  if (gameLoop !== null) {
    cancelAnimationFrame(gameLoop as any)
  }

  const tick = () => {
    game.tick()
    render()
    gameLoop = setTimeout(() => {
      requestAnimationFrame(tick)
    }, GAME_SPEED / game.getLevel())
  }

  gameLoop = setTimeout(() => {
    requestAnimationFrame(tick)
  }, GAME_SPEED)
}

function render() {
  if (renderer) {
    renderer.render(game)
  }
  updateUI()
}

function updateUI() {
  const scoreEl = document.getElementById('score')
  const levelEl = document.getElementById('level')
  const linesEl = document.getElementById('lines')
  const pauseBtn = document.getElementById('pauseBtn')

  if (scoreEl) scoreEl.textContent = String(game.getScore())
  if (levelEl) levelEl.textContent = String(game.getLevel())
  if (linesEl) linesEl.textContent = String(game.getLines())

  if (pauseBtn) {
    const state = game.getState()
    if (state === 'PLAYING') {
      pauseBtn.textContent = '暫停'
    } else if (state === 'PAUSED') {
      pauseBtn.textContent = '繼續'
    } else {
      pauseBtn.textContent = '重新開始'
    }
  }
}

// 初始化遊戲
initUI()
