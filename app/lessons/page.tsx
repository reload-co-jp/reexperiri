import { FC } from "react"
import {
  Badge,
  Card,
  CardGrid,
  CardTitle,
  SectionTitle,
} from "@/components/elements/card"
import { lessons } from "@/lib/data"

export const metadata = {
  title: "Lessons | reexperiri",
  description: "ロゴ・マスコット制作のレッスン一覧",
}

const Page: FC = () => (
  <div>
    <SectionTitle>Lessons</SectionTitle>
    <CardGrid>
      {lessons().map((lesson) => (
        <Card key={lesson.id} href={`/lessons/${lesson.id}/`}>
          <Badge>{lesson.type}</Badge>
          <CardTitle>{lesson.title}</CardTitle>
          <p
            style={{
              color: "var(--color-fg-muted)",
              fontSize: ".85rem",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {lesson.description}
          </p>
        </Card>
      ))}
    </CardGrid>
  </div>
)

export default Page
