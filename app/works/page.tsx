import { FC } from "react"
import {
  Badge,
  Card,
  CardGrid,
  SectionTitle,
  WorkImage,
} from "@/components/elements/card"
import { works } from "@/lib/data"

export const metadata = {
  title: "Works | reexperiri",
  description: "生成した作品のギャラリー",
}

const Page: FC = () => (
  <div style={{ color: "#e5e7eb" }}>
    <SectionTitle>Works</SectionTitle>
    <CardGrid>
      {works().map((work) => (
        <Card key={work.id} href={`/works/${work.id}/`}>
          <WorkImage src={work.image} alt={work.title} />
          <p style={{ margin: ".5rem 0 .25rem" }}>{work.title}</p>
          <Badge>{work.type}</Badge>
        </Card>
      ))}
    </CardGrid>
  </div>
)

export default Page
