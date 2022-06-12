const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    // automatically generate a slug from the filename
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// see https://www.gatsbyjs.com/docs/how-to/local-development/troubleshooting-common-errors/
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        fs: false,
      },
    },
    resolve: {
      alias: {
        handlebars: "handlebars/dist/handlebars.min.js",
      },
    },
  })
}
