const path = require("path");
import { GatsbyNode } from 'gatsby';

type TypePost = {
  node: {
    id: string;
    frontmatter: {
      slug: string;
    };
  };
};

type TypeData = {
  allMarkdownRemark: {
    edges: TypePost[];
  };
};

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql<TypeData>(`
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/(posts)/" } }) {
        edges {
          node {
            id
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  // Create blog post pages.
  const posts = result.data?.allMarkdownRemark.edges;
  console.log(posts);

  const createPostPromise = result.data?.allMarkdownRemark.edges.map((edge) => {
    createPage({
      path: edge.node.frontmatter.slug,
      component: path.resolve(`./src/templates/post-template.tsx`),
      context: { id: edge.node.id },
    });
  });

  await Promise.all([createPostPromise]);
};
