import { FC } from "react"
import { Card, CardGrid, SectionTitle } from "@/components/elements/card"
import { stories } from "@/lib/data"

export const metadata = {
  title: "Stories | reexperiri",
  description: "制作過程・体験記の一覧",
}

const Page: FC = () => (
  <div style={{ color: "#e5e7eb" }}>
    <SectionTitle>Stories</SectionTitle>
    <CardGrid>
      {stories().map((story) => (
        <Card key={story.id} href={`/stories/${story.id}/`}>
          <p style={{ fontSize: ".8rem", margin: "0 0 .25rem", opacity: 0.7 }}>
            {story.date}
          </p>
          <p style={{ fontWeight: "bold", margin: 0 }}>{story.title}</p>
        </Card>
      ))}
    </CardGrid>
  </div>
)

export default Page
