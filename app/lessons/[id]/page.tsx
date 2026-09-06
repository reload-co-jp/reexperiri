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
    <article style={{ color: "#e5e7eb", maxWidth: "40rem" }}>
      <Badge>{lesson.type}</Badge>
      <SectionTitle>{lesson.title}</SectionTitle>
      <p style={{ margin: "0 0 1.5rem", opacity: 0.8 }}>{lesson.description}</p>
      <ol style={{ display: "grid", gap: "1rem", margin: 0, padding: 0 }}>
        {lesson.steps.map((step, index) => (
          <li
            key={step.title}
            style={{
              backgroundColor: "#333",
              borderRadius: ".5rem",
              listStyle: "none",
              padding: "1rem",
            }}
          >
            <p style={{ fontWeight: "bold", margin: "0 0 .25rem" }}>
              {index + 1}. {step.title}
            </p>
            <p style={{ fontSize: ".9rem", margin: 0, opacity: 0.85 }}>
              {step.body}
            </p>
          </li>
        ))}
      </ol>
      <p style={{ marginTop: "1.5rem" }}>
        <Link
          href={`/create/${lesson.type}/`}
          style={{
            backgroundColor: "#3b82f6",
            borderRadius: ".25rem",
            color: "#fff",
            padding: ".5rem 1.5rem",
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
