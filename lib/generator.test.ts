import { describe, expect, it } from "vitest"
import { generate, resolveColor } from "./generator"
import { GenerateInput } from "./types"

const input: GenerateInput = {
  type: "mascot",
  settings: { motif: "猫", style: "かわいい", color: "青" },
}

describe("generate", () => {
  it("is deterministic for the same input", () => {
    expect(generate(input)).toEqual(generate(input))
  })

  it("produces different images for different inputs", () => {
    const other = generate({
      ...input,
      settings: { ...input.settings, motif: "犬" },
    })
    expect(other.svg).not.toBe(generate(input).svg)
  })

  it("returns a valid svg document", () => {
    const { svg } = generate(input)
    expect(svg).toMatch(/^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)
    expect(svg).toMatch(/<\/svg>$/)
    expect(() =>
      new DOMParser().parseFromString(svg, "image/svg+xml"),
    ).not.toThrow()
  })

  it("returns a data uri and the built prompt", () => {
    const result = generate(input)
    expect(result.dataUri.startsWith("data:image/svg+xml;utf8,")).toBe(true)
    expect(result.prompt).toBe("かわいい猫のマスコット、青")
  })

  it("renders the logo initial for logo type", () => {
    const { svg } = generate({
      type: "logo",
      settings: { motif: "Reload", style: "シンプル", color: "緑" },
    })
    expect(svg).toContain(">R</text>")
  })

  it("escapes xml special characters in the motif", () => {
    const { svg } = generate({
      type: "logo",
      settings: { motif: "<script>", style: "シンプル", color: "青" },
    })
    expect(svg).not.toContain("<script>")
  })
})

describe("resolveColor", () => {
  it("resolves known color names to the palette", () => {
    expect(resolveColor("青").main).toBe("#3b82f6")
  })

  it("derives a deterministic color for unknown names", () => {
    expect(resolveColor("未知の色")).toEqual(resolveColor("未知の色"))
    expect(resolveColor("未知の色").main).toMatch(/^hsl\(/)
  })
})
