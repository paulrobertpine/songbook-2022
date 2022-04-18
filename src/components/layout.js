import React from "react"
import Header from "./header"
import "../sass/styles.scss"

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main id="site-main">{children}</main>
      <footer id="site-footer">
        <section className="container">
          © Paul Clifford {new Date().getFullYear()}
        </section>
      </footer>
    </>
  )
}
