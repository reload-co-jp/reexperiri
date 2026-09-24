import Link from "next/link"
import { FC, ReactNode } from "react"
import { assetPath } from "@/lib/path"

export const WorkImage: FC<{ src: string; alt: string; size?: number }> = ({
  src,
  alt,
  size = 320,
}) => (
  <span
    className="duotone"
    style={{
      borderRadius: ".25rem",
      display: "block",
      maxWidth: size,
      overflow: "hidden",
      position: "relative",
      width: "100%",
    }}
  >
    <img
      src={assetPath(src)}
      alt={alt}
      width={size}
      height={size}
      style={{
        display: "block",
        height: "auto",
        maxWidth: "100%",
        transition: "filter 0.4s ease, transform 0.4s ease",
      }}
    />
  </span>
)

export const CardGrid: FC<{ children: ReactNode }> = ({ children }) => (
  <div
    style={{
      display: "grid",
      gap: "2.5rem",
      gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))",
    }}
  >
    {children}
  </div>
)

export const HorizontalGallery: FC<{ children: ReactNode }> = ({
  children,
}) => (
  <div
    style={{
      display: "flex",
      gap: "2rem",
      overflowX: "auto",
      paddingBottom: "1rem",
      scrollSnapType: "x mandatory",
      scrollbarWidth: "none",
    }}
  >
    {children}
  </div>
)

export const GalleryItem: FC<{ href: string; children: ReactNode }> = ({
  href,
  children,
}) => (
  <Link
    href={href}
    style={{
      flex: "0 0 auto",
      scrollSnapAlign: "start",
      textDecoration: "none",
      width: "14rem",
    }}
  >
    {children}
  </Link>
)

export const Card: FC<{ href: string; children: ReactNode }> = ({
  href,
  children,
}) => (
  <Link
    href={href}
    style={{
      borderBottom: "1px solid var(--color-surface-strong)",
      display: "block",
      paddingBottom: "1.5rem",
      textDecoration: "none",
    }}
  >
    {children}
  </Link>
)

export const Badge: FC<{ children: ReactNode }> = ({ children }) => (
  <span
    style={{
      border: "1px solid var(--color-fg)",
      borderRadius: "1rem",
      color: "var(--color-fg)",
      display: "inline-block",
      fontSize: ".7rem",
      fontWeight: 600,
      letterSpacing: "0.05em",
      padding: ".2rem .7rem",
      textTransform: "uppercase",
    }}
  >
    {children}
  </span>
)

export const SectionTitle: FC<{ children: ReactNode }> = ({ children }) => (
  <h2
    style={{
      fontFamily: "var(--font-display)",
      fontSize: "clamp(2rem, 5vw, 3rem)",
      letterSpacing: "-0.02em",
      lineHeight: 1,
      margin: "0 0 3rem",
    }}
  >
    {children}
  </h2>
)

export const CardTitle: FC<{ children: ReactNode }> = ({ children }) => (
  <p
    style={{
      fontSize: "1.15rem",
      fontWeight: 700,
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
      margin: "1rem 0 .5rem",
    }}
  >
    {children}
  </p>
)
