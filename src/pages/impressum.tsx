import { graphql, HeadFC, Link, PageProps, useStaticQuery } from 'gatsby';
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

const Impressum: React.FC<Props> = ({ data }: Props) => {
  const { markdownRemark } = data;
  console.log(data);
  console.log(markdownRemark);
  const { html } = markdownRemark;
  return (
    <main>
      <Layout>
        <Header />
        <Social />
        <Heading text={markdownRemark.frontmatter.title} />
        <div className="markdown m-4 mx-auto px-6 max-w-2xl w-lg" dangerouslySetInnerHTML={{ __html: html }} />
        <HomeButton />
        <Footer />
      </Layout>
    </main>
  );
};

export default Impressum;

export const Head: HeadFC = () => <title>Impressum</title>;

export const pageQuery = graphql`
  {
    markdownRemark(frontmatter: { slug: { eq: "/impressum" } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`;
