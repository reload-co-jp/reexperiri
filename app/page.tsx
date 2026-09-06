import Link from "next/link"
import { FC } from "react"
import {
  Badge,
  Card,
  CardGrid,
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
  const latest = works().slice(0, 3)
  return (
    <div style={{ color: "#e5e7eb", display: "grid", gap: "2rem" }}>
      <section>
        <p style={{ fontSize: "1.25rem", margin: 0 }}>
          自分のロゴやマスコットを、自分で作ってみる。
        </p>
        <p style={{ margin: ".5rem 0 0", opacity: 0.8 }}>
          reexperiri
          は、自分のロゴやマスコットを作りながら、その制作方法や体験を学べるWebメディア。
        </p>
      </section>
      <section>
        <SectionTitle>基本フロー</SectionTitle>
        <ol
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: ".5rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {flow.map((step, index) => (
            <li
              key={step.href}
              style={{ alignItems: "center", display: "flex", gap: ".5rem" }}
            >
              {index > 0 && <span aria-hidden="true">→</span>}
              <Link
                href={step.href}
                style={{
                  backgroundColor: "#333",
                  borderRadius: ".25rem",
                  color: "#e5e7eb",
                  padding: ".5rem 1rem",
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
        <CardGrid>
          {latest.map((work) => (
            <Card key={work.id} href={`/works/${work.id}/`}>
              <WorkImage src={work.image} alt={work.title} />
              <p style={{ margin: ".5rem 0 .25rem" }}>{work.title}</p>
              <Badge>{work.type}</Badge>
            </Card>
          ))}
        </CardGrid>
      </section>
    </div>
  )
}

export default Page
