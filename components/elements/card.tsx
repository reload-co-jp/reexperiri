import Link from "next/link"
import { FC, ReactNode } from "react"
import { assetPath } from "@/lib/path"

export const WorkImage: FC<{ src: string; alt: string; size?: number }> = ({
  src,
  alt,
  size = 320,
}) => (
  <img
    src={assetPath(src)}
    alt={alt}
    width={size}
    height={size}
    style={{ borderRadius: ".25rem", height: "auto", maxWidth: "100%" }}
  />
)

export const CardGrid: FC<{ children: ReactNode }> = ({ children }) => (
  <div
    style={{
      display: "grid",
      gap: "1rem",
      gridTemplateColumns: "repeat(auto-fill, minmax(14rem, 1fr))",
    }}
  >
    {children}
  </div>
)

export const Card: FC<{ href: string; children: ReactNode }> = ({
  href,
  children,
}) => (
  <Link
    href={href}
    style={{
      backgroundColor: "#333",
      borderRadius: ".5rem",
      color: "#e5e7eb",
      display: "block",
      overflow: "hidden",
      padding: "1rem",
      textDecoration: "none",
    }}
  >
    {children}
  </Link>
)

export const Badge: FC<{ children: ReactNode }> = ({ children }) => (
  <span
    style={{
      backgroundColor: "#555",
      borderRadius: ".25rem",
      display: "inline-block",
      fontSize: ".7rem",
      padding: ".1rem .5rem",
    }}
  >
    {children}
  </span>
)

export const SectionTitle: FC<{ children: ReactNode }> = ({ children }) => (
  <h2 style={{ color: "#e5e7eb", fontSize: "1.25rem", margin: "0 0 1rem" }}>
    {children}
  </h2>
)
