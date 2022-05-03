import React from "react"
import Link from "gatsby-link"
import * as Scroll from "react-scroll"
import HeaderIcon from "../images/musician.inline.svg"
import { IoArrowDownCircle } from "react-icons/io5"
import useWindowDimensions from "./window-dimensions"

let scroll = Scroll.animateScroll
// set duration based on slider?
// calculate an amount to scroll based on viewport height?
// or use slider to set amount to scroll by

function scrollPage(vh) {
  const buffer = 100 //pixels
  scroll.scrollMore(vh - buffer, {
    duration: vh * 2,
    smooth: "linear",
  })
}

export default function Header() {
  const { height } = useWindowDimensions()

  return (
    <header id="site-header">
      <section className="container">
        <Link to="/" id="site-logo">
          <HeaderIcon />
        </Link>
        <nav className="scroll-control">
          <button onClick={() => scrollPage(height)}>
            <IoArrowDownCircle />
          </button>
        </nav>
      </section>
    </header>
  )
}
