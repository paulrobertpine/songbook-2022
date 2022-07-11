import React from "react"
import Link from "gatsby-link"
import HeaderIcon from "../images/musician.inline.svg"

export default function Header({title, subtitle}) {
  return (
    <header id="site-header">
      <section className="container">
        <Link to="/" id="site-logo">
          <HeaderIcon />
          <h1 className="fancy chunk">{title}</h1>
        </Link>
        <span className="subtitle">{subtitle}</span>
      </section>
    </header>
  )
}
