import { FC } from "react"
import {
  Card,
  CardGrid,
  CardTitle,
  SectionTitle,
} from "@/components/elements/card"
import { stories } from "@/lib/data"

export const metadata = {
  title: "Stories | reexperiri",
  description: "制作過程・体験記の一覧",
}

const Page: FC = () => (
  <div>
    <SectionTitle>Stories</SectionTitle>
    <CardGrid>
      {stories().map((story) => (
        <Card key={story.id} href={`/stories/${story.id}/`}>
          <p
            style={{
              color: "var(--color-fg-muted)",
              fontSize: ".8rem",
              margin: "0 0 .25rem",
            }}
          >
            {story.date}
          </p>
          <CardTitle>{story.title}</CardTitle>
        </Card>
      ))}
    </CardGrid>
  </div>
)

export default Page
