import { buildPrompt } from "./prompt"
import { GenerateInput, GenerateResult } from "./types"

const SIZE = 320

const palettes: Record<string, { main: string; accent: string }> = {
  青: { main: "#3b82f6", accent: "#1d4ed8" },
  赤: { main: "#ef4444", accent: "#b91c1c" },
  緑: { main: "#22c55e", accent: "#15803d" },
  黄: { main: "#eab308", accent: "#a16207" },
  紫: { main: "#a855f7", accent: "#7e22ce" },
  桃: { main: "#ec4899", accent: "#be185d" },
  橙: { main: "#f97316", accent: "#c2410c" },
  黒: { main: "#374151", accent: "#111827" },
}

// FNV-1a: 同一入力から同一シードを得る
const hash = (text: string): number => {
  let value = 0x811c9dc5
  for (const char of text) {
    value ^= char.codePointAt(0) ?? 0
    value = Math.imul(value, 0x01000193)
  }
  return value >>> 0
}

// mulberry32: シードから決定的な乱数列を生成
const createRandom = (seed: number): (() => number) => {
  let state = seed
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const resolveColor = (
  color: string,
): { main: string; accent: string } => {
  const palette = palettes[color]
  if (palette) return palette
  const random = createRandom(hash(color))
  const hue = Math.floor(random() * 360)
  return {
    main: `hsl(${hue}, 70%, 55%)`,
    accent: `hsl(${hue}, 70%, 35%)`,
  }
}

const escapeXml = (text: string): string =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")

const logoSvg = (
  motif: string,
  random: () => number,
  main: string,
  accent: string,
): string => {
  const initial = escapeXml([...motif][0] ?? "?")
  const shapes = ["circle", "square", "diamond"] as const
  const shape = shapes[Math.floor(random() * shapes.length)]
  const rotation = Math.floor(random() * 30) - 15
  const half = SIZE / 2
  const radius = 110
  const backdrop =
    shape === "circle"
      ? `<circle cx="${half}" cy="${half}" r="${radius}" fill="${main}" />`
      : shape === "square"
        ? `<rect x="${half - radius}" y="${half - radius}" width="${radius * 2}" height="${radius * 2}" rx="24" fill="${main}" transform="rotate(${rotation} ${half} ${half})" />`
        : `<rect x="${half - radius}" y="${half - radius}" width="${radius * 2}" height="${radius * 2}" rx="24" fill="${main}" transform="rotate(45 ${half} ${half})" />`
  return [
    `<rect width="${SIZE}" height="${SIZE}" fill="#f8fafc" />`,
    backdrop,
    `<circle cx="${half}" cy="${half}" r="${radius - 26}" fill="none" stroke="${accent}" stroke-width="6" />`,
    `<text x="${half}" y="${half}" font-family="sans-serif" font-size="120" font-weight="bold" fill="#ffffff" text-anchor="middle" dominant-baseline="central">${initial}</text>`,
  ].join("")
}

const mascotSvg = (
  random: () => number,
  main: string,
  accent: string,
): string => {
  const half = SIZE / 2
  const faceRadius = 100 + Math.floor(random() * 20)
  const earRadius = 28 + Math.floor(random() * 16)
  const earOffset = faceRadius * 0.7
  const eyeGap = 34 + Math.floor(random() * 14)
  const eyeRadius = 8 + Math.floor(random() * 5)
  const mouthWidth = 30 + Math.floor(random() * 24)
  const smile = 10 + Math.floor(random() * 16)
  const cheeks = random() < 0.6
  const faceY = half + 16
  const eyeY = faceY - 20
  const mouthY = faceY + 28
  return [
    `<rect width="${SIZE}" height="${SIZE}" fill="#f8fafc" />`,
    `<circle cx="${half - earOffset}" cy="${faceY - earOffset}" r="${earRadius}" fill="${accent}" />`,
    `<circle cx="${half + earOffset}" cy="${faceY - earOffset}" r="${earRadius}" fill="${accent}" />`,
    `<circle cx="${half}" cy="${faceY}" r="${faceRadius}" fill="${main}" />`,
    cheeks
      ? `<circle cx="${half - eyeGap - 18}" cy="${eyeY + 34}" r="12" fill="${accent}" opacity="0.5" /><circle cx="${half + eyeGap + 18}" cy="${eyeY + 34}" r="12" fill="${accent}" opacity="0.5" />`
      : "",
    `<circle cx="${half - eyeGap}" cy="${eyeY}" r="${eyeRadius}" fill="#111827" />`,
    `<circle cx="${half + eyeGap}" cy="${eyeY}" r="${eyeRadius}" fill="#111827" />`,
    `<path d="M ${half - mouthWidth} ${mouthY} Q ${half} ${mouthY + smile} ${half + mouthWidth} ${mouthY}" fill="none" stroke="#111827" stroke-width="6" stroke-linecap="round" />`,
  ].join("")
}

export const generate = (input: GenerateInput): GenerateResult => {
  const { type, settings } = input
  const prompt = buildPrompt(type, settings)
  const random = createRandom(hash(`${type}:${prompt}`))
  const { main, accent } = resolveColor(settings.color)
  const body =
    type === "logo"
      ? logoSvg(settings.motif, random, main, accent)
      : mascotSvg(random, main, accent)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}" role="img" aria-label="${escapeXml(prompt)}">${body}</svg>`
  return {
    svg,
    dataUri: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
    prompt,
  }
}
