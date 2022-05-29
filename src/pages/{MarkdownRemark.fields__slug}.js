import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import ChordSheetJS, { Chord, ChordLyricsPair } from "chordsheetjs"
import Layout from "../components/layout"
import Scroller from "../components/scroller"
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai"

export default function Song({ data }) {
  const { markdownRemark } = data
  const { frontmatter, rawMarkdownBody } = markdownRemark

  let keyExists = frontmatter.key
  if (!keyExists) {
    keyExists = "A"
  }

  const [key, setKey] = useState(Chord.parse(keyExists)) // prevent default
  const [song] = useState(
    new ChordSheetJS.ChordProParser().parse(rawMarkdownBody)
  )
  const formatter = new ChordSheetJS.HtmlDivFormatter()
  const disp = formatter.format(song)

  // console.log("song: ", song)
  // console.log("song methods: ", getMethods(song))
  // song.setKey("A")

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
      </article>
    </Layout>
  )
}

// Song.defaultProps = {
//   key: "A",
// }

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        key
        artist
        youtube
      }
      rawMarkdownBody
    }
  }
`
