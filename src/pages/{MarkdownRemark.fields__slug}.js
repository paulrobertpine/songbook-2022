import React, { useState } from "react"
import { graphql } from "gatsby"
import ChordSheetJS from "chordsheetjs"
import { createCP } from "simplechordpro"
import Layout from "../components/layout"
import Scroller from "../components/scroller"
import AutoScroller from "../components/auto-scroller"
import Video from "../components/video"
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai"

export default function Song({ data }) {

  const { frontmatter, rawMarkdownBody } = data.markdownRemark
  const chordProSong = createCP(rawMarkdownBody)
  const parser = new ChordSheetJS.ChordProParser()

  const [song, setSong] = useState(
    parser.parse(chordProSong).setKey(frontmatter.key)
  )

  const formatter = new ChordSheetJS.HtmlDivFormatter()
  const disp = formatter.format(song)

  return (
    <Layout title={frontmatter.title} subtitle={frontmatter.artist}>
      <article className="song">
        <header className="page-header">
          <section className="container">
            <span className="widget chunk">
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
            <span className="widget chunk">
              <AutoScroller />
            </span>
          </section>
          <Scroller />
        </header>

        <section
          className="song-content reading"
          dangerouslySetInnerHTML={{ __html: disp }}
        />
        <Video url={frontmatter.youtube} title={frontmatter.title} />
      </article>
    </Layout >
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
