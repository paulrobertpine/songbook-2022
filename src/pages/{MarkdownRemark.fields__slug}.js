import React from "react"
import { graphql } from "gatsby"
import ChordSheetJS from "chordsheetjs"
import Layout from "../components/layout"
import Scroller from "../components/scroller"
// import { FiMinusCircle, FiPlusCircle, FiRefreshCw } from "react-icons/fi"

// song template
export default function Song({ data }) {
  const { markdownRemark } = data
  const { frontmatter, rawMarkdownBody } = markdownRemark


  const parser = new ChordSheetJS.ChordProParser()
  const song = parser.parse(rawMarkdownBody)
  const formatter = new ChordSheetJS.HtmlDivFormatter()
  const disp = formatter.format(song)
  console.log("disp:", disp)

  return (
    <Layout title={frontmatter.title}>
      <article className="song">
        <header className="song-header">
          <section className="container">
            <h1 className="fancy">{frontmatter.title}</h1>
            <span>{frontmatter.artist}</span>
            <span>Key of {frontmatter.key}</span>
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
