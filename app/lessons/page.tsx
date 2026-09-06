import { FC } from "react"
import { Badge, Card, CardGrid, SectionTitle } from "@/components/elements/card"
import { lessons } from "@/lib/data"

export const metadata = {
  title: "Lessons | reexperiri",
  description: "ロゴ・マスコット制作のレッスン一覧",
}

const Page: FC = () => (
  <div style={{ color: "#e5e7eb" }}>
    <SectionTitle>Lessons</SectionTitle>
    <CardGrid>
      {lessons().map((lesson) => (
        <Card key={lesson.id} href={`/lessons/${lesson.id}/`}>
          <Badge>{lesson.type}</Badge>
          <p style={{ fontWeight: "bold", margin: ".5rem 0 .25rem" }}>
            {lesson.title}
          </p>
          <p style={{ fontSize: ".85rem", margin: 0, opacity: 0.8 }}>
            {lesson.description}
          </p>
        </Card>
      ))}
    </CardGrid>
  </div>
)

export default Page
