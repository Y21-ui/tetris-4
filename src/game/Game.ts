import { Board } from './Board'
import { Piece } from './Piece'
import { GameState } from './types'

export class Game {
  private board: Board
  private currentPiece: Piece | null
  private nextPiece: Piece
  private state: GameState
  private score: number
  private level: number
  private lines: number
  private gameTickInterval: number | null

  constructor(boardWidth: number = 10, boardHeight: number = 20) {
    this.board = new Board(boardWidth, boardHeight)
    this.currentPiece = null
    this.nextPiece = Piece.createRandom()
    this.state = GameState.PLAYING
    this.score = 0
    this.level = 1
    this.lines = 0
    this.gameTickInterval = null

    this.spawnNewPiece()
  }

  /**
   * 取得遊戲狀態
   */
  getState(): GameState {
    return this.state
  }

  /**
   * 取得分數
   */
  getScore(): number {
    return this.score
  }

  /**
   * 取得等級
   */
  getLevel(): number {
    return this.level
  }

  /**
   * 取得消除的行數
   */
  getLines(): number {
    return this.lines
  }

  /**
   * 取得棋盤
   */
  getBoard(): Board {
    return this.board
  }

  /**
   * 取得當前方塊
   */
  getCurrentPiece(): Piece | null {
    return this.currentPiece
  }

  /**
   * 取得下一個方塊
   */
  getNextPiece(): Piece {
    return this.nextPiece
  }

  /**
   * 產生新的方塊
   */
  private spawnNewPiece(): boolean {
    this.currentPiece = this.nextPiece
    this.nextPiece = Piece.createRandom()

    // 檢查是否可以在初始位置放置方塊
    if (!this.canMovePiece(0, 0)) {
      this.state = GameState.GAME_OVER
      return false
    }

    return true
  }

  /**
   * 檢查方塊是否可以移動
   */
  private canMovePiece(dx: number, dy: number): boolean {
    if (!this.currentPiece) {
      return false
    }

    const { x, y } = this.currentPiece.getPosition()
    const newX = x + dx
    const newY = y + dy

    const positions = this.currentPiece.getAbsolutePositions().map((pos) => ({
      x: pos.x + dx,
      y: pos.y + dy,
    }))

    return this.board.arePositionsValid(positions)
  }

  /**
   * 移動當前方塊
   */
  movePiece(dx: number, dy: number): boolean {
    if (this.state !== GameState.PLAYING || !this.currentPiece) {
      return false
    }

    if (this.canMovePiece(dx, dy)) {
      this.currentPiece.move(dx, dy)
      return true
    }

    return false
  }

  /**
   * 向左移動
   */
  moveLeft(): boolean {
    return this.movePiece(-1, 0)
  }

  /**
   * 向右移動
   */
  moveRight(): boolean {
    return this.movePiece(1, 0)
  }

  /**
   * 向下移動
   */
  moveDown(): boolean {
    return this.movePiece(0, 1)
  }

  /**
   * 快速下降（一次移動多行）
   */
  hardDrop(): number {
    let dropDistance = 0
    while (this.moveDown()) {
      dropDistance++
    }
    return dropDistance
  }

  /**
   * 旋轉方塊（順時針）
   */
  rotate(): boolean {
    if (this.state !== GameState.PLAYING || !this.currentPiece) {
      return false
    }

    const piece = this.currentPiece
    const oldRotation = piece.getRotationState()

    // 嘗試旋轉
    piece.rotate()

    // 檢查旋轉後是否有效
    const positions = piece.getAbsolutePositions()
    if (!this.board.arePositionsValid(positions)) {
      // 旋轉失敗，還原旋轉狀態
      for (let i = 0; i < 3; i++) {
        piece.rotate()
      }
      return false
    }

    return true
  }

  /**
   * 旋轉方塊（逆時針）
   */
  rotateCounterClockwise(): boolean {
    if (this.state !== GameState.PLAYING || !this.currentPiece) {
      return false
    }

    const piece = this.currentPiece

    // 嘗試逆向旋轉
    piece.rotateCounterClockwise()

    // 檢查旋轉後是否有效
    const positions = piece.getAbsolutePositions()
    if (!this.board.arePositionsValid(positions)) {
      // 旋轉失敗，還原旋轉狀態
      piece.rotate()
      return false
    }

    return true
  }

  /**
   * 將當前方塊固定到棋盤
   */
  lockPiece(): boolean {
    if (!this.currentPiece) {
      return false
    }

    const positions = this.currentPiece.getAbsolutePositions()
    this.board.placePiece(positions)

    // 清除完整的行
    const clearedLines = this.board.clearCompleteLines()
    if (clearedLines > 0) {
      this.addScore(clearedLines)
      this.lines += clearedLines
      this.updateLevel()
    }

    // 產生新的方塊
    return this.spawnNewPiece()
  }

  /**
   * 加分
   */
  private addScore(clearedLines: number): void {
    const points = [0, 100, 300, 500, 800]
    if (clearedLines > 0 && clearedLines < points.length) {
      this.score += points[clearedLines] * this.level
    }
  }

  /**
   * 更新等級（每消除 10 行升一級）
   */
  private updateLevel(): void {
    this.level = Math.floor(this.lines / 10) + 1
  }

  /**
   * 遊戲刻度（由主循環定時呼叫）
   */
  tick(): void {
    if (this.state !== GameState.PLAYING) {
      return
    }

    // 嘗試向下移動
    if (!this.moveDown()) {
      // 無法向下移動，固定方塊
      this.lockPiece()
    }
  }

  /**
   * 暫停遊戲
   */
  pause(): void {
    if (this.state === GameState.PLAYING) {
      this.state = GameState.PAUSED
    }
  }

  /**
   * 繼續遊戲
   */
  resume(): void {
    if (this.state === GameState.PAUSED) {
      this.state = GameState.PLAYING
    }
  }

  /**
   * 重新開始遊戲
   */
  restart(): void {
    this.board.reset()
    this.currentPiece = null
    this.nextPiece = Piece.createRandom()
    this.state = GameState.PLAYING
    this.score = 0
    this.level = 1
    this.lines = 0

    this.spawnNewPiece()
  }
}
