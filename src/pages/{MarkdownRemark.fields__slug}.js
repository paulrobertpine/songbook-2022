import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

// song template
export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <article className="song">
        <header className="song-header">
          <h1>{frontmatter.title}</h1>
          <h2>{frontmatter.artist}</h2>
          Key: {frontmatter.key}
          <br />
          YouTube: {frontmatter.youtube}
        </header>

        <section
          className="song-content"
          dangerouslySetInnerHTML={{ __html: html }}
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
    }
  }
`
