import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

const title = "Songbook"

export default function Home({ data, location }) {
  const { allMarkdownRemark } = data
  const { totalCount } = allMarkdownRemark
  const posts = allMarkdownRemark.nodes

  return (
    <Layout title={title}>
      <article id="home">
        <header>
          <section className="container">
            <h1 className="fancy">{title}</h1>
            <span>{totalCount} Songs</span>
          </section>
        </header>

        <section className="container reading">
          <ol className="song-list ">
            {posts.map((post) => {
              return (
                <li key={post.fields.slug}>
                  <Link to={post.fields.slug}>
                    <span className="title">{post.frontmatter.title}</span>
                    <span className="artist">{post.frontmatter.artist}</span>
                  </Link>
                </li>
              )
            })}
          </ol>
        </section>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { order: ASC, fields: frontmatter___title }) {
      totalCount
      nodes {
        frontmatter {
          title
          artist
        }
        fields {
          slug
        }
      }
    }
  }
`
