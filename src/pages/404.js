import React from "react"
import Layout from "../components/layout"
const title = "Songbook"

export default function fourOhFour() {
  return (
    <Layout title={title}>
      <article>
        <section className="container reading">
          <p>Opps, these are not the songs you're looking for...</p>
        </section>
      </article>
    </Layout>
  )
}