import { Footer, Header, Main, Title } from "@/components/elements/layout"
import { Nav } from "@/components/elements/nav"
import Link from "next/link"
import "./reset.css"

export const metadata = {
  title: "reexperiri",
  description:
    "自分のロゴやマスコットを作りながら、その制作方法や体験を学べるWebメディア",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body>
        <Header>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              gap: "1.5rem",
            }}
          >
            <Title>
              <Link
                href="/"
                style={{ color: "#e5e7eb", textDecoration: "none" }}
              >
                reexperiri
              </Link>
            </Title>
            <Nav />
          </div>
        </Header>
        <Main>{children}</Main>
        <Footer>
          <p>&copy; reexperiri</p>
        </Footer>
      </body>
    </html>
  )
}
export default RootLayout
