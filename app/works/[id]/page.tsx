import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge, SectionTitle, WorkImage } from "@/components/elements/card"
import { workById, works } from "@/lib/data"
import { storyById } from "@/lib/data"

export const generateStaticParams = () =>
  works().map((work) => ({ id: work.id }))

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const work = workById(id)
  return {
    title: `${work?.title ?? "Work"} | reexperiri`,
    description: work?.prompt,
  }
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const work = workById(id)
  if (!work) notFound()
  const story = work.storyId ? storyById(work.storyId) : undefined
  return (
    <article style={{ margin: "0 auto", maxWidth: "42rem" }}>
      <Badge>{work.type}</Badge>
      <SectionTitle>{work.title}</SectionTitle>
      <WorkImage src={work.image} alt={work.title} />
      <dl style={{ display: "grid", gap: "1rem", margin: "2rem 0 0" }}>
        <div>
          <dt
            style={{
              color: "var(--color-fg-muted)",
              fontSize: ".8rem",
              margin: "0 0 .25rem",
            }}
          >
            プロンプト
          </dt>
          <dd style={{ margin: 0 }}>{work.prompt}</dd>
        </div>
        <div>
          <dt
            style={{
              color: "var(--color-fg-muted)",
              fontSize: ".8rem",
              margin: "0 0 .25rem",
            }}
          >
            設定
          </dt>
          <dd style={{ margin: 0 }}>
            モチーフ: {work.settings.motif} / スタイル: {work.settings.style} /
            色: {work.settings.color}
          </dd>
        </div>
      </dl>
      {story && (
        <p style={{ marginTop: "2rem" }}>
          <Link
            href={`/stories/${story.id}/`}
            style={{ color: "var(--color-accent)", fontWeight: 600 }}
          >
            制作体験を読む: {story.title}
          </Link>
        </p>
      )}
      {work.lessonId && work.chapterIndex && (
        <p style={{ marginTop: story ? ".75rem" : "2rem" }}>
          <Link
            href={`/lessons/${work.lessonId}/${work.chapterIndex}/`}
            style={{ color: "var(--color-accent)", fontWeight: 600 }}
          >
            この作品につながるレッスン章を見る
          </Link>
        </p>
      )}
    </article>
  )
}

export default Page
