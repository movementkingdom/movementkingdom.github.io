import { graphql, HeadFC, Link, PageProps, useStaticQuery } from 'gatsby';
import * as React from 'react';

import Avatar from '../components/avatar';
import Footer from '../components/footer';
import Header from '../components/header';
import Heading from '../components/heading';
import HomeButton from '../components/home-button';
import Layout from '../components/layout';

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
        <p className="flex justify-center mt-10 mb-10">
          <Avatar size={56} />
        </p>
        <div className="max-w-2xl w-lg mx-auto">
          <div className="markdown px-6" dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
        </div>
        <HomeButton />
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
