import React from "react"

export default function Video({ url, title }) {
  if (url) {
    const embedURL = "https://www.youtube.com/embed/" + url
    return (
      <div className="youtube">
        <iframe
          width="700"
          height="350"
          src={embedURL}
          title={title + " video"}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    )
  } else {
    return ""
  }
}
