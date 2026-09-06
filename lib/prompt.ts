import { WorkSettings, WorkType } from "./types"

const typeLabels: Record<WorkType, string> = {
  logo: "ロゴ",
  mascot: "マスコット",
}

// 形容詞(〜い)はそのまま、形容動詞などは「な」で接続する
const styleModifier = (style: string): string =>
  style.endsWith("い") ? style : `${style}な`

export const buildPrompt = (type: WorkType, settings: WorkSettings): string => {
  const { motif, style, color } = settings
  return `${styleModifier(style)}${motif}の${typeLabels[type]}、${color}`
}
