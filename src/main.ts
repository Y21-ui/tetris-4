import './style.css'
import { Game } from './game/Game'
import { Renderer } from './ui/renderer'

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20
const BLOCK_SIZE = 30
const BASE_GAME_SPEED = 800 // 毫秒
const AUTO_DROP_INTERVAL = 50 // 毫秒

let game = new Game(BOARD_WIDTH, BOARD_HEIGHT)
let renderer: Renderer
let gameLoopId: number | null = null
let lastTickTime = 0
let lastAutoDropTime = 0

// 按鍵狀態跟踪
const keyState: Record<string, boolean> = {}

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
        <div class="hint-item">Z : 順時針旋轉</div>
        <div class="hint-item">X : 逆時針旋轉</div>
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
  // 鍵盤按下
  document.addEventListener('keydown', handleKeyDown)

  // 鍵盤抬起
  document.addEventListener('keyup', handleKeyUp)

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
  const key = e.key.toLowerCase()

  switch (key) {
    case 'arrowleft':
    case 'arrowright':
    case 'arrowdown':
    case ' ':
    case 'z':
    case 'x':
    case 'p':
      keyState[key] = true
      e.preventDefault()
      break
  }

  // 立即處理單次按壓的操作
  if (key === 'p') {
    togglePause()
  } else if (key === ' ') {
    game.hardDrop()
  }
}

function handleKeyUp(e: KeyboardEvent) {
  const key = e.key.toLowerCase()
  keyState[key] = false
}

function processInput() {
  // 處理左右移動
  if (keyState['arrowleft']) {
    game.moveLeft()
  }
  if (keyState['arrowright']) {
    game.moveRight()
  }

  // 處理下移（持續按下則不斷下降）
  if (keyState['arrowdown']) {
    game.moveDown()
  }

  // 處理旋轉（Z：順時針，X：逆時針）
  if (keyState['z']) {
    game.rotate()
    keyState['z'] = false // 只旋轉一次
  }
  if (keyState['x']) {
    ;(game as any).rotateCounterClockwise?.()
    keyState['x'] = false // 只旋轉一次
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
  lastTickTime = 0
  lastAutoDropTime = 0
  updateUI()
}

function gameUpdate(deltaTime: number) {
  // 計算遊戲速度（基於等級）
  const gameSpeedMs = BASE_GAME_SPEED / Math.pow(1.05, game.getLevel() - 1)

  // 檢查是否應該執行遊戲刻度
  if (lastTickTime === 0 || deltaTime - lastTickTime >= gameSpeedMs) {
    game.tick()
    lastTickTime = deltaTime
  }
}

function gameLoop(timestamp: number) {
  // 處理輸入
  processInput()

  // 更新遊戲邏輯
  gameUpdate(timestamp)

  // 渲染
  render()

  // 繼續循環
  gameLoopId = requestAnimationFrame(gameLoop)
}

function startGameLoop() {
  if (gameLoopId !== null) {
    cancelAnimationFrame(gameLoopId)
  }

  lastTickTime = 0
  lastAutoDropTime = 0
  gameLoopId = requestAnimationFrame(gameLoop)
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
