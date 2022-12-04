import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as React from 'react';

type AvatarProps = {
  size: number;
  name: string;
};

const Avatar: React.FC<AvatarProps> = ({ size, name }) => {
  const data = useStaticQuery(graphql`
    query {
      dom: allFile(filter: { sourceInstanceName: { eq: "images" }, name: { eq: "avatar-dom" } }) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
      conny: allFile(filter: { sourceInstanceName: { eq: "images" }, name: { eq: "avatar-conny" } }) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  `);

  const image = getImage(data[name.toLowerCase()].edges[0].node);

  return (
    <div className={`w h-${size} w-${size} rounded-full`}>
      <GatsbyImage className="rounded-full" image={image} alt="Avatar Image" />
    </div>
  );
};

export default Avatar;
