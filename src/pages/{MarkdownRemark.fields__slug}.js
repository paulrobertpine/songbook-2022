import React, { useState } from "react"
import { graphql } from "gatsby"
import ChordSheetJS from "chordsheetjs"
import Layout from "../components/layout"
import Scroller from "../components/scroller"
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai"
import { MdChangeCircle } from "react-icons/md"

// song template
export default function Song({ data }) {
  const { markdownRemark } = data
  const { frontmatter, rawMarkdownBody } = markdownRemark
  const parser = new ChordSheetJS.ChordProParser()
  const formatter = new ChordSheetJS.HtmlDivFormatter()

  const [key, setKey] = useState(frontmatter.key)
  const [song] = useState(parser.parse(rawMarkdownBody))

  function goDown() {
    // setKey(key.transposeDown())
    // song.lines.forEach((line) => {
    //   line.items.forEach((item) => {
    //     console.log("chord ", item.chords)
    //     let chord = ChordSheetJS.parse(item.chords)
    //     if (chord) {
    //       chord = chord.transposeDown()
    //       item.chords = chord
    //     }
    //     console.log("new chord ", item.chords)
    //   })
    // })
    // const chord = parseChord("Ebsus4/Bb")
  }

  function goUp() {
    console.log("transpose up")
  }

  function enharmonicChange() {
    console.log("enharmonicChange")
  }

  const disp = formatter.format(song)
  // console.log("disp:", disp)

  return (
    <Layout title={frontmatter.title}>
      <article className="song">
        <header className="song-header">
          <section className="container">
            <h1 className="fancy">{frontmatter.title}</h1>
            <span className="artist">{frontmatter.artist}</span>
            <span className="key">
              <p>Key of {frontmatter.key}</p>
              <nav className="transposer">
                <button onClick={() => goDown()}>
                  <AiFillMinusCircle />
                </button>
                <button onClick={() => goUp()}>
                  <AiFillPlusCircle />
                </button>
                <button>
                  <MdChangeCircle onClick={() => enharmonicChange()} />
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
