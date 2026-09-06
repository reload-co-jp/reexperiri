import { FC } from "react"
import { SectionTitle } from "@/components/elements/card"
import { Creator } from "@/components/create/creator"

export const metadata = {
  title: "Create Logo | reexperiri",
  description: "Web上でロゴ画像を生成",
}

const Page: FC = () => (
  <div style={{ color: "#e5e7eb" }}>
    <SectionTitle>ロゴを作る</SectionTitle>
    <Creator type="logo" />
  </div>
)

export default Page
