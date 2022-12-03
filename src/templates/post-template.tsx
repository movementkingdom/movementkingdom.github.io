import { graphql } from 'gatsby';
import * as React from 'react';

import Footer from '../components/footer';
import Header from '../components/header';
import Heading from '../components/heading';
import HomeButton from '../components/home-button';
import Layout from '../components/layout';
import Social from '../components/social';

interface Props {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: {
        date: string;
        slug: string;
        title: string;
      };
    };
  };
}

const BlogPostTemplate: React.FC<Props> = ({ data: { markdownRemark } }: Props) => {
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout>
      <Header />
      <Social />
      <Heading text={frontmatter.title} />
      <div className="m-4 mx-auto px-6 max-w-2xl w-lg">
        <p className="text-center">{frontmatter.date}</p>
        <div className="markdown post-body" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <HomeButton />
      <Footer />
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        slug
      }
    }
  }
`;
