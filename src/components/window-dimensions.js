import { useState, useEffect } from "react"
import { window } from "browser-monads"

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener("resize", handleResize)
    if (typeof window === `undefined`) {
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  return windowDimensions
}
