import React, { useState } from "react"
import * as Scroll from "react-scroll"
import useWindowDimensions from "./window-dimensions"
import { MdOutlinePlayCircleFilled, MdPauseCircleFilled } from 'react-icons/md'
let scroll = Scroll.animateScroll

export default function AutoScroller() {
  const { height } = useWindowDimensions()
  const [isScrolling, setIsScrolling] = useState(false)
  console.log(isScrolling)

  function startScrolling() {
    setIsScrolling(true)
  }

  function stopScrolling() {
    setIsScrolling(false)
  }

  return (
    <nav className="autoscroll">
      <p>scroll</p>
      <button onClick={() => startScrolling()}>
        <MdOutlinePlayCircleFilled />
      </button>
      <button onClick={() => stopScrolling()}>
        <MdPauseCircleFilled />
      </button>
    </nav >
  )
}
