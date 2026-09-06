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
      <div style={{ display: "grid", gap: "3rem" }}>
        {lesson.chapters.map((chapter) => (
          <section key={chapter.title}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.75rem",
                letterSpacing: "-0.01em",
                margin: "0 0 .5rem",
              }}
            >
              {chapter.title}
            </h2>
            <p
              style={{
                color: "var(--color-fg-muted)",
                margin: "0 0 1.25rem",
              }}
            >
              {chapter.summary}
            </p>
            <ol style={{ display: "grid", gap: "1rem", margin: 0, padding: 0 }}>
              {chapter.steps.map((step, index) => (
                <li
                  key={step.title}
                  style={{
                    backgroundColor: "var(--color-surface)",
                    borderRadius: ".5rem",
                    listStyle: "none",
                    padding: "1.25rem",
                  }}
                >
                  <p
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      margin: "0 0 .35rem",
                    }}
                  >
                    {index + 1}. {step.title}
                  </p>
                  <p
                    style={{
                      color: "var(--color-fg-muted)",
                      margin: 0,
                    }}
                  >
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
      <p style={{ marginTop: "2rem" }}>
        <Link
          href={`/create/${lesson.type}/`}
          style={{
            backgroundColor: "var(--color-accent)",
            borderRadius: ".25rem",
            color: "#fff",
            display: "inline-block",
            fontWeight: 700,
            padding: ".75rem 2rem",
            textDecoration: "none",
          }}
        >
          作ってみる
        </Link>
      </p>
    </article>
  )
}

export default Page
