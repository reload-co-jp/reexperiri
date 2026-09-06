"use client"

import { FC, FormEvent, useMemo, useState, useSyncExternalStore } from "react"
import { generate } from "@/lib/generator"
import { GenerateResult, WorkSettings, WorkType } from "@/lib/types"

const STORAGE_KEY = "reexperiri-works"

type SavedWork = {
  type: WorkType
  prompt: string
  settings: WorkSettings
  dataUri: string
  savedAt: string
}

// localStorage を SSR 安全に読み書きする小さなストア
const emptySaved: SavedWork[] = []
let savedCache: SavedWork[] | null = null
const savedListeners = new Set<() => void>()

const getSavedSnapshot = (): SavedWork[] => {
  if (savedCache === null) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      savedCache = raw ? (JSON.parse(raw) as SavedWork[]) : emptySaved
    } catch {
      savedCache = emptySaved
    }
  }
  return savedCache
}

const subscribeSaved = (listener: () => void) => {
  savedListeners.add(listener)
  return () => savedListeners.delete(listener)
}

const saveWork = (work: SavedWork) => {
  savedCache = [...getSavedSnapshot(), work]
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedCache))
  } catch {
    // localStorage 不可の環境でも画面上の一覧には反映する
  }
  for (const listener of savedListeners) listener()
}

const styleOptions: Record<WorkType, string[]> = {
  logo: ["シンプル", "力強い", "やわらかい", "レトロ"],
  mascot: ["かわいい", "元気", "のんびり", "クール"],
}

const colorOptions = ["青", "赤", "緑", "黄", "紫", "桃", "橙", "黒"]

const typeLabels: Record<WorkType, string> = {
  logo: "ロゴ",
  mascot: "マスコット",
}

const fieldStyle = {
  backgroundColor: "var(--color-surface-strong)",
  border: "none",
  borderRadius: ".25rem",
  color: "var(--color-fg)",
  padding: ".5rem",
} as const

const buttonStyle = {
  backgroundColor: "var(--color-accent)",
  border: "none",
  borderRadius: ".25rem",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 700,
  padding: ".5rem 1.5rem",
} as const

export const Creator: FC<{ type: WorkType }> = ({ type }) => {
  const [motif, setMotif] = useState("")
  const [style, setStyle] = useState(styleOptions[type][0])
  const [color, setColor] = useState(colorOptions[0])
  const [result, setResult] = useState<GenerateResult | null>(null)
  const savedAll = useSyncExternalStore(
    subscribeSaved,
    getSavedSnapshot,
    () => emptySaved,
  )
  const saved = useMemo(
    () => savedAll.filter((work) => work.type === type),
    [savedAll, type],
  )

  const handleGenerate = (event: FormEvent) => {
    event.preventDefault()
    if (!motif.trim()) return
    setResult(generate({ type, settings: { motif: motif.trim(), style, color } }))
  }

  const handleSave = () => {
    if (!result) return
    saveWork({
      type,
      prompt: result.prompt,
      settings: { motif: motif.trim(), style, color },
      dataUri: result.dataUri,
      savedAt: new Date().toISOString(),
    })
  }

  const handleDownload = () => {
    if (!result) return
    const blob = new Blob([result.svg], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = `${motif.trim() || type}-${type}.svg`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section>
      <form
        onSubmit={handleGenerate}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          alignItems: "flex-end",
        }}
      >
        <label style={{ display: "grid", gap: ".25rem" }}>
          モチーフ
          <input
            type="text"
            value={motif}
            onChange={(event) => setMotif(event.target.value)}
            placeholder={type === "logo" ? "例: R、猫" : "例: 猫、パン"}
            style={fieldStyle}
          />
        </label>
        <label style={{ display: "grid", gap: ".25rem" }}>
          スタイル
          <select
            value={style}
            onChange={(event) => setStyle(event.target.value)}
            style={fieldStyle}
          >
            {styleOptions[type].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label style={{ display: "grid", gap: ".25rem" }}>
          色
          <select
            value={color}
            onChange={(event) => setColor(event.target.value)}
            style={fieldStyle}
          >
            {colorOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" style={buttonStyle}>
          生成
        </button>
      </form>
      {result && (
        <div style={{ marginTop: "1.5rem" }}>
          <p style={{ margin: "0 0 .5rem" }}>プロンプト: {result.prompt}</p>
          <img
            src={result.dataUri}
            alt={result.prompt}
            width={320}
            height={320}
            style={{ borderRadius: ".5rem", maxWidth: "100%" }}
          />
          <div style={{ display: "flex", gap: ".5rem", marginTop: ".5rem" }}>
            <button type="button" onClick={handleSave} style={buttonStyle}>
              保存
            </button>
            <button
              type="button"
              onClick={handleDownload}
              style={{ ...buttonStyle, backgroundColor: "var(--color-surface-strong)" }}
            >
              ダウンロード
            </button>
          </div>
        </div>
      )}
      {saved.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              margin: "0 0 1rem",
            }}
          >
            保存した{typeLabels[type]}
          </h2>
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {saved.map((work) => (
              <li key={work.savedAt}>
                <img
                  src={work.dataUri}
                  alt={work.prompt}
                  width={120}
                  height={120}
                  style={{ borderRadius: ".5rem" }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
