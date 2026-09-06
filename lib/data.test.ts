import { describe, expect, it } from "vitest"
import {
  lessonById,
  lessons,
  stories,
  storyById,
  workById,
  works,
} from "./data"

describe("data integrity", () => {
  it("has unique ids across each collection", () => {
    for (const items of [lessons(), works(), stories()]) {
      const ids = items.map((item) => item.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it("resolves storyId references from works", () => {
    for (const work of works()) {
      if (work.storyId) {
        expect(storyById(work.storyId)).toBeDefined()
      }
    }
  })

  it("resolves workId references from stories", () => {
    for (const story of stories()) {
      if (story.workId) {
        expect(workById(story.workId)).toBeDefined()
      }
    }
  })

  it("uses valid work types and image paths", () => {
    for (const work of works()) {
      expect(["logo", "mascot"]).toContain(work.type)
      expect(work.image).toMatch(/^\/images\/works\/.+\.(svg|png)$/)
    }
  })

  it("sorts stories by date descending", () => {
    const dates = stories().map((story) => story.date)
    expect(dates).toEqual([...dates].sort().reverse())
  })

  it("finds items by id", () => {
    expect(lessonById("lesson-001")?.type).toBe("logo")
    expect(workById("work-002")?.title).toBe("Rのロゴ")
    expect(lessonById("nope")).toBeUndefined()
  })
})
