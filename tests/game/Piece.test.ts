import { describe, it, expect } from 'vitest'
import { Piece } from '../../src/game/Piece'
import { PieceType } from '../../src/game/types'

describe('Piece', () => {
  // 初始化測試
  describe('初始化', () => {
    it('應該使用提供的類型初始化', () => {
      const piece = new Piece(PieceType.I)
      expect(piece.getType()).toBe(PieceType.I)
    })

    it('應該以預設位置 (3, 0) 初始化', () => {
      const piece = new Piece(PieceType.I)
      const pos = piece.getPosition()
      expect(pos.x).toBe(3)
      expect(pos.y).toBe(0)
    })

    it('應該以自定義位置初始化', () => {
      const piece = new Piece(PieceType.I, 5, 10)
      const pos = piece.getPosition()
      expect(pos.x).toBe(5)
      expect(pos.y).toBe(10)
    })

    it('應該設置正確的顏色', () => {
      const piece = new Piece(PieceType.I)
      expect(piece.getColor()).toBe('#00f0f0') // I 方塊是青色
    })
  })

  // 位置和移動測試
  describe('位置和移動', () => {
    it('應該移動方塊', () => {
      const piece = new Piece(PieceType.I, 3, 0)
      piece.move(1, 2)
      const pos = piece.getPosition()
      expect(pos.x).toBe(4)
      expect(pos.y).toBe(2)
    })

    it('應該設置新位置', () => {
      const piece = new Piece(PieceType.I)
      piece.setPosition(7, 8)
      const pos = piece.getPosition()
      expect(pos.x).toBe(7)
      expect(pos.y).toBe(8)
    })

    it('應該獲取絕對位置', () => {
      const piece = new Piece(PieceType.I, 0, 0)
      const positions = piece.getAbsolutePositions()

      // I 方塊由 4 個方塊組成
      expect(positions.length).toBe(4)

      // 驗證位置
      expect(positions[0]).toEqual({ x: 0, y: 0 })
      expect(positions[1]).toEqual({ x: 1, y: 0 })
      expect(positions[2]).toEqual({ x: 2, y: 0 })
      expect(positions[3]).toEqual({ x: 3, y: 0 })
    })

    it('絕對位置應該考慮方塊位置', () => {
      const piece = new Piece(PieceType.I, 2, 5)
      const positions = piece.getAbsolutePositions()

      // 應該添加位置偏移
      expect(positions[0]).toEqual({ x: 2, y: 5 })
      expect(positions[1]).toEqual({ x: 3, y: 5 })
    })
  })

  // 形狀測試
  describe('不同方塊形狀', () => {
    it('O 方塊應該有正確的形狀', () => {
      const piece = new Piece(PieceType.O, 0, 0)
      const positions = piece.getAbsolutePositions()
      expect(positions.length).toBe(4)

      // O 方塊是 2x2
      expect(positions).toContainEqual({ x: 0, y: 0 })
      expect(positions).toContainEqual({ x: 1, y: 0 })
      expect(positions).toContainEqual({ x: 0, y: 1 })
      expect(positions).toContainEqual({ x: 1, y: 1 })
    })

    it('T 方塊應該有正確的形狀', () => {
      const piece = new Piece(PieceType.T, 0, 0)
      const positions = piece.getAbsolutePositions()
      expect(positions.length).toBe(4)
    })

    it('所有方塊應該有 4 個區塊', () => {
      const types = [
        PieceType.I,
        PieceType.O,
        PieceType.T,
        PieceType.S,
        PieceType.Z,
        PieceType.J,
        PieceType.L,
      ]

      types.forEach((type) => {
        const piece = new Piece(type)
        expect(piece.getAbsolutePositions().length).toBe(4)
      })
    })
  })

  // 旋轉測試
  describe('旋轉', () => {
    it('應該更改旋轉狀態', () => {
      const piece = new Piece(PieceType.I)
      expect(piece.getRotationState()).toBe(0)

      piece.rotate()
      expect(piece.getRotationState()).toBe(1)

      piece.rotate()
      expect(piece.getRotationState()).toBe(2)

      piece.rotate()
      expect(piece.getRotationState()).toBe(3)

      piece.rotate()
      expect(piece.getRotationState()).toBe(0) // 循環回到 0
    })
  })

  // 隨機方塊測試
  describe('隨機方塊生成', () => {
    it('應該建立隨機方塊', () => {
      const piece = Piece.createRandom()
      expect(piece).toBeDefined()

      const types = [
        PieceType.I,
        PieceType.O,
        PieceType.T,
        PieceType.S,
        PieceType.Z,
        PieceType.J,
        PieceType.L,
      ]
      expect(types).toContain(piece.getType())
    })

    it('應該以自定義位置建立隨機方塊', () => {
      const piece = Piece.createRandom(5, 10)
      const pos = piece.getPosition()
      expect(pos.x).toBe(5)
      expect(pos.y).toBe(10)
    })
  })

  // 顏色測試
  describe('方塊顏色', () => {
    it('I 方塊應該是青色', () => {
      expect(new Piece(PieceType.I).getColor()).toBe('#00f0f0')
    })

    it('O 方塊應該是黃色', () => {
      expect(new Piece(PieceType.O).getColor()).toBe('#f0f000')
    })

    it('T 方塊應該是紫色', () => {
      expect(new Piece(PieceType.T).getColor()).toBe('#a000f0')
    })

    it('S 方塊應該是綠色', () => {
      expect(new Piece(PieceType.S).getColor()).toBe('#00f000')
    })

    it('Z 方塊應該是紅色', () => {
      expect(new Piece(PieceType.Z).getColor()).toBe('#f00000')
    })

    it('J 方塊應該是藍色', () => {
      expect(new Piece(PieceType.J).getColor()).toBe('#0000f0')
    })

    it('L 方塊應該是橙色', () => {
      expect(new Piece(PieceType.L).getColor()).toBe('#f0a000')
    })
  })
})
