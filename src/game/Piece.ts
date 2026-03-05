import { PieceType, Position, RotationState, PieceShape } from './types'

export class Piece {
  private type: PieceType
  private rotationState: RotationState
  private x: number
  private y: number
  private color: string

  // 定義所有方塊形狀
  private static readonly SHAPES: Record<PieceType, PieceShape> = {
    [PieceType.I]: {
      type: PieceType.I,
      blocks: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
      ],
      color: '#00f0f0',
    },
    [PieceType.O]: {
      type: PieceType.O,
      blocks: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      color: '#f0f000',
    },
    [PieceType.T]: {
      type: PieceType.T,
      blocks: [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      color: '#a000f0',
    },
    [PieceType.S]: {
      type: PieceType.S,
      blocks: [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      color: '#00f000',
    },
    [PieceType.Z]: {
      type: PieceType.Z,
      blocks: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      color: '#f00000',
    },
    [PieceType.J]: {
      type: PieceType.J,
      blocks: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      color: '#0000f0',
    },
    [PieceType.L]: {
      type: PieceType.L,
      blocks: [
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      color: '#f0a000',
    },
  }

  constructor(type: PieceType, x: number = 3, y: number = 0) {
    this.type = type
    this.x = x
    this.y = y
    this.rotationState = 0
    const shape = Piece.SHAPES[type]
    this.color = shape.color
  }

  /**
   * 取得方塊類型
   */
  getType(): PieceType {
    return this.type
  }

  /**
   * 取得方塊顏色
   */
  getColor(): string {
    return this.color
  }

  /**
   * 取得方塊位置
   */
  getPosition(): Position {
    return { x: this.x, y: this.y }
  }

  /**
   * 設定方塊位置
   */
  setPosition(x: number, y: number): void {
    this.x = x
    this.y = y
  }

  /**
   * 取得方塊的絕對位置（考慮旋轉）
   */
  getAbsolutePositions(): Position[] {
    const shape = Piece.SHAPES[this.type]
    return shape.blocks.map(({ x, y }) => ({
      x: this.x + x,
      y: this.y + y,
    }))
  }

  /**
   * 移動方塊
   */
  move(dx: number, dy: number): void {
    this.x += dx
    this.y += dy
  }

  /**
   * 取得旋轉狀態
   */
  getRotationState(): RotationState {
    return this.rotationState
  }

  /**
   * 旋轉方塊（順時針）
   */
  rotate(): void {
    this.rotationState = ((this.rotationState + 1) % 4) as RotationState
    // 注意：簡化實現，只改變旋轉狀態
    // 完整實現應該根據旋轉狀態改變方塊的形狀
  }

  /**
   * 建立一個隨機方塊
   */
  static createRandom(x: number = 3, y: number = 0): Piece {
    const types = Object.values(PieceType)
    const randomType = types[Math.floor(Math.random() * types.length)] as PieceType
    return new Piece(randomType, x, y)
  }
}
