import React from 'react'
import Link from 'gatsby-link'
import * as Scroll from 'react-scroll'
import { IoArrowUpCircle } from 'react-icons/io5'
let scroll = Scroll.animateScroll

export default function Footer() {
  return (
    <footer id="site-footer">
      <section className="container">
        <span className="chunk">
          © <Link to="/">Songbook</Link> {new Date().getFullYear()}
        </span>

        <nav className="widget chunk">
          <button onClick={() => scroll.scrollToTop()}>
            <IoArrowUpCircle />
            <span>Scroll to top</span>
          </button>
        </nav>
      </section>
    </footer>
  )
}
