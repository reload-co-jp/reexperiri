import Link from "next/link"
import { FC } from "react"

const items = [
  { href: "/lessons/", label: "Lessons" },
  { href: "/works/", label: "Works" },
  { href: "/stories/", label: "Stories" },
]

export const Nav: FC = () => (
  <nav>
    <ul
      style={{
        display: "flex",
        gap: "2rem",
        listStyle: "none",
        margin: 0,
        padding: 0,
      }}
    >
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            style={{
              fontSize: ".85rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)
