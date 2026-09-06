import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Badge,
  CardTitle,
  SectionTitle,
  WorkImage,
} from "@/components/elements/card"
import { stories, storyById, workById } from "@/lib/data"

export const generateStaticParams = () =>
  stories().map((story) => ({ id: story.id }))

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const story = storyById(id)
  return {
    title: `${story?.title ?? "Story"} | reexperiri`,
    description: story?.body[0],
  }
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const story = storyById(id)
  if (!story) notFound()
  const work = story.workId ? workById(story.workId) : undefined
  return (
    <article style={{ margin: "0 auto", maxWidth: "42rem" }}>
      <p
        style={{
          color: "var(--color-fg-muted)",
          fontSize: ".85rem",
          margin: "0 0 .5rem",
        }}
      >
        {story.date}
      </p>
      <SectionTitle>{story.title}</SectionTitle>
      {story.body.map((paragraph) => (
        <p
          key={paragraph}
          style={{ fontSize: "1.05rem", lineHeight: 1.9, margin: "0 0 1.25rem" }}
        >
          {paragraph}
        </p>
      ))}
      {work && (
        <aside
          style={{
            backgroundColor: "var(--color-surface)",
            borderRadius: ".5rem",
            marginTop: "2rem",
            padding: "1.25rem",
          }}
        >
          <p
            style={{
              color: "var(--color-fg-muted)",
              fontSize: ".8rem",
              margin: "0 0 .75rem",
            }}
          >
            この体験で作った作品
          </p>
          <Link href={`/works/${work.id}/`} style={{ textDecoration: "none" }}>
            <WorkImage src={work.image} alt={work.title} size={160} />
            <CardTitle>{work.title}</CardTitle>
            <Badge>{work.type}</Badge>
          </Link>
        </aside>
      )}
    </article>
  )
}

export default Page
