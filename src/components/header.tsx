import { Link } from 'gatsby';
import * as React from 'react';

import Avatar from './avatar';
import Logo from './logo';

const Header = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto pt-10 px-4">
        <div className="text-center">
          <Link to="/">
            <Logo />
          </Link>
          <p className="max-w-xl mt-5 mx-auto text-xl italic font-serif font-thin text-gray-500">
            "Move.More.Mindfully"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
