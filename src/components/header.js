import React from "react"
import Link from "gatsby-link"
import HeaderIcon from "../images/musician.inline.svg"
import {
  // IoSpeedometer,
  IoPlayCircle,
  IoPauseCircle,
  IoPlayBackCircle,
  IoPlayForwardCircle,
} from "react-icons/io5"

const defaultSpeed = 5
let scrolldelay = -1

export default function Header() {
  const [speed, setSpeed] = React.useState(defaultSpeed)
  const [scrolling, setScrolling] = React.useState(false)
  // console.log(scrolling)

  // React.useEffect(() => {
  //   // Update the document title using the browser API
  //   document.title = `You clicked ${count} times`;
  // });

  function speedUp() {
    if (speed < 50) {
      setSpeed(speed + 1)
      // scrollPage()
    }
  }

  function speedDown() {
    if (speed > 1) {
      setSpeed(speed - 1)
      // scrollPage()
    }
  }

  function toggleScroll(bool) {
    setScrolling(bool)
    scrollPage()
  }

  function scrollPage() {
    if (scrolling) {
      window.clearTimeout(scrolldelay)
      scrolldelay = -1
      console.log("stop")
    } else {
      window.scrollBy(0, 1)
      scrolldelay = setTimeout(scrollPage, speed * 10)
      console.log("speed: ", speed)
    }
  }

  return (
    <header id="site-header">
      <section className="container">
        <Link to="/" id="site-logo">
          <HeaderIcon />
        </Link>
        <nav id="scroll-control">
          <IoPlayBackCircle onClick={() => speedDown()} />
          <p>{speed}</p>
          <IoPlayForwardCircle onClick={() => speedUp()} />
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
