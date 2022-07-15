import React, { useState, useEffect } from "react"
import * as Scroll from "react-scroll"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import { MdOutlinePlayCircleFilled, MdPauseCircleFilled } from "react-icons/md"
// import { window } from "browser-monads"

const scroll = Scroll.animateScroll

// console.log("window.pageYOffset", window.pageYOffset)
// console.log("window.innerHeight", window.innerHeight)
// console.log("document.body.offsetHeight", document.body.offsetHeight)
// console.log("scroller.offsetHeight", document.body.offsetHeight)


export default function Scroller() {
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollSpeed, setScrollSpeed] = useState(15) //px per 100ms

  console.log(scrollSpeed)

  function toggleScrolling() {
    if (isScrolling === true) {
      setIsScrolling(false)
    }
    else {
      setIsScrolling(true)
    }
  }

  const handleSlider = e => {
    setScrollSpeed(e)
  }

  // this one does the scrolling
  useEffect(() => {
    const interval = setInterval(() => {
      if (isScrolling) {
        scroll.scrollMore(scrollSpeed, {
          smooth: "linear",
        })
      }
    }, 100)
    return () => clearInterval(interval)
  }, [isScrolling, scrollSpeed])

  // this one looks for keypress
  useEffect(() => {
    const keypress = e => {
      if (e.key === "s") {
        toggleScrolling()
      }
    }
    // todo add keys for speed +/-

    window.addEventListener("keypress", keypress);

    return () => {
      window.removeEventListener("keypress", keypress);
    }
  })

  return (
    <nav className="scroll-control" id="scroller">
      <Slider
        vertical
        min={1}
        max={50}
        onChange={handleSlider}
        defaultValue={scrollSpeed}
      />
      <button onClick={() => toggleScrolling()}>
        {isScrolling ? <MdPauseCircleFilled /> : <MdOutlinePlayCircleFilled />}
      </button>
    </nav>
  )
}
