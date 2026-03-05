import { PieceType, Position, RotationState, PieceShape } from './types'

export class Piece {
  private type: PieceType
  private rotationState: RotationState
  private x: number
  private y: number
  private color: string

  // 定義所有方塊形狀（所有旋轉狀態）
  private static readonly ROTATIONS: Record<PieceType, Position[][]> = {
    [PieceType.I]: [
      // 旋轉狀態 0
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
      ],
      // 旋轉狀態 1
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 0, y: 3 },
      ],
      // 旋轉狀態 2（與 0 相同）
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
      ],
      // 旋轉狀態 3（與 1 相同）
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 0, y: 3 },
      ],
    ],
    [PieceType.O]: [
      // O 方塊旋轉後形狀不變
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
    ],
    [PieceType.T]: [
      // 旋轉狀態 0
      [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      // 旋轉狀態 1（順時針旋轉 90°）
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 0, y: 2 },
      ],
      // 旋轉狀態 2（順時針旋轉 180°）
      [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 1, y: 2 },
      ],
      // 旋轉狀態 3（順時針旋轉 270°）
      [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ],
    ],
    [PieceType.S]: [
      // 旋轉狀態 0
      [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      // 旋轉狀態 1
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ],
      // 旋轉狀態 2（與 0 相同）
      [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      // 旋轉狀態 3（與 1 相同）
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ],
    ],
    [PieceType.Z]: [
      // 旋轉狀態 0
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      // 旋轉狀態 1
      [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 0, y: 2 },
      ],
      // 旋轉狀態 2（與 0 相同）
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      // 旋轉狀態 3（與 1 相同）
      [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 0, y: 2 },
      ],
    ],
    [PieceType.J]: [
      // 旋轉狀態 0
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      // 旋轉狀態 1
      [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 0, y: 2 },
      ],
      // 旋轉狀態 2
      [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 2, y: 0 },
      ],
      // 旋轉狀態 3
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ],
    ],
    [PieceType.L]: [
      // 旋轉狀態 0
      [
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      // 旋轉狀態 1
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
      ],
      // 旋轉狀態 2
      [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 0, y: 0 },
      ],
      // 旋轉狀態 3
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ],
    ],
  }

  // 定義顏色
  private static readonly COLORS: Record<PieceType, string> = {
    [PieceType.I]: '#00f0f0',
    [PieceType.O]: '#f0f000',
    [PieceType.T]: '#a000f0',
    [PieceType.S]: '#00f000',
    [PieceType.Z]: '#f00000',
    [PieceType.J]: '#0000f0',
    [PieceType.L]: '#f0a000',
  }

  constructor(type: PieceType, x: number = 3, y: number = 0) {
    this.type = type
    this.x = x
    this.y = y
    this.rotationState = 0
    this.color = Piece.COLORS[type]
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
   * 取得方塊的絕對位置（根據旋轉）
   */
  getAbsolutePositions(): Position[] {
    const blocks = Piece.ROTATIONS[this.type][this.rotationState]
    return blocks.map(({ x, y }) => ({
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
  }

  /**
   * 反向旋轉方塊（逆時針）
   */
  rotateCounterClockwise(): void {
    this.rotationState = ((this.rotationState + 3) % 4) as RotationState
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
