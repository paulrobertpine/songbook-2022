import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import ChordSheetJS from "chordsheetjs"
import Layout from "../components/layout"
import Scroller from "../components/scroller"
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai"

export default function Song({ data }) {
  const { markdownRemark } = data
  const { frontmatter, rawMarkdownBody } = markdownRemark
  let parser

  if (frontmatter.format === "cp") {
    parser = new ChordSheetJS.ChordProParser()
  } else {
    parser = new ChordSheetJS.UltimateGuitarParser()
  }

  const [song, setSong] = useState(
    parser.parse(rawMarkdownBody).setKey(frontmatter.key)
  )

  const formatter = new ChordSheetJS.HtmlDivFormatter()
  const disp = formatter.format(song)

  return (
    <Layout title={frontmatter.title}>
      <article className="song">
        <header className="page-header">
          <section className="container">
            <h1 className="fancy chunk">
              <Link to="/">{frontmatter.title}</Link>
            </h1>
            <span className="artist chunk">{frontmatter.artist}</span>
            <span className="key chunk">
              <p>Key of {song.metadata.key}</p>
              <nav className="transposer">
                <button onClick={() => setSong(song.transposeDown())}>
                  <AiFillMinusCircle />
                </button>
                <button onClick={() => setSong(song.transposeUp())}>
                  <AiFillPlusCircle />
                </button>
              </nav>
            </span>
          </section>
          <Scroller />
        </header>

        <section
          className="song-content reading"
          dangerouslySetInnerHTML={{ __html: disp }}
        />
        <YouTube video={frontmatter.youtube} />
      </article>
    </Layout>
  )
}

function YouTube({ video }) {
  if (video) {
    const embedURL = "https://www.youtube.com/embed/" + video
    return (
      <div className="youtube">
        <iframe
          title="YouTube"
          width="700"
          height="350"
          src={embedURL}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    )
  } else {
    return ""
  }
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        key
        artist
        youtube
        format
      }
      rawMarkdownBody
    }
  }
`
