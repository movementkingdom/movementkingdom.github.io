import { Link } from 'gatsby';
import * as React from 'react';

const items = [
  { id: 1, value: "test" },
  { id: 2, value: "test2" },
  { id: 3, value: "test2" },
  // More items...
];

const Footer = () => {
  return (
    <div className="flex flex-col space-y-2 mx-auto max-w-sm m-6 text-center pt-4 border-t-2 border-gray-200">
      <Link to="/impressum/">
        <p className="text-amber-400 text-sm font-serif">Impressum</p>
      </Link>
      <p className="text-gray-400 text-sm">@ 2022 Dominik Stamm</p>
    </div>
  );
};

export default Footer;
