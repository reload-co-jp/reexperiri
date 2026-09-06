import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge, SectionTitle } from "@/components/elements/card"
import { lessonById, lessons } from "@/lib/data"

export const generateStaticParams = () =>
  lessons().map((lesson) => ({ id: lesson.id }))

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const lesson = lessonById(id)
  return {
    title: `${lesson?.title ?? "Lesson"} | reexperiri`,
    description: lesson?.description,
  }
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const lesson = lessonById(id)
  if (!lesson) notFound()
  return (
    <article style={{ margin: "0 auto", maxWidth: "42rem" }}>
      <Badge>{lesson.type}</Badge>
      <SectionTitle>{lesson.title}</SectionTitle>
      <p
        style={{
          color: "var(--color-fg-muted)",
          fontSize: "1.1rem",
          lineHeight: 1.7,
          margin: "0 0 3rem",
        }}
      >
        {lesson.description}
      </p>
      <ol style={{ display: "grid", gap: "1rem", margin: 0, padding: 0 }}>
        {lesson.chapters.map((chapter, index) => (
          <li key={chapter.title} style={{ listStyle: "none" }}>
            <Link
              href={`/lessons/${lesson.id}/${index + 1}/`}
              style={{
                borderLeft: "1px solid var(--color-fg)",
                borderTop: "1px solid var(--color-fg)",
                color: "inherit",
                display: "block",
                padding: "1.25rem",
                textDecoration: "none",
              }}
            >
              <p
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  margin: "0 0 .35rem",
                }}
              >
                {chapter.title}
              </p>
              <p
                style={{
                  color: "var(--color-fg-muted)",
                  margin: 0,
                }}
              >
                {chapter.summary}
              </p>
            </Link>
          </li>
        ))}
      </ol>
    </article>
  )
}

export default Page
