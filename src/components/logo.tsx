import { StaticImage } from 'gatsby-plugin-image';
import * as React from 'react';

import logoImage from '../images/banner-logo.png';

const Logo = () => {
  return (
    <div className="">
      <img className="w-96 max-with-full mx-auto" src={logoImage} alt="Logo Image" />
    </div>
  );
};

export default Logo;
