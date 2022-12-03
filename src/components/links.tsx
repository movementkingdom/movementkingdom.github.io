import { Link } from 'gatsby';
import * as React from 'react';

const items = [
  { id: 1, value: "Aktuelle Kurse", link: "kurse" },
  { id: 2, value: "News", link: "news" },
  { id: 2, value: "Blog", link: "blog" },
  { id: 3, value: "Über mich", link: "about" }
];

const Links = () => {
  return (
    <div className="flex justify-center min-w-md">
      <ul role="list" className="flex flex-col space-y-2 pt-2 w-56 max-w-md">
        {items.map((item) => (
          <li key={item.id}>
            <Link to={ item.link }>
            <div className="inline-flex justify-center rounded-md border border-transparent bg-amber-100 w-56 px-4 py-2 text-sm font-medium text-amber-900 hover:bg-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2">
                {item.value}
              </div>

              
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Links;
