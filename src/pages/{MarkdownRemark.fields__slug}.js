import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import ChordSheetJS, { Chord, ChordLyricsPair } from "chordsheetjs"
import Layout from "../components/layout"
import Scroller from "../components/scroller"
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai"

export default function Song({ data }) {
  const { markdownRemark } = data
  const { frontmatter, rawMarkdownBody } = markdownRemark
  let parser

  let keyExists = frontmatter.key
  if (!keyExists) {
    keyExists = "A"
  }

  if (frontmatter.format === "cp") {
    parser = new ChordSheetJS.ChordProParser()
  }
  else {
    parser = new ChordSheetJS.UltimateGuitarParser()
  }

  const [key, setKey] = useState(Chord.parse(keyExists))
  const [song] = useState(parser.parse(rawMarkdownBody))
  const formatter = new ChordSheetJS.HtmlDivFormatter()
  const disp = formatter.format(song)

  function goDown() {
    setKey(key.transposeDown())

    song.mapItems((item) => {
      if (item instanceof ChordLyricsPair) {
        const chord = Chord.parse(item.chords)

        if (chord) {
          item.chords = chord.transposeDown().toString()
        }

        return item
      }

      return item
    })
  }

  function goUp() {
    setKey(key.transposeUp())

    song.mapItems((item) => {
      if (item instanceof ChordLyricsPair) {
        const chord = Chord.parse(item.chords)

        if (chord) {
          item.chords = chord.transposeUp().toString()
        }

        return item
      }

      return item
    })
  }

  return (
    <Layout title={frontmatter.title}>
      <article className="song">
        <header className="song-header">
          <section className="container">
            <h1 className="fancy">
              <Link to="/">{frontmatter.title}</Link>
            </h1>
            <span className="artist">{frontmatter.artist}</span>
            <span className="key">
              <p>Key of {key.toString()}</p>
              <nav className="transposer">
                <button onClick={() => goDown()}>
                  <AiFillMinusCircle />
                </button>
                <button onClick={() => goUp()}>
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
