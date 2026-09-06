# reexperiri MVP仕様書

## 1. 概要

**reexperiri** は、自分のロゴやマスコットを作りながら、その制作方法や体験を学べるWebメディア。

> 自分のロゴやマスコットを、自分で作ってみる。

## 2. MVP機能

* **Lessons**：ロゴ・マスコット制作のレッスン
* **Create**：Web上で画像を生成
* **Works**：生成した作品を表示
* **Stories**：制作過程・体験記を掲載
* **Gallery**：作品を一覧表示

## 3. 画面構成

```text
/
├── lessons/
├── create/
│   ├── logo/
│   └── mascot/
├── works/
└── stories/
```

## 4. データ管理

DBは使用せず、JSONと画像ファイルをGitで管理する。

```text
data/
├── lessons/lessons.json
├── works/works.json
└── stories/stories.json

public/
└── images/
    ├── lessons/
    └── works/
```

### Work

```json
{
  "id": "work-001",
  "type": "mascot",
  "title": "ねこのマスコット",
  "image": "/images/works/work-001.png",
  "prompt": "かわいい猫のマスコット",
  "settings": {
    "motif": "猫",
    "style": "かわいい",
    "color": "青"
  },
  "storyId": "story-001"
}
```

## 5. 画像生成

```text
ユーザー入力
    ↓
プロンプト生成
    ↓
画像生成API
    ↓
画像表示
    ↓
作品として保存
```

## 6. 基本フロー

```text
レッスンを読む
    ↓
作ってみる
    ↓
画像生成
    ↓
作品を見る
    ↓
制作体験を読む
    ↓
ギャラリーを見る
```

