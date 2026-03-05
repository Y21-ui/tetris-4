import { Game } from '../game/Game'

export class Renderer {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private blockSize: number

  constructor(canvasId: string, blockSize: number = 30) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement
    if (!canvas) {
      throw new Error(`Canvas with id '${canvasId}' not found`)
    }

    this.canvas = canvas
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error('Failed to get 2D context from canvas')
    }

    this.ctx = ctx
    this.blockSize = blockSize
  }

  /**
   * 繪製遊戲
   */
  render(game: Game): void {
    this.clearCanvas()
    this.drawBoard(game)
    this.drawPiece(game)
  }

  /**
   * 清除畫布
   */
  private clearCanvas(): void {
    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  /**
   * 繪製棋盤
   */
  private drawBoard(game: Game): void {
    const board = game.getBoard()
    const grid = board.getGrid()

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        const cellState = grid[y][x]

        if (cellState === 1) {
          this.drawBlock(x, y, '#888')
        } else {
          this.drawEmptyBlock(x, y)
        }
      }
    }
  }

  /**
   * 繪製當前方塊
   */
  private drawPiece(game: Game): void {
    const piece = game.getCurrentPiece()
    if (!piece) return

    const positions = piece.getAbsolutePositions()
    const color = piece.getColor()

    for (const { x, y } of positions) {
      this.drawBlock(x, y, color)
    }
  }

  /**
   * 繪製單個方塊
   */
  private drawBlock(x: number, y: number, color: string): void {
    const px = x * this.blockSize
    const py = y * this.blockSize

    // 填充
    this.ctx.fillStyle = color
    this.ctx.fillRect(px + 1, py + 1, this.blockSize - 2, this.blockSize - 2)

    // 邊框
    this.ctx.strokeStyle = '#fff'
    this.ctx.lineWidth = 1
    this.ctx.strokeRect(px + 1, py + 1, this.blockSize - 2, this.blockSize - 2)
  }

  /**
   * 繪製空方塊（棋盤線）
   */
  private drawEmptyBlock(x: number, y: number): void {
    const px = x * this.blockSize
    const py = y * this.blockSize

    this.ctx.strokeStyle = '#222'
    this.ctx.lineWidth = 1
    this.ctx.strokeRect(px, py, this.blockSize, this.blockSize)
  }
}
