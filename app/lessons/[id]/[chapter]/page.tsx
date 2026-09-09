import Link from "next/link"
import { notFound } from "next/navigation"
import type { ComponentProps } from "react"
import Markdown from "react-markdown"
import {
  Badge,
  CardTitle,
  SectionTitle,
  WorkImage,
} from "@/components/elements/card"
import {
  lessonById,
  lessons,
  storiesByChapter,
  workById,
  worksByChapter,
} from "@/lib/data"

const markdownComponents = {
  img: ({ style, alt, ...props }: ComponentProps<"img">) => (
    <img
      {...props}
      alt={alt ?? ""}
      style={{ ...style, borderRadius: 0, maxWidth: "100%" }}
    />
  ),
}

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

  const relatedStories = storiesByChapter(lesson.id, chapterIndex + 1)
  const relatedWorks = worksByChapter(lesson.id, chapterIndex + 1).filter(
    (work) => !work.storyId,
  )

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
      {chapterData.lecture && (
        <div style={{ display: "grid", gap: "1rem", margin: "0 0 3rem" }}>
          {chapterData.lecture.map((paragraph, index) => (
            <p
              key={index}
              style={{
                fontSize: "1rem",
                lineHeight: 1.9,
                margin: 0,
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}
      <p
        style={{
          color: "var(--color-fg-muted)",
          fontSize: ".9rem",
          fontWeight: 700,
          margin: "0 0 .75rem",
        }}
      >
        実践ステップ
      </p>
      <ol
        style={{
          borderTop: "1px solid var(--color-fg-muted)",
          display: "grid",
          margin: 0,
          padding: 0,
        }}
      >
        {chapterData.steps.map((step, index) => (
          <li
            key={step.title}
            style={{
              borderBottom: "1px solid var(--color-fg-muted)",
              display: "flex",
              gap: "1rem",
              listStyle: "none",
              padding: "1.25rem 0",
            }}
          >
            <span
              style={{
                alignItems: "center",
                backgroundColor: "var(--color-fg)",
                color: "var(--color-bg)",
                display: "flex",
                flexShrink: 0,
                fontSize: "1rem",
                fontWeight: 700,
                height: "2rem",
                justifyContent: "center",
                width: "2rem",
              }}
            >
              {index + 1}
            </span>
            <div>
              <p
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  margin: "0 0 .35rem",
                }}
              >
                {step.title}
              </p>
              <p
                style={{
                  color: "var(--color-fg-muted)",
                  margin: 0,
                }}
              >
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <div
        style={{
          border: "1px solid var(--color-fg)",
          margin: "2rem 0 0",
          padding: "1.25rem",
        }}
      >
        <p
          style={{
            color: "var(--color-fg)",
            fontSize: ".9rem",
            fontWeight: 700,
            margin: "0 0 .35rem",
          }}
        >
          この章の成果物
        </p>
        <p style={{ margin: 0 }}>{chapterData.outcome}</p>
      </div>
      {chapterData.outcomeExamples.length > 0 && (
        <div style={{ margin: "2rem 0 0" }}>
          <p
            style={{
              color: "var(--color-fg-muted)",
              fontSize: ".9rem",
              fontWeight: 700,
              margin: "0 0 .75rem",
            }}
          >
            実践例
          </p>
          <div
            style={{
              display: "grid",
              gap: "1rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            }}
          >
            {chapterData.outcomeExamples.map((example) => (
              <div
                key={example.title}
                style={{
                  borderTop: "2px solid var(--color-fg)",
                  paddingTop: "1rem",
                }}
              >
                <span
                  style={{
                    color: "var(--color-fg-muted)",
                    display: "block",
                    fontSize: ".7rem",
                    fontWeight: 700,
                    letterSpacing: ".1em",
                    margin: "0 0 .5rem",
                  }}
                >
                  EXAMPLE
                </span>
                <p
                  style={{
                    fontSize: ".95rem",
                    fontWeight: 700,
                    margin: "0 0 .5rem",
                  }}
                >
                  {example.title}
                </p>
                <div
                  style={{
                    color: "var(--color-fg-muted)",
                    display: "grid",
                    fontSize: ".85rem",
                    gap: ".35rem",
                    lineHeight: 1.7,
                  }}
                >
                  <Markdown components={markdownComponents}>
                    {example.detail}
                  </Markdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {(relatedStories.length > 0 || relatedWorks.length > 0) && (
        <div style={{ margin: "2rem 0 0" }}>
          <p
            style={{
              color: "var(--color-fg-muted)",
              fontSize: ".9rem",
              fontWeight: 700,
              margin: "0 0 .75rem",
            }}
          >
            この章を実践した人
          </p>
          <div
            style={{
              display: "grid",
              gap: "1.5rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            }}
          >
            {relatedStories.map((story) => (
              <Link
                key={story.id}
                href={`/stories/${story.id}/`}
                style={{ textDecoration: "none" }}
              >
                {story.workId && (
                  <WorkImage
                    src={workById(story.workId)?.image ?? ""}
                    alt={story.title}
                    size={160}
                  />
                )}
                <CardTitle>{story.title}</CardTitle>
                <Badge>体験談</Badge>
              </Link>
            ))}
            {relatedWorks.map((work) => (
              <Link
                key={work.id}
                href={`/works/${work.id}/`}
                style={{ textDecoration: "none" }}
              >
                <WorkImage src={work.image} alt={work.title} size={160} />
                <CardTitle>{work.title}</CardTitle>
                <Badge>{work.type}</Badge>
              </Link>
            ))}
          </div>
        </div>
      )}
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
          <span />
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
