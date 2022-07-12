import React, { useState, useEffect } from "react"
import * as Scroll from "react-scroll"
import { MdOutlinePlayCircleFilled, MdPauseCircleFilled } from 'react-icons/md'
let scroll = Scroll.animateScroll

export default function Scroller() {
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollSpeed, setScrollSpeed] = useState(50) //px per 100ms

  console.log(scrollSpeed)

  function toggleScrolling() {
    isScrolling ? setIsScrolling(false) : setIsScrolling(true)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (isScrolling) {
        scroll.scrollMore(scrollSpeed, {
          smooth: "linear",
        })
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isScrolling, scrollSpeed]);

  return (
    <nav className="scroll-control" id="scroller">
      <button onClick={() => toggleScrolling()}>
        {isScrolling ? <MdPauseCircleFilled /> : <MdOutlinePlayCircleFilled />}
      </button>
    </nav>
  )
}
