import { Footer, Header, Main, Title } from "@/components/elements/layout"
import { Nav } from "@/components/elements/nav"
import Link from "next/link"
import { Archivo_Black, Yomogi } from "next/font/google"
import "./reset.css"

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
})

const yomogi = Yomogi({
  variable: "--font-yomogi",
  weight: "400",
  subsets: ["latin"],
})

export const metadata = {
  title: "reexperiri",
  description:
    "自分のロゴやマスコットを作りながら、その制作方法や体験を学べるWebメディア",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja" className={`${archivoBlack.variable} ${yomogi.variable}`}>
      <body>
        <Header>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              gap: "2rem",
              justifyContent: "space-between",
            }}
          >
            <Title style={{ fontFamily: "var(--font-display)" }}>
              <Link href="/" style={{ textDecoration: "none" }}>
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
