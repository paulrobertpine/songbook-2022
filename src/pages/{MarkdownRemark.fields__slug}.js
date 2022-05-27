import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import ChordSheetJS, { Chord } from "chordsheetjs"
import Layout from "../components/layout"
import Scroller from "../components/scroller"
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai"
import { MdChangeCircle } from "react-icons/md"

export default function Song({ data }) {
  const { markdownRemark } = data
  const { frontmatter, rawMarkdownBody } = markdownRemark
  const [key, setKey] = useState(frontmatter.key)

  const parser = new ChordSheetJS.ChordProParser()
  const song = parser.parse(rawMarkdownBody)
  const formatter = new ChordSheetJS.HtmlDivFormatter()
  const disp = formatter.format(song)

  function goDown() {
    const chord = Chord.parse(key)
    const newChord = chord.transposeDown()
    setKey(newChord.toString())
  }

  function goUp() {
    const chord = Chord.parse(key)
    const newChord = chord.transposeUp()
    setKey(newChord.toString())
  }

  function enharmonicChange() {
    const chord = Chord.parse(key)
    const modifier = chord.root.modifier
    let newChord = chord

    if (modifier) {
      if (modifier === "#") {
        newChord = chord.useModifier("b")
      } else {
        newChord = chord.useModifier("#")
      }
    }

    setKey(newChord.toString())
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
              <p>Key of {key}</p>
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
