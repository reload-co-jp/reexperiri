export type WorkType = "logo" | "mascot"

export type WorkSettings = {
  motif: string
  style: string
  color: string
}

export type Work = {
  id: string
  type: WorkType
  title: string
  image: string
  prompt: string
  settings: WorkSettings
  storyId?: string
}

export type LessonStep = {
  title: string
  body: string
}

export type Lesson = {
  id: string
  type: WorkType
  title: string
  description: string
  steps: LessonStep[]
}

export type Story = {
  id: string
  title: string
  workId?: string
  date: string
  body: string[]
}

export type GenerateInput = {
  type: WorkType
  settings: WorkSettings
}

export type GenerateResult = {
  svg: string
  dataUri: string
  prompt: string
}
