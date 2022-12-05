import { graphql, HeadFC, Link, PageProps } from 'gatsby';
import * as React from 'react';

import Footer from '../components/footer';
import Header from '../components/header';
import Heading from '../components/heading';
import Layout from '../components/layout';
import PrimaryButton from '../components/primary-button';
import Social from '../components/social';

interface BlogPostType {
  node: {
    timeToRead: string;
    frontmatter: {
      title: string;
      description: string;
      date: string;
      slug: string;
      public: boolean;
    };
  };
}
interface Props {
  data: {
    allMarkdownRemark: {
      edges: BlogPostType[];
    };
  };
}

const Blog: React.FC<Props> = ({ data }: Props) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <Header />
      <Social />
      <Heading text={"Blog"} />
      <div className="bg-white px-6 py-10 max-w-2xl w-lg mx-auto">
        <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
          <div>
            <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
              <p className="text-xl text-gray-500">Alles zu den Themen Yoga, Budokon und gesund Leben.</p>
              <form className="mt-6 flex flex-col sm:flex-row lg:mt-0 lg:justify-end">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email Adresse
                  </label>
                  <input
                    id="email-address"
                    name="email-address"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none w-full px-4 py-2 border border-gray-300 text-base rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-amber-500 focus:border-amber-500 lg:max-w-xs"
                    placeholder="Deine Email Adresse"
                  />
                </div>
                <div className="mt-2 flex-shrink-0 w-full flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:inline-flex">
                  <button
                    type="button"
                    className="inline-flex justify-center items-center rounded-md border border-transparent bg-amber-100 px-4 py-2 text-sm font-medium text-amber-900 hover:bg-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                  >
                    Abonieren
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
            {posts.map((post) => (
              <div key={post.node.frontmatter.title}>
                <p className="text-sm text-gray-500">
                  <time dateTime={post.node.frontmatter.date}>{post.node.frontmatter.date}</time>
                </p>
                <Link to={"/blog" + post.node.frontmatter.slug} className="mt-2 block">
                  <p className="text-xl font-semibold text-gray-900">{post.node.frontmatter.title}</p>
                  <p className="mt-3 text-base text-gray-500">{post.node.frontmatter.description}</p>
                </Link>
                <div className="mt-3">
                  <Link
                    to={"/blog" + post.node.frontmatter.slug}
                    className="text-base font-semibold text-amber-500 hover:text-amber-400"
                  >
                    weiterlesen
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PrimaryButton link={"/"} />
      <Footer />
    </Layout>
  );
};

export default Blog;

export const Head: HeadFC = () => <title>Blog</title>;

export const BlogQuery = graphql`
  query AllBlogPosts {
    allMarkdownRemark (filter: { 
      fileAbsolutePath: { regex: "/(posts)/" } 
      frontmatter: { public: { eq: true } }
    }) {
      edges {
        node {
          timeToRead
          frontmatter {
            title
            description
            date
            slug
            public
          }
        }
      }
    }
  }
`;
