import { graphql, HeadFC, Link, PageProps, useStaticQuery } from 'gatsby';
import * as React from 'react';

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

const Impressum: React.FC<Props> = ({ data }: Props) => {
  const { markdownRemark } = data;
  console.log(data);
  console.log(markdownRemark);
  const { html } = markdownRemark;
  return (
    <main>
      <Layout>
        <p className="text-center m-6 font-bold font-serif text-4xl">{markdownRemark.frontmatter.title}</p>
        <div className="m-4 " dangerouslySetInnerHTML={{ __html: html }} />
        <HomeButton />
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
