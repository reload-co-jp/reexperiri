import { FC } from "react"
import { Card, CardGrid, SectionTitle } from "@/components/elements/card"

export const metadata = {
  title: "Create | reexperiri",
  description: "Web上でロゴ・マスコット画像を生成",
}

const Page: FC = () => (
  <div style={{ color: "#e5e7eb" }}>
    <SectionTitle>Create</SectionTitle>
    <p style={{ margin: "0 0 1rem", opacity: 0.8 }}>作るものを選ぶ。</p>
    <CardGrid>
      <Card href="/create/logo/">
        <p style={{ fontWeight: "bold", margin: "0 0 .25rem" }}>ロゴ</p>
        <p style={{ fontSize: ".85rem", margin: 0, opacity: 0.8 }}>
          モチーフの頭文字と図形を組み合わせたロゴを生成する。
        </p>
      </Card>
      <Card href="/create/mascot/">
        <p style={{ fontWeight: "bold", margin: "0 0 .25rem" }}>マスコット</p>
        <p style={{ fontSize: ".85rem", margin: 0, opacity: 0.8 }}>
          表情や耳の形が変わるマスコットを生成する。
        </p>
      </Card>
    </CardGrid>
  </div>
)

export default Page
