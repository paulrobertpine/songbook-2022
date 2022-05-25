import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { MdChangeCircle } from "react-icons/md"

import Layout from "../components/layout"
const title = "Songbook"

export default function Home({ data }) {
  const [search, setSearch] = useState("")
  const { allMarkdownRemark } = data
  const { totalCount } = allMarkdownRemark
  const posts = allMarkdownRemark.nodes

  let filteredSongs = posts.filter(post => {
    return (
      post.frontmatter.title
        .toLowerCase()
        .indexOf(search.toLowerCase()) !== -1
      ||
      post.frontmatter.artist
        .toLowerCase()
        .indexOf(search.toLowerCase()) !== -1
    )
  })

  function showSongs(songs) {
    if (songs.length > 0) {
      return (
        <ol className="song-list ">
          {songs.map((song) => {
            return (
              <li key={song.fields.slug}>
                <Link to={song.fields.slug}>
                  <span className="title">{song.frontmatter.title}</span>
                  <span className="artist">{song.frontmatter.artist}</span>
                </Link>
              </li>
            )
          })}
        </ol>
      )
    }
    else {
      return (
        <p>No songs found</p>
      )
    }
  }

  function searchSongs(query) {
    setSearch(query)
  }

  return (
    <Layout title={title}>
      <article id="home">
        <header>
          <section className="container">
            <h1 className="fancy">{title}</h1>
            <span>{totalCount} Songs</span>

            <form>
              {/* <MdChangeCircle /> */}
              <input
                type="text"
                id="filter-search"
                placeholder="title or artist &#x1F50D;"
                value={search}
                onChange={(e) => searchSongs(e.target.value)}
              />
              {/* <button value="X" onClick={() => setSearch("")}>X</button> */}

            </form>



          </section>
        </header>

        <section className="container reading">
          {showSongs(filteredSongs)}
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
