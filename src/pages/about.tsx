import { graphql, HeadFC, Link, PageProps, useStaticQuery } from 'gatsby';
import * as React from 'react';

import Avatar from '../components/avatar';
import Footer from '../components/footer';
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

const About: React.FC<Props> = ({ data }: Props) => {
  const { markdownRemark } = data;
  console.log(data);
  console.log(markdownRemark);
  const { html } = markdownRemark;
  return (
    <main>
      <Layout>
        <div className="max-w-2xl w-lg mx-auto">
          <p className="flex justify-center mt-10 mb-10">
            <Avatar size={56} />
          </p>
          <Heading text={"Über mich"} />
          <div className="markdown m-6" dangerouslySetInnerHTML={{ __html: html }} />
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
