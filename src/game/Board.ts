import { CellState, Position } from './types'

export class Board {
  private grid: CellState[][]
  private readonly width: number
  private readonly height: number

  constructor(width: number = 10, height: number = 20) {
    this.width = width
    this.height = height
    this.grid = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => 0)
    )
  }

  /**
   * 取得棋盤寬度
   */
  getWidth(): number {
    return this.width
  }

  /**
   * 取得棋盤高度
   */
  getHeight(): number {
    return this.height
  }

  /**
   * 取得指定位置的單元狀態
   */
  getCellState(x: number, y: number): CellState {
    if (!this.isValidPosition(x, y)) {
      return 1 // 邊界外視為有方塊
    }
    return this.grid[y][x]
  }

  /**
   * 檢查位置是否有效（在棋盤範圍內）
   */
  isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height
  }

  /**
   * 設定指定位置的方塊
   */
  setCellState(x: number, y: number, state: CellState): void {
    if (this.isValidPosition(x, y)) {
      this.grid[y][x] = state
    }
  }

  /**
   * 檢查位置是否被佔據
   */
  isOccupied(x: number, y: number): boolean {
    return !this.isValidPosition(x, y) || this.grid[y][x] === 1
  }

  /**
   * 檢查多個位置是否都有效且空閒
   */
  arePositionsValid(positions: Position[]): boolean {
    return positions.every(
      ({ x, y }) => this.isValidPosition(x, y) && this.grid[y][x] === 0
    )
  }

  /**
   * 放置方塊到棋盤
   */
  placePiece(positions: Position[]): void {
    for (const { x, y } of positions) {
      this.setCellState(x, y, 1)
    }
  }

  /**
   * 清除一行（返回是否成功）
   */
  clearLine(row: number): boolean {
    if (!this.isValidPosition(0, row)) {
      return false
    }

    // 檢查該行是否滿了
    const isLineFull = this.grid[row].every((cell) => cell === 1)

    if (isLineFull) {
      // 移除該行，並在頂部插入新的空行
      this.grid.splice(row, 1)
      this.grid.unshift(Array.from({ length: this.width }, () => 0))
      return true
    }

    return false
  }

  /**
   * 清除所有完整的行，返回清除的行數
   */
  clearCompleteLines(): number {
    let clearedCount = 0
    // 從底部向上檢查，這樣清除不會影響索引
    for (let row = this.height - 1; row >= 0; ) {
      // 檢查該行是否滿了
      const isLineFull = this.grid[row].every((cell) => cell === 1)

      if (isLineFull) {
        // 移除該行，並在頂部插入新的空行
        this.grid.splice(row, 1)
        this.grid.unshift(Array.from({ length: this.width }, () => 0))
        clearedCount++
        // 不遞減 row，因為當前行被新行替換了
      } else {
        // 只有在沒有清除時才向上移動
        row--
      }
    }
    return clearedCount
  }

  /**
   * 取得完整的棋盤狀態
   */
  getGrid(): CellState[][] {
    return this.grid.map((row) => [...row])
  }

  /**
   * 重置棋盤
   */
  reset(): void {
    this.grid = Array.from({ length: this.height }, () =>
      Array.from({ length: this.width }, () => 0)
    )
  }
}
