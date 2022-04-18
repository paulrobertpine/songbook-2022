import React from "react"
import Link from "gatsby-link"
import HeaderIcon from "../images/musician.inline.svg"
import { IoPlayCircle, IoPauseCircle } from "react-icons/io5"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
let scrolldelay = -1
const defaultSpeed = 50

export default function Header() {
  const [scrolling, setScrolling] = React.useState(false)
  const [speed, setSpeed] = React.useState(defaultSpeed)

  function toggleScroll(bool) {
    setScrolling(bool)
  }

  function setScrollSpeed(e) {
    setSpeed(e)
  }

  function scroll() {
    console.log(speed)
    window.scrollBy(0, 1)
    scrolldelay = setTimeout(scroll, speed)
  }

  function stopScrolling() {
    window.clearTimeout(scrolldelay)
    scrolldelay = -1
  }

  if (scrolling) {
    scroll()
  } else {
    stopScrolling()
  }

  return (
    <header id="site-header">
      <section className="container">
        <Link to="/" id="site-logo" onClick={stopScrolling}>
          <HeaderIcon />
        </Link>
        <nav id="scroll-control">
          <Slider
            className="speed-slider"
            defaultValue={50}
            reverse={true}
            onChange={stopScrolling}
            onAfterChange={setScrollSpeed}
          />
          {scrolling ? (
            <IoPauseCircle onClick={() => toggleScroll(false)} />
          ) : (
            <IoPlayCircle onClick={() => toggleScroll(true)} />
          )}
        </nav>
      </section>
    </header>
  )
}
