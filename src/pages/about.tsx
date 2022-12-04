import { graphql, HeadFC, Link, PageProps, useStaticQuery } from 'gatsby';
import * as React from 'react';

import Avatar from '../components/avatar';
import Footer from '../components/footer';
import Header from '../components/header';
import Heading from '../components/heading';
import Layout from '../components/layout';
import PrimaryButton from '../components/primary-button';

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

const About: React.FC<Props> = ({ data: { markdownRemark } }: Props) => {
  return (
    <main>
      <Layout>
        <Header />
        <Heading text={"Über mich"} />
        <div className="mt-10 mb-10 w-56 h-56 max-w-full mx-auto">
          <Avatar name="dom" />
        </div>
        <div className="pb-10 max-w-2xl w-lg mx-auto">
          <div className="markdown px-6" dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
        </div>
        <PrimaryButton link={"/"} />
        <Footer />
      </Layout>
    </main>
  );
};

export default About;

export const Head: HeadFC = () => <title>Über mich</title>;

export const pageQuery = graphql`
  {
    markdownRemark(frontmatter: { slug: { eq: "/about" } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`;
