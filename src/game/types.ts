// 棋盤單元的類型
export type CellState = 0 | 1; // 0: 空, 1: 有方塊

// 方塊類型
export enum PieceType {
  I = 'I', // ─────
  O = 'O', // ██
  T = 'T', // ███
  S = 'S', // ─██
  Z = 'Z', // ██─
  J = 'J', // ███
  L = 'L', // ███
}

// 方塊的旋轉狀態
export type RotationState = 0 | 1 | 2 | 3;

// 座標
export interface Position {
  x: number;
  y: number;
}

// 方塊的形狀定義
export interface PieceShape {
  type: PieceType;
  blocks: Position[]; // 相對於左上角的座標
  color: string;
}

// 遊戲狀態
export enum GameState {
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  GAME_OVER = 'GAME_OVER',
}
