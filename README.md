# 平均寿命・日照時間マップ

このプロジェクトは、日本全国の平均寿命や日照時間などの地理データを、MapLibre GL JS + React を用いて可視化するWebアプリです。

## 主な機能
- PMTiles形式の地図タイルを利用し、都道府県単位の平均寿命・日照時間等を地図上に表示
- 複数レイヤー（例：平均寿命、日照時間）の切り替え
- 地図クリックで詳細ポップアップ表示

## デモ
- [GitHub Pagesで公開中](https://hirofumikanda.github.io/lifespan-map/)

## セットアップ手順
1. 依存ライブラリのインストール
   ```bash
   npm install
   ```
2. 開発サーバーの起動
   ```bash
   npm run dev
   ```

## ディレクトリ構成
- `src/`：アプリ本体
  - `components/MapView.tsx`：地図表示・初期化
  - `components/LegendItem.tsx`：凡例UI
  - `utils/`：地図操作・ポップアップ等
- `public/styles/style.json`：MapLibreスタイル定義
- `public/data/`：PMTiles地図データ

## 技術スタック
- [MapLibre GL JS](https://maplibre.org/)
- [pmtiles](https://github.com/protomaps/PMTiles)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## データ・ライセンス
- 都道府県行政区域：[国土数値情報（行政区域）](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N03-2025.html)
- 日照時間：[e-Stat（社会・人口統計体系 都道府県データ 基礎データ）](https://www.e-stat.go.jp/dbview?sid=0000010102)
- 平均寿命：[e-Stat（生命表 / 都道府県別生命表 令和２年都道府県別生命表）](https://www.e-stat.go.jp/stat-search/files?page=1&stat_infid=000032268110)
- 本リポジトリはMITライセンスです。
