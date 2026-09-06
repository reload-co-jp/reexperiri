import Link from "next/link"
import { FC } from "react"

const items = [
  { href: "/lessons/", label: "Lessons" },
  { href: "/create/", label: "Create" },
  { href: "/works/", label: "Works" },
  { href: "/stories/", label: "Stories" },
]

export const Nav: FC = () => (
  <nav>
    <ul
      style={{
        display: "flex",
        gap: "1rem",
        listStyle: "none",
        margin: 0,
        padding: 0,
      }}
    >
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            style={{ color: "#e5e7eb", textDecoration: "none" }}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)
