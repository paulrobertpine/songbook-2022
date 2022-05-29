import React from "react"
import Link from "gatsby-link"
import * as Scroll from "react-scroll"
import { IoArrowUpCircle } from "react-icons/io5"

let scroll = Scroll.animateScroll

export default function Footer() {
  return (
    <footer id="site-footer">
      <section className="container">
        <span>
          © <Link to="/">Songbook</Link> {new Date().getFullYear()}
        </span>

        <nav className="scroll-control">
          <button onClick={() => scroll.scrollToTop()}>
            <IoArrowUpCircle />
          </button>
        </nav>
      </section>
    </footer>
  )
}
