import { Footer, Header, Main, Title } from "@/components/elements/layout"
import { Nav } from "@/components/elements/nav"
import Link from "next/link"
import { Archivo_Black, Klee_One } from "next/font/google"
import "./reset.css"

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
})

const kleeOne = Klee_One({
  variable: "--font-klee-one",
  weight: "400",
  subsets: ["latin"],
})

export const metadata = {
  title: "Reexperiri",
  description:
    "自分でクリエイティブを作りながら、その制作方法や体験を学べるWebメディア",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja" className={`${archivoBlack.variable} ${kleeOne.variable}`}>
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
                Reexperiri
              </Link>
            </Title>
            <Nav />
          </div>
        </Header>
        <Main>{children}</Main>
        <Footer>
          <p>Reexperiri &copy; Reload, Inc.</p>
        </Footer>
      </body>
    </html>
  )
}
export default RootLayout
