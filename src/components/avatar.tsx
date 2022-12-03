import * as React from 'react';

import avatar from '../images/avatar.png';

type AvatarProps = {
  size: number;
};

const Avatar: React.FC<AvatarProps> = ({ size }) => {
  return (
    <>
      <img
        className={`inline-block w h-${ size } w-${ size } rounded-full`}
        // className={`w-28 rounded-full`}
        src={ avatar }
        alt="Avatar Image"
      />
      {/* <p>"inline-block h-{ size } w-{ size } rounded-full"</p> */}
    </>
  );
};

export default Avatar;
