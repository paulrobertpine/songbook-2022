import React from "react"
import "../sass/styles.scss"

export default function Layout({ children }) {
  return (
    <>
      <header>
        <span>Songbook</span>
      </header>
      <main>{children}</main>
      <footer>© {new Date().getFullYear()}</footer>
    </>
  )
}
