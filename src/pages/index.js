import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { MdChangeCircle, MdClear, MdSortByAlpha } from "react-icons/md"
import Layout from "../components/layout"
const title = "Songbook"

export default function Home({ data }) {
  const { allMarkdownRemark } = data
  const posts = allMarkdownRemark.nodes
  const [search, setSearch] = useState("")
  const [shuffled, setShuffled] = useState(1)

  let filteredSongs = posts.filter((post) => {
    return (
      post.frontmatter.title.toLowerCase().indexOf(search.toLowerCase()) !==
      -1 ||
      post.frontmatter.artist.toLowerCase().indexOf(search.toLowerCase()) !== -1
    )
  })

  if (shuffled > 0) {
    shuffle(filteredSongs)
  }

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
    } else {
      return <p>No songs found</p>
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
            <h1 className="fancy"><Link to="/">{title}</Link></h1>
            <span id="song-list-control">
              {filteredSongs.length} Songs
              <button onClick={() => setShuffled(shuffled + 1)}>
                <MdChangeCircle />
              </button>
              <button onClick={() => setShuffled(0)}>
                <MdSortByAlpha />
              </button>


            </span>

            <span id="filter-search">
              <input
                type="text"
                placeholder="title or artist"
                value={search}
                onChange={(e) => searchSongs(e.target.value)}
              />
              <button onClick={() => setSearch("")}>
                {search && <MdClear />}
              </button>
            </span>
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

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}
