import { beforeEach, describe, expect, it } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { Creator } from "./creator"

describe("Creator", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("renders the form fields", () => {
    render(<Creator type="mascot" />)
    expect(screen.getByLabelText("モチーフ")).toBeInTheDocument()
    expect(screen.getByLabelText("スタイル")).toBeInTheDocument()
    expect(screen.getByLabelText("色")).toBeInTheDocument()
  })

  it("generates a preview from the input", () => {
    render(<Creator type="mascot" />)
    fireEvent.change(screen.getByLabelText("モチーフ"), {
      target: { value: "猫" },
    })
    fireEvent.click(screen.getByRole("button", { name: "生成" }))
    expect(
      screen.getByText("プロンプト: かわいい猫のマスコット、青"),
    ).toBeInTheDocument()
    expect(
      screen.getByAltText("かわいい猫のマスコット、青"),
    ).toBeInTheDocument()
  })

  it("does not generate without a motif", () => {
    render(<Creator type="logo" />)
    fireEvent.click(screen.getByRole("button", { name: "生成" }))
    expect(screen.queryByText(/プロンプト:/)).not.toBeInTheDocument()
  })

  it("saves a generated work to localStorage and lists it", () => {
    render(<Creator type="mascot" />)
    fireEvent.change(screen.getByLabelText("モチーフ"), {
      target: { value: "猫" },
    })
    fireEvent.click(screen.getByRole("button", { name: "生成" }))
    fireEvent.click(screen.getByRole("button", { name: "保存" }))
    expect(screen.getByText("保存したマスコット")).toBeInTheDocument()
    const saved = JSON.parse(localStorage.getItem("reexperiri-works") ?? "[]")
    expect(saved).toHaveLength(1)
    expect(saved[0].prompt).toBe("かわいい猫のマスコット、青")
  })
})
