import { describe, expect, it } from "vitest"
import { buildPrompt } from "./prompt"

describe("buildPrompt", () => {
  it("builds a mascot prompt with an i-adjective style", () => {
    expect(
      buildPrompt("mascot", { motif: "猫", style: "かわいい", color: "青" }),
    ).toBe("かわいい猫のマスコット、青")
  })

  it("builds a logo prompt with a na-adjective style", () => {
    expect(
      buildPrompt("logo", { motif: "R", style: "シンプル", color: "緑" }),
    ).toBe("シンプルなRのロゴ、緑")
  })

  it("connects noun-like styles with な", () => {
    expect(
      buildPrompt("mascot", { motif: "パン", style: "元気", color: "橙" }),
    ).toBe("元気なパンのマスコット、橙")
  })
})
