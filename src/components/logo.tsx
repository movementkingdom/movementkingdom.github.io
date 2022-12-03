import * as React from 'react';

import logoImage from '../images/logo.png';

const Logo= () => {
  return (
    <>
      <img
        className='inline-block h-48 w-96 rounded-full'
        src={ logoImage }
        alt="Logo Image"
      />
    </>
  );
};

export default Logo;
