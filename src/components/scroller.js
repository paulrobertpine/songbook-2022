import React from "react"
import * as Scroll from "react-scroll"
import { IoArrowDownCircle } from "react-icons/io5"
import useWindowDimensions from "./window-dimensions"

let scroll = Scroll.animateScroll

function scrollPage(vh) {
  const buffer = 100 //pixels
  scroll.scrollMore(vh - buffer, {
    duration: vh * 2,
    smooth: "linear",
  })
}

export default function Scroller() {
  const { height } = useWindowDimensions()

  return (
    <nav className="scroll-control" id="scroller">
      <button onClick={() => scrollPage(height)}>
        <IoArrowDownCircle />
      </button>
    </nav>
  )
}
