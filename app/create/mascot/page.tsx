import { FC } from "react"
import { SectionTitle } from "@/components/elements/card"
import { Creator } from "@/components/create/creator"

export const metadata = {
  title: "Create Mascot | reexperiri",
  description: "Web上でマスコット画像を生成",
}

const Page: FC = () => (
  <div>
    <SectionTitle>マスコットを作る</SectionTitle>
    <Creator type="mascot" />
  </div>
)

export default Page
