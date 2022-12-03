import '../utils/font-awesome.ts';

import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const items = [
  { id: 1, label: "Instagram", link: "https://instagram.com/movement.king.dom", icon: ["fab", "instagram"] },
  { id: 2, label: "Youtube", link: "https://youtube.com/channel/UCooXqc9diNrrr8dmAk6EFPQ", icon: ["fab", "youtube"] },
  { id: 3, label: "Telegram", link: "https://t.me/movementkingdom", icon: ["fab", "telegram"] },
  { id: 4, label: "Email", link: "https://youtube.com/channel/UCooXqc9diNrrr8dmAk6EFPQ", icon: ["fas", "envelope"] },
];

const Social = () => {
  return (
    <div className="flex items-center justify-center m-4 space-x-2">
      {items.map((item) => (
        <a key={item.id} href={item.link} aria-label={item.label} target="_blank">
          <FontAwesomeIcon icon={item.icon} className="text-gray-500 text-2xl" />
        </a>
      ))}
    </div>
  );
};

export default Social;
