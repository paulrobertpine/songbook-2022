import React from "react"
import Header from "./header"
import Footer from "./footer"
import "../sass/styles.scss"

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main id="site-main">{children}</main>
      <Footer />
    </>
  )
}
