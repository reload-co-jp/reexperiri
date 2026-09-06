import { FC } from "react"
import {
  Badge,
  CardTitle,
  GalleryItem,
  HorizontalGallery,
  SectionTitle,
  WorkImage,
} from "@/components/elements/card"
import { works } from "@/lib/data"

export const metadata = {
  title: "Works | reexperiri",
  description: "生成した作品のギャラリー",
}

const Page: FC = () => (
  <div>
    <SectionTitle>Works</SectionTitle>
    <HorizontalGallery>
      {works().map((work) => (
        <GalleryItem key={work.id} href={`/works/${work.id}/`}>
          <WorkImage src={work.image} alt={work.title} />
          <CardTitle>{work.title}</CardTitle>
          <Badge>{work.type}</Badge>
        </GalleryItem>
      ))}
    </HorizontalGallery>
  </div>
)

export default Page
