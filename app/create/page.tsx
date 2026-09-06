import { FC } from "react"
import {
  Card,
  CardGrid,
  CardTitle,
  SectionTitle,
} from "@/components/elements/card"

export const metadata = {
  title: "Create | reexperiri",
  description: "Web上でロゴ・マスコット画像を生成",
}

const Page: FC = () => (
  <div>
    <SectionTitle>Create</SectionTitle>
    <p style={{ color: "var(--color-fg-muted)", margin: "0 0 2rem" }}>
      作るものを選ぶ。
    </p>
    <CardGrid>
      <Card href="/create/logo/">
        <CardTitle>ロゴ</CardTitle>
        <p style={{ color: "var(--color-fg-muted)", fontSize: ".85rem", margin: 0 }}>
          モチーフの頭文字と図形を組み合わせたロゴを生成する。
        </p>
      </Card>
      <Card href="/create/mascot/">
        <CardTitle>マスコット</CardTitle>
        <p style={{ color: "var(--color-fg-muted)", fontSize: ".85rem", margin: 0 }}>
          表情や耳の形が変わるマスコットを生成する。
        </p>
      </Card>
    </CardGrid>
  </div>
)

export default Page
