import React from "react"
import { graphql } from "gatsby"
import ChordSheetJS from "chordsheetjs"
import Layout from "../components/layout"
// import { FiMinusCircle, FiPlusCircle, FiRefreshCw } from "react-icons/fi"

// song template
export default function Song({ data }) {
  const { markdownRemark } = data
  const { frontmatter, rawMarkdownBody } = markdownRemark
  // console.log("html: ", html)

  const parser = new ChordSheetJS.ChordProParser()
  const song = parser.parse(rawMarkdownBody)
  const formatter = new ChordSheetJS.HtmlDivFormatter()
  const disp = formatter.format(song)

  return (
    <Layout>
      <article className="song">
        <header className="song-header">
          <section className="container">
            <span>{frontmatter.artist}</span>
            <h1>{frontmatter.title}</h1>
            <span>Key of {frontmatter.key}</span>
          </section>
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
      html
      rawMarkdownBody
    }
  }
`
