import { ComponentProps, FC, ReactNode } from "react"

export const Title: FC<ComponentProps<"h1">> = ({
  style,
  children,
  ...props
}) => (
  <h1
    style={{ fontSize: "1.5rem", letterSpacing: "-0.02em", margin: 0, ...style }}
    {...props}
  >
    {children}
  </h1>
)

export const Header: FC<{ children: ReactNode }> = ({ children }) => (
  <header
    style={{
      padding: "clamp(1.5rem, 4vw, 2.5rem)",
      position: "relative",
    }}
  >
    {children}
  </header>
)

export const Main: FC<{ children: ReactNode }> = ({ children }) => (
  <main
    style={{
      minHeight: "calc(100dvh - 5.625rem)",
      padding: "0 clamp(1.5rem, 4vw, 2.5rem) clamp(3rem, 8vw, 6rem)",
    }}
  >
    {children}
  </main>
)

export const Footer: FC<{ children: ReactNode }> = ({ children }) => (
  <footer
    style={{
      color: "var(--color-fg-muted)",
      fontSize: ".75rem",
      padding: "clamp(1.5rem, 4vw, 2.5rem)",
    }}
  >
    {children}
  </footer>
)
