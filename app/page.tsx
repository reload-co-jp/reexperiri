import Link from "next/link"
import { FC } from "react"
import {
  Badge,
  CardTitle,
  GalleryItem,
  HorizontalGallery,
  SectionTitle,
  WorkImage,
} from "@/components/elements/card"
import { lessons, works } from "@/lib/data"

const Page: FC = () => {
  const latest = works().slice(0, 8)
  const latestLessons = lessons().slice(0, 4)
  return (
    <div style={{ display: "grid", gap: "clamp(4rem, 8vw, 7rem)" }}>
      <section style={{ padding: "clamp(2rem, 6vw, 4rem) 0" }}>
        <h1
          className="fx-marker"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 12vw, 8rem)",
            letterSpacing: "-0.03em",
            lineHeight: 0.9,
            margin: 0,
            display: "inline-block",
          }}
        >
          Reexperiri
        </h1>
        <p
          style={{
            color: "var(--color-accent)",
            fontFamily: "var(--font-script)",
            fontSize: "clamp(1.75rem, 6vw, 3.5rem)",
            margin: ".5rem 0 0",
          }}
        >
          自分で作って、学ぶ。
        </p>
        <p style={{ color: "var(--color-fg-muted)", margin: "1.5rem 0 0" }}>
          Reexperiri
          は、自分クリエイティブを作りながら、その制作方法や体験を学べるWebメディア。
        </p>
      </section>
      <section style={{ display: "grid", gap: "3rem" }}>
        {latestLessons.map((lesson) => (
          <div key={lesson.id}>
            <Link
              href={`/lessons/${lesson.id}/`}
              style={{ color: "inherit", display: "block", textDecoration: "none" }}
            >
              <CardTitle>{lesson.title}</CardTitle>
              <Badge>{lesson.type}</Badge>
            </Link>
            <ol
              style={{
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: "repeat(auto-fill, minmax(14rem, 1fr))",
                margin: "1.5rem 0 0",
                padding: 0,
              }}
            >
              {lesson.chapters.slice(0, 3).map((chapter, index) => (
                <li key={chapter.title} style={{ listStyle: "none" }}>
                  <Link
                    href={`/lessons/${lesson.id}/${index + 1}/`}
                    style={{
                      border: "1px solid var(--color-surface-strong)",
                      color: "inherit",
                      display: "block",
                      height: "100%",
                      padding: "1.5rem",
                      textDecoration: "none",
                    }}
                  >
                    <p
                      style={{
                        color: "var(--color-fg-muted)",
                        fontSize: ".75rem",
                        margin: "0 0 .5rem",
                        textTransform: "uppercase",
                      }}
                    >
                      {`Chapter ${index + 1}`}
                    </p>
                    <p
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        margin: "0 0 .5rem",
                      }}
                    >
                      {chapter.title}
                    </p>
                    <p
                      style={{
                        color: "var(--color-fg-muted)",
                        fontSize: ".85rem",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {chapter.summary}
                    </p>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>
      <section>
        <SectionTitle>最新の作品</SectionTitle>
        <HorizontalGallery>
          {latest.map((work) => (
            <GalleryItem key={work.id} href={`/works/${work.id}/`}>
              <WorkImage src={work.image} alt={work.title} />
              <CardTitle>{work.title}</CardTitle>
              <Badge>{work.type}</Badge>
            </GalleryItem>
          ))}
        </HorizontalGallery>
      </section>
    </div>
  )
}

export default Page
