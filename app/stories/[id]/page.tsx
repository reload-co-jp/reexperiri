import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge, SectionTitle, WorkImage } from "@/components/elements/card"
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
    <article style={{ color: "#e5e7eb", maxWidth: "40rem" }}>
      <p style={{ fontSize: ".8rem", margin: "0 0 .25rem", opacity: 0.7 }}>
        {story.date}
      </p>
      <SectionTitle>{story.title}</SectionTitle>
      {story.body.map((paragraph) => (
        <p key={paragraph} style={{ lineHeight: 1.8, margin: "0 0 1rem" }}>
          {paragraph}
        </p>
      ))}
      {work && (
        <aside
          style={{
            backgroundColor: "#333",
            borderRadius: ".5rem",
            marginTop: "1.5rem",
            padding: "1rem",
          }}
        >
          <p style={{ fontSize: ".8rem", margin: "0 0 .5rem", opacity: 0.7 }}>
            この体験で作った作品
          </p>
          <Link
            href={`/works/${work.id}/`}
            style={{ color: "#e5e7eb", textDecoration: "none" }}
          >
            <WorkImage src={work.image} alt={work.title} size={160} />
            <p style={{ margin: ".5rem 0 .25rem" }}>{work.title}</p>
            <Badge>{work.type}</Badge>
          </Link>
        </aside>
      )}
    </article>
  )
}

export default Page
