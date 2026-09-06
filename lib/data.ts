import lessonsJson from "@/data/lessons/lessons.json"
import worksJson from "@/data/works/works.json"
import storiesJson from "@/data/stories/stories.json"
import { Lesson, Story, Work, WorkType } from "./types"

export const lessons = (): Lesson[] => lessonsJson as Lesson[]

export const lessonById = (id: string): Lesson | undefined =>
  lessons().find((lesson) => lesson.id === id)

export const works = (): Work[] => worksJson as Work[]

export const workById = (id: string): Work | undefined =>
  works().find((work) => work.id === id)

export const worksByType = (type: WorkType): Work[] =>
  works().filter((work) => work.type === type)

export const stories = (): Story[] =>
  (storiesJson as Story[]).toSorted((a, b) => b.date.localeCompare(a.date))

export const storyById = (id: string): Story | undefined =>
  stories().find((story) => story.id === id)

export const storyByWorkId = (workId: string): Story | undefined =>
  stories().find((story) => story.workId === workId)

export const worksByChapter = (
  lessonId: string,
  chapterIndex: number,
): Work[] =>
  works().filter(
    (work) => work.lessonId === lessonId && work.chapterIndex === chapterIndex,
  )

export const storiesByChapter = (
  lessonId: string,
  chapterIndex: number,
): Story[] =>
  stories().filter(
    (story) =>
      story.lessonId === lessonId && story.chapterIndex === chapterIndex,
  )
