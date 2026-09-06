import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge, SectionTitle } from "@/components/elements/card"
import { lessonById, lessons } from "@/lib/data"

export const generateStaticParams = () =>
  lessons().flatMap((lesson) =>
    lesson.chapters.map((_, index) => ({
      id: lesson.id,
      chapter: String(index + 1),
    })),
  )

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string; chapter: string }>
}) => {
  const { id, chapter } = await params
  const lesson = lessonById(id)
  const chapterIndex = Number(chapter) - 1
  const chapterData = lesson?.chapters[chapterIndex]
  return {
    title: `${chapterData?.title ?? "Chapter"} | ${lesson?.title ?? "Lesson"} | reexperiri`,
    description: chapterData?.summary,
  }
}

const Page = async ({
  params,
}: {
  params: Promise<{ id: string; chapter: string }>
}) => {
  const { id, chapter } = await params
  const lesson = lessonById(id)
  if (!lesson) notFound()
  const chapterIndex = Number(chapter) - 1
  const chapterData = lesson.chapters[chapterIndex]
  if (!Number.isInteger(chapterIndex) || !chapterData) notFound()

  const prevChapter = chapterIndex > 0 ? chapterIndex : null
  const nextChapter =
    chapterIndex < lesson.chapters.length - 1 ? chapterIndex + 2 : null
  const isLastChapter = nextChapter === null

  return (
    <article style={{ margin: "0 auto", maxWidth: "42rem" }}>
      <Badge>{lesson.type}</Badge>
      <p
        style={{
          color: "var(--color-fg-muted)",
          margin: "0 0 .5rem",
        }}
      >
        <Link href={`/lessons/${lesson.id}/`} style={{ color: "inherit" }}>
          {lesson.title}
        </Link>
        {` — ${chapterIndex + 1} / ${lesson.chapters.length}`}
      </p>
      <SectionTitle>{chapterData.title}</SectionTitle>
      <p
        style={{
          color: "var(--color-fg-muted)",
          fontSize: "1.1rem",
          lineHeight: 1.7,
          margin: "0 0 3rem",
        }}
      >
        {chapterData.summary}
      </p>
      <ol style={{ display: "grid", gap: "1rem", margin: 0, padding: 0 }}>
        {chapterData.steps.map((step, index) => (
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
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2rem",
        }}
      >
        {prevChapter ? (
          <Link
            href={`/lessons/${lesson.id}/${prevChapter}/`}
            style={{ color: "var(--color-accent)", fontWeight: 700 }}
          >
            ← 前の章
          </Link>
        ) : (
          <span />
        )}
        {isLastChapter ? (
          <Link
            href={`/create/${lesson.type}/`}
            style={{
              backgroundColor: "var(--color-accent)",
              borderRadius: ".25rem",
              color: "#fff",
              fontWeight: 700,
              padding: ".75rem 2rem",
              textDecoration: "none",
            }}
          >
            作ってみる
          </Link>
        ) : (
          <Link
            href={`/lessons/${lesson.id}/${nextChapter}/`}
            style={{
              backgroundColor: "var(--color-accent)",
              borderRadius: ".25rem",
              color: "#fff",
              fontWeight: 700,
              padding: ".75rem 2rem",
              textDecoration: "none",
            }}
          >
            次の章 →
          </Link>
        )}
      </div>
    </article>
  )
}

export default Page
