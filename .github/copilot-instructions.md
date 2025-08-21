# Copilot Instructions for lifespan-map

## プロジェクト概要
- 日本全国の寿命・日照時間等の地理データをMapLibre GL JS + Reactで可視化するWebアプリ。
- 地図タイルはPMTiles形式（`public/data/*.pmtiles`）で管理。
- 複数レイヤー（例：`healthy_lifespan`, `sunshine_hours`）を切り替え可能。

## 主要ディレクトリ・ファイル
- `src/`：アプリ本体（`App.tsx`がエントリーポイント）
	- `components/MapView.tsx`：地図表示・初期化・コントロール追加の中心
	- `components/LegendItem.tsx`：地図凡例のUI部品
	- `utils/onMapLoad.ts`：地図画像アイコンのロード
	- `utils/popup.ts`：地図クリック時のポップアップ生成
	- `utils/pointer.ts`：地図上のポインタ挙動制御
- `public/styles/style.json`：MapLibre用スタイル定義。レイヤーやソースの追加・編集はここを編集。
- `public/data/`：地図タイル（PMTiles形式）
- `public/img/`：地図上のアイコン画像

## 開発ワークフロー
- 依存インストール：`npm install`
- 開発サーバー起動：`npm run dev`
- ビルド：`npm run build`
- Lint：`npm run lint`
- デプロイ：`npm run deploy`（GitHub Pages）

## 地図・データ構造
- `style.json`の`sources`で地図タイル（例：`healthy_lifespan`, `sunshine_hours`）を定義
- `layers`で地図上の描画レイヤーを定義（例：健康寿命分布、日照時間）
- 各レイヤーは`source-layer`でPMTiles内のレイヤー名を指定
- 属性値によるフィルタや色分けは`paint`や`filter`で制御

## コーディング規約・パターン
- React関数コンポーネント＋TypeScript
- 地図操作は`MapView.tsx`と`utils/onMapLoad.ts`が中心
- 凡例やポップアップは`components/LegendItem.tsx`や`utils/popup.ts`参照
- データ追加時は`style.json`と`public/data/`の両方を更新

## 注意点
- PMTilesの追加時は`style.json`の`sources`/`layers`も必ず更新
- 地図スタイルやレイヤー追加時は`minzoom`/`maxzoom`や`filter`条件に注意
- 画像やフォントは`public/img/`, `public/font/`配下に配置

---

このガイドはAIエージェント向けです。プロジェクト固有の構成・ワークフロー・パターンを優先して反映してください。
