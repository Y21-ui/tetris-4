import { describe, it, expect, beforeEach } from 'vitest'
import { Board } from '../../src/game/Board'

describe('Board', () => {
  let board: Board

  beforeEach(() => {
    board = new Board(10, 20)
  })

  // 基本功能測試
  describe('初始化和尺寸', () => {
    it('應該以正確的寬度初始化', () => {
      expect(board.getWidth()).toBe(10)
    })

    it('應該以正確的高度初始化', () => {
      expect(board.getHeight()).toBe(20)
    })

    it('應該初始化時所有單元為空', () => {
      const grid = board.getGrid()
      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
          expect(grid[y][x]).toBe(0)
        }
      }
    })
  })

  // 位置驗證測試
  describe('位置驗證', () => {
    it('應該驗證有效的棋盤位置', () => {
      expect(board.isValidPosition(0, 0)).toBe(true)
      expect(board.isValidPosition(9, 19)).toBe(true)
      expect(board.isValidPosition(5, 10)).toBe(true)
    })

    it('應該拒絕無效的棋盤位置', () => {
      expect(board.isValidPosition(-1, 0)).toBe(false)
      expect(board.isValidPosition(10, 0)).toBe(false)
      expect(board.isValidPosition(0, -1)).toBe(false)
      expect(board.isValidPosition(0, 20)).toBe(false)
    })
  })

  // 單元狀態測試
  describe('單元狀態操作', () => {
    it('應該獲取空單元狀態', () => {
      expect(board.getCellState(0, 0)).toBe(0)
    })

    it('應該設置單元狀態', () => {
      board.setCellState(5, 5, 1)
      expect(board.getCellState(5, 5)).toBe(1)
    })

    it('邊界外的位置應該被視為有方塊', () => {
      expect(board.getCellState(-1, 0)).toBe(1)
      expect(board.getCellState(10, 0)).toBe(1)
      expect(board.getCellState(0, -1)).toBe(1)
      expect(board.getCellState(0, 20)).toBe(1)
    })

    it('應該檢查位置是否被佔據', () => {
      expect(board.isOccupied(0, 0)).toBe(false)

      board.setCellState(5, 5, 1)
      expect(board.isOccupied(5, 5)).toBe(true)

      expect(board.isOccupied(-1, 0)).toBe(true) // 邊界外
    })
  })

  // 方塊放置測試
  describe('方塊放置', () => {
    it('應該放置方塊到棋盤', () => {
      const positions = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
      ]

      board.placePiece(positions)

      positions.forEach(({ x, y }) => {
        expect(board.getCellState(x, y)).toBe(1)
      })
    })

    it('應該驗證多個位置是否有效和空閒', () => {
      const positions = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ]

      expect(board.arePositionsValid(positions)).toBe(true)

      board.setCellState(0, 0, 1)
      expect(board.arePositionsValid(positions)).toBe(false)
    })

    it('邊界外的位置應該不驗證通過', () => {
      const positions = [
        { x: 9, y: 0 },
        { x: 10, y: 0 }, // 邊界外
      ]

      expect(board.arePositionsValid(positions)).toBe(false)
    })
  })

  // 行清除測試
  describe('行清除', () => {
    it('應該清除滿行', () => {
      // 填滿第 0 行
      for (let x = 0; x < board.getWidth(); x++) {
        board.setCellState(x, 0, 1)
      }

      const result = board.clearLine(0)
      expect(result).toBe(true)

      // 檢查第 0 行是否被清除
      for (let x = 0; x < board.getWidth(); x++) {
        expect(board.getCellState(x, 0)).toBe(0)
      }
    })

    it('不應該清除未滿的行', () => {
      for (let x = 0; x < 9; x++) {
        board.setCellState(x, 5, 1)
      }

      const result = board.clearLine(5)
      expect(result).toBe(false)

      // 檢查行未被清除
      for (let x = 0; x < 9; x++) {
        expect(board.getCellState(x, 5)).toBe(1)
      }
    })

    it('應該清除所有完整的行', () => {
      // 填滿第 0 和第 1 行
      for (let x = 0; x < board.getWidth(); x++) {
        board.setCellState(x, 0, 1)
        board.setCellState(x, 1, 1)
      }

      const clearedCount = board.clearCompleteLines()
      expect(clearedCount).toBe(2)

      // 檢查行是否被清除
      for (let x = 0; x < board.getWidth(); x++) {
        expect(board.getCellState(x, 0)).toBe(0)
        expect(board.getCellState(x, 1)).toBe(0)
      }
    })
  })

  // 重置測試
  describe('重置', () => {
    it('應該重置棋盤', () => {
      // 添加一些方塊
      board.setCellState(0, 0, 1)
      board.setCellState(5, 5, 1)

      // 重置
      board.reset()

      // 驗證棋盤為空
      const grid = board.getGrid()
      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
          expect(grid[y][x]).toBe(0)
        }
      }
    })
  })
})
