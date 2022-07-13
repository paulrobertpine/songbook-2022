import React, { useState, useEffect } from "react"
import * as Scroll from "react-scroll"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"

import { MdOutlinePlayCircleFilled, MdPauseCircleFilled } from "react-icons/md"
let scroll = Scroll.animateScroll

export default function Scroller() {
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollSpeed, setScrollSpeed] = useState(25) //px per 100ms

  console.log(scrollSpeed)

  function toggleScrolling() {
    isScrolling ? setIsScrolling(false) : setIsScrolling(true)
  }

  const handleSlider = e => {
    setScrollSpeed(e)
  }

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

  return (
    <nav className="scroll-control" id="scroller">
      <Slider
        vertical
        min={1}
        max={50}
        onChange={handleSlider}
        defaultValue={25}
      />

      <button onClick={() => toggleScrolling()}>
        {isScrolling ? <MdPauseCircleFilled /> : <MdOutlinePlayCircleFilled />}
      </button>
    </nav>
  )
}
