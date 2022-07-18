import React, { useState, useEffect } from "react"
import * as Scroll from "react-scroll"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import { MdOutlinePlayCircleFilled, MdPauseCircleFilled } from "react-icons/md"

const scroll = Scroll.animateScroll

export default function Scroller() {
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollSpeed, setScrollSpeed] = useState(10) //px per 100ms

  function toggleScrolling() {
    if (isScrolling === true) {
      setIsScrolling(false)
    } else {
      setIsScrolling(true)
    }
  }

  const handleSlider = (e) => {
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
    const keypress = (e) => {
      if (e.key === "s") {
        toggleScrolling()
      }
    }
    // todo add keys for speed +/-

    window.addEventListener("keypress", keypress)

    return () => {
      window.removeEventListener("keypress", keypress)
    }
  })

  // this one handles stopping scrolling at the bottom
  useEffect(() => {
    const scrolly = (e) => {
      const closeToBottom =
        document.documentElement.offsetHeight - window.innerHeight - 5

      if (window.scrollY > closeToBottom && isScrolling) {
        toggleScrolling()
      }
    }

    window.addEventListener("scroll", scrolly)

    return () => {
      window.removeEventListener("scroll", scrolly)
    }
  })

  return (
    <nav id="scroller" className="widget chunk">
      <Slider
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
