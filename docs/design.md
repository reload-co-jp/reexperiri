# reexperiri 詳細設計

README.md の MVP 仕様に基づく詳細設計。

## 1. 技術構成

- Next.js 16 (App Router) / React 19 / TypeScript
- `output: "export"` による静的エクスポート(既存 next.config.js を維持)
- DB なし。JSON + 画像ファイルを Git 管理
- テスト: Vitest + Testing Library

### 静的エクスポートに伴う設計判断

`output: "export"` では API Route が使えないため、画像生成はクライアント側で完結させる。
MVP ではユーザー設定(モチーフ・スタイル・色)から決定的に SVG を合成するローカル生成器を実装し、
生成器はインターフェース(`GenerateInput → GenerateResult`)で抽象化する。
将来、外部の画像生成 API へ差し替える場合はこの実装のみ交換する。

生成した作品の「保存」は以下の 2 段構え。

1. ブラウザの localStorage へ保存(ユーザー自身の作品一覧)
2. SVG ファイルとしてダウンロード → リポジトリの `data/works/works.json` と
   `public/images/works/` へ手動コミット(キュレーションされた公開作品)

## 2. ディレクトリ構成

```text
app/
├── layout.tsx              # 全体レイアウト + ナビゲーション
├── page.tsx                # ホーム(概要 + 最新作品)
├── lessons/
│   ├── page.tsx            # レッスン一覧
│   └── [id]/page.tsx       # レッスン詳細
├── create/
│   ├── page.tsx            # 作成タイプ選択(logo / mascot)
│   ├── logo/page.tsx       # ロゴ作成
│   └── mascot/page.tsx     # マスコット作成
├── works/
│   ├── page.tsx            # ギャラリー(作品一覧)
│   └── [id]/page.tsx       # 作品詳細(設定・プロンプト・関連ストーリー)
└── stories/
    ├── page.tsx            # ストーリー一覧
    └── [id]/page.tsx       # ストーリー詳細

lib/
├── types.ts                # Lesson / Work / Story / 生成関連の型定義
├── data.ts                 # JSON 読み込み + id 検索
├── prompt.ts               # 設定 → プロンプト文字列生成
└── generator.ts            # 設定 → SVG 生成(ローカル生成器)

components/
├── elements/
│   ├── layout.tsx          # 既存(Header / Main / Footer / Title)
│   ├── card.tsx            # 一覧カード・グリッド
│   └── nav.tsx             # ヘッダーナビゲーション
└── create/
    └── creator.tsx         # 作成フォーム + プレビュー + 保存(client)

data/
├── lessons/lessons.json
├── works/works.json
└── stories/stories.json

public/images/works/        # 作品画像(SVG)
```

## 3. データモデル

### Lesson

```json
{
  "id": "lesson-001",
  "type": "logo",
  "title": "ロゴ制作の基本",
  "description": "1行説明",
  "steps": [{ "title": "手順名", "body": "手順の説明" }]
}
```

### Work(README 準拠)

```json
{
  "id": "work-001",
  "type": "mascot",
  "title": "ねこのマスコット",
  "image": "/images/works/work-001.svg",
  "prompt": "かわいい猫のマスコット",
  "settings": { "motif": "猫", "style": "かわいい", "color": "青" },
  "storyId": "story-001"
}
```

`type` は `"logo" | "mascot"`。`storyId` は任意(ストーリー未執筆の作品を許容)。

### Story

```json
{
  "id": "story-001",
  "title": "はじめてのマスコット制作",
  "workId": "work-001",
  "date": "2026-09-01",
  "body": ["段落1", "段落2"]
}
```

### 型定義(lib/types.ts)

```ts
type WorkType = "logo" | "mascot"
type WorkSettings = { motif: string; style: string; color: string }
type Work = { id; type; title; image; prompt; settings; storyId? }
type Lesson = { id; type; title; description; steps: LessonStep[] }
type Story = { id; title; workId?; date; body: string[] }
```

## 4. データアクセス(lib/data.ts)

JSON を直接 import(`resolveJsonModule` 済み)。サーバコンポーネントから同期呼び出し。

- `lessons(): Lesson[]` / `lessonById(id)`
- `works(): Work[]` / `workById(id)` / `worksByType(type)`
- `stories(): Story[]` / `storyById(id)` / `storyByWorkId(workId)`

動的ルート(`[id]`)は `generateStaticParams` で JSON の全 id を列挙。
不明 id は `notFound()`。

## 5. 画像生成

### フロー(README 準拠)

```text
ユーザー入力(motif / style / color)
    ↓ lib/prompt.ts
プロンプト生成("かわいい猫のマスコット、青" 形式)
    ↓ lib/generator.ts
SVG 生成(決定的: 入力ハッシュ → 形状・配色)
    ↓ creator.tsx
プレビュー表示(data URI)
    ↓
保存(localStorage + SVG ダウンロード)
```

### lib/prompt.ts

`buildPrompt(type, settings): string`
形式: `{style}{motif}の{ロゴ|マスコット}、{color}`

### lib/generator.ts

`generate(input: GenerateInput): GenerateResult`

- `GenerateInput = { type: WorkType; settings: WorkSettings }`
- `GenerateResult = { svg: string; dataUri: string; prompt: string }`
- 入力文字列の FNV-1a ハッシュを乱数シードにし、同一入力 → 同一画像(決定的)
- color 名(青/赤/緑/黄/紫/桃/橙/黒 + 任意 CSS 色)→ パレット解決
- logo: モチーフ頭文字 + 幾何図形の組み合わせ
- mascot: 円ベースの顔(耳・目・口)をシードで変形

### components/create/creator.tsx("use client")

- props: `type: WorkType`
- フォーム: motif(text)、style(select)、color(select)
- 「生成」→ `generate()` → `<img src={dataUri}>` プレビュー
- 「保存」→ localStorage(key: `reexperiri-works`)へ追記 + ページ内一覧更新
- 「ダウンロード」→ SVG ファイル(`{motif}-{type}.svg`)
- localStorage の読み書きは try/catch で保護

## 6. 画面設計

- **layout.tsx**: Header に Title(reexperiri) + Nav(Lessons / Create / Works / Stories)。
  metadata を README の概要文に更新
- **/**: サービス概要、基本フロー(レッスン → 作成 → 作品 → ストーリー)への導線、最新作品 3 件
- **/lessons**: type バッジ付きカード一覧
- **/lessons/[id]**: steps を順序付きで表示。末尾に「作ってみる」→ `/create/{type}/`
- **/create**: logo / mascot の選択カード
- **/create/logo, /create/mascot**: Creator コンポーネント
- **/works**: 全作品グリッド(ギャラリー)
- **/works/[id]**: 画像 + prompt + settings + 関連ストーリーへのリンク
- **/stories**: 日付降順一覧
- **/stories/[id]**: 本文段落表示 + 関連作品カード

スタイルは既存踏襲(インライン style、ダークトーン)。

## 7. テスト

- `lib/prompt.test.ts`: プロンプト文字列の形式
- `lib/generator.test.ts`: 決定性(同一入力同一出力)、SVG 妥当性、色解決
- `lib/data.test.ts`: JSON 整合性(id 一意、storyId/workId 参照解決、画像パス形式)
- `components/create/creator.test.tsx`: 入力 → 生成 → プレビュー表示、保存
