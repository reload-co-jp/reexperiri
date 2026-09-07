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
import { works } from "@/lib/data"

const flow = [
  { href: "/lessons/", label: "レッスンを読む" },
  { href: "/create/", label: "作ってみる" },
  { href: "/works/", label: "作品を見る" },
  { href: "/stories/", label: "制作体験を読む" },
]

const Page: FC = () => {
  const latest = works().slice(0, 8)
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
      <section>
        <SectionTitle>基本フロー</SectionTitle>
        <ol
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {flow.map((step, index) => (
            <li
              key={step.href}
              style={{ alignItems: "center", display: "flex", gap: "1rem" }}
            >
              {index > 0 && <span aria-hidden="true">→</span>}
              <Link
                href={step.href}
                style={{
                  border: "1px solid var(--color-surface-strong)",
                  borderRadius: "2rem",
                  padding: ".6rem 1.25rem",
                  textDecoration: "none",
                }}
              >
                {step.label}
              </Link>
            </li>
          ))}
        </ol>
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
