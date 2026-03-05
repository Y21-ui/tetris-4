# 俄羅斯方塊遊戲 (Tetris)

使用 **TDD（測試驅動開發）**、**Vite** 和 **Vitest** 開發的現代俄羅斯方塊遊戲。

## 特色

- ✅ **測試驅動開發（TDD）**：完整的單元測試覆蓋
- ⚡ **Vite**：快速開發和構建
- 🧪 **Vitest**：現代化的測試框架
- 🎮 **完整遊戲機制**：移動、旋轉、行清除、分數系統
- 🚀 **GitHub Actions 部署**：自動部署到 GitHub Pages
- 🎨 **響應式設計**：支持各種螢幕尺寸

## 開發環境要求

- Node.js 18.x 或更高版本
- npm 或 yarn

## 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 開發模式

```bash
npm run dev
```

開發伺服器將啟動在 `http://localhost:3000`

### 3. 執行測試

```bash
npm test
```

查看測試 UI：
```bash
npm run test:ui
```

測試覆蓋率報告：
```bash
npm run test:coverage
```

### 4. 構建生產版本

```bash
npm run build
```

生產版本輸出到 `dist` 目錄

### 5. 預覽生產版本

```bash
npm run preview
```

## 遊戲操作方式

| 操作 | 按鍵 |
|------|------|
| 向左移動 | ← |
| 向右移動 | → |
| 向下移動 | ↓ |
| 快速下降 | 空格 |
| 旋轉 | Z 或 X |
| 暫停/繼續 | P |

## 專案結構

```
tetris-4/
├── src/
│   ├── main.ts              # 應用入口
│   ├── style.css            # 全局樣式
│   ├── game/                # 遊戲核心邏輯
│   │   ├── Board.ts         # 棋盤類
│   │   ├── Piece.ts         # 方塊類
│   │   ├── Game.ts          # 遊戲主類
│   │   └── types.ts         # 類型定義
│   └── ui/
│       └── renderer.ts      # 渲染器
├── tests/                   # 測試文件
│   └── game/
│       ├── Board.test.ts
│       ├── Piece.test.ts
│       └── Game.test.ts
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions 工作流
├── index.html               # HTML 入口
├── package.json             # 項目配置
├── tsconfig.json            # TypeScript 配置
├── vite.config.ts           # Vite 配置
└── vitest.config.ts         # Vitest 配置
```

## 核心類說明

### Board（棋盤）

管理遊戲棋盤的狀態和操作：
- 檢查位置有效性
- 管理單元狀態
- 放置方塊
- 清除完整行

### Piece（方塊）

代表一個 Tetris 方塊：
- 支持所有 7 種標準方塊類型（I, O, T, S, Z, J, L）
- 位置和旋轉管理
- 絕對位置計算

### Game（遊戲）

主遊戲邏輯控制器：
- 方塊生成和管理
- 移動和旋轉控制
- 分數和等級系統
- 遊戲狀態管理
- 行清除邏輯

### Renderer（渲染器）

Canvas 畫布渲染器：
- 繪製棋盤
- 繪製方塊
- 實時更新遊戲視圖

## 測試覆蓋

項目包含全面的單元測試：

- **Board.test.ts**：棋盤功能測試
  - 初始化和尺寸驗證
  - 位置驗證
  - 單元狀態操作
  - 方塊放置和行清除

- **Piece.test.ts**：方塊功能測試
  - 初始化和位置管理
  - 不同方塊形狀
  - 旋轉功能
  - 隨機生成

- **Game.test.ts**：遊戲邏輯測試
  - 初始化
  - 方塊移動和旋轉
  - 遊戲狀態管理
  - 分數和等級系統

運行測試：
```bash
npm test
```

## 自動化部署

項目配置了 GitHub Actions 工作流程，在推送代碼到 `main` 分支時自動：

1. ✅ 執行所有單元測試
2. 📊 生成測試覆蓋率報告
3. 🏗️ 構建生產版本
4. 🚀 部署到 GitHub Pages

查看工作流程配置：[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

## 遊戲規則

1. **降落方塊**：方塊不斷從頂部降落
2. **移動和旋轉**：使用方向鍵移動，Z/X 旋轉
3. **行清除**：當一行被完全填滿時自動清除
4. **分數計算**：
   - 1 行：100 分 × 等級
   - 2 行：300 分 × 等級
   - 3 行：500 分 × 等級
   - 4 行：800 分 × 等級
5. **升級**：每消除 10 行升一級，方塊下降速度加快
6. **遊戲結束**：新方塊無法在初始位置放置時遊戲結束

## 未來增強

- [ ] 完整的 SRS（超級旋轉系統）實現
- [ ] 本地存儲高分記錄
- [ ] 音效和背景音樂
- [ ] 難度等級選擇
- [ ] 多人遊戲模式
- [ ] 暗黑主題支持
- [ ] 移動設備支持優化

## 許可證

MIT

## 貢獻

歡迎提交 Issue 和 Pull Request！

## 聯繫方式

有任何問題或建議，歡迎時開立 Issue。