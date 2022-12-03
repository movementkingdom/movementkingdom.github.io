import { graphql } from 'gatsby';
import * as React from 'react';

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

const Post: React.FC<Props> = ({ data }: Props) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  console.log(data);
  return (
    <div>
      <div>
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
};

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`;
