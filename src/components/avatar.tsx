import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as React from 'react';

import imageConny from '../images/avatar-conny.png';
import imageDom from '../images/avatar-dom.png';

type AvatarProps = {
  name: string;
};

const avatars = [
  { name: "dom", image: imageDom },
  { name: "conny", image: imageConny },
];

const Avatar: React.FC<AvatarProps> = ({ name }) => {
  return (
    <img
      className={"rounded-full"}
      src={avatars.find((e) => e.name === name.toLowerCase())?.image}
      alt="Avatar Image"
    />
  );
};

export default Avatar;
