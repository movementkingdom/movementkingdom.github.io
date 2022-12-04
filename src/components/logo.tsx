import { StaticImage } from 'gatsby-plugin-image';
import * as React from 'react';

// import logoImage from '../images/banner-logo.png';

const Logo = () => {
  return (
    <div className="h-48 w-96 mx-auto">
      <StaticImage className="rounded-full" src="../images/banner-logo.png" alt="Logo Image" />
    </div>
  );
};

export default Logo;
