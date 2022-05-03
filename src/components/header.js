import React from "react"
import Link from "gatsby-link"
import * as Scroll from "react-scroll"
import HeaderIcon from "../images/musician.inline.svg"
import { IoArrowDownCircle } from "react-icons/io5"

let scroll = Scroll.animateScroll

// set duration based on slider?
// calculate an amount to scroll based on viewport height?
// or use slider to set amount to scroll by

function scrollPage() {
  console.log("yep")
  scroll.scrollMore(300, {
    duration: 1500,
    smooth: "linear",
  })
}

export default function Header() {
  return (
    <header id="site-header">
      <section className="container">
        <Link to="/" id="site-logo">
          <HeaderIcon />
        </Link>
        <nav id="scroll-control">
          <button onClick={() => scrollPage()}>
            <IoArrowDownCircle />
          </button>
        </nav>
      </section>
    </header>
  )
}
