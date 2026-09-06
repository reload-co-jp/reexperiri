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
    <article style={{ color: "#e5e7eb", maxWidth: "40rem" }}>
      <Badge>{work.type}</Badge>
      <SectionTitle>{work.title}</SectionTitle>
      <WorkImage src={work.image} alt={work.title} />
      <dl style={{ display: "grid", gap: ".5rem", margin: "1.5rem 0 0" }}>
        <div>
          <dt style={{ fontSize: ".8rem", opacity: 0.7 }}>プロンプト</dt>
          <dd style={{ margin: 0 }}>{work.prompt}</dd>
        </div>
        <div>
          <dt style={{ fontSize: ".8rem", opacity: 0.7 }}>設定</dt>
          <dd style={{ margin: 0 }}>
            モチーフ: {work.settings.motif} / スタイル: {work.settings.style} /
            色: {work.settings.color}
          </dd>
        </div>
      </dl>
      {story && (
        <p style={{ marginTop: "1.5rem" }}>
          <Link
            href={`/stories/${story.id}/`}
            style={{ color: "#93c5fd" }}
          >
            制作体験を読む: {story.title}
          </Link>
        </p>
      )}
    </article>
  )
}

export default Page
