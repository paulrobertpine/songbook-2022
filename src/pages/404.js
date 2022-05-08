import * as React from "react"
import Layout from "../components/layout"
const title = "404"

export default function Page404() {
  return (
    <Layout title={title}>
      <article id="home">
        <header>
          <section className="container">
            <h1 className="fancy">{title}</h1>
          </section>
        </header>
      </article>
    </Layout>
  )
}
