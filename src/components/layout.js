import React from "react"
import { Helmet } from "react-helmet";
import Header from "./header"
import Footer from "./footer"
import "../sass/styles.scss"

export default function Layout({ title, subtitle, children }) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta charSet="utf-8" />
      </Helmet>

      <Header title={title} subtitle={subtitle}/>
      <main id="site-main">{children}</main>
      <Footer />
    </>
  )
}
