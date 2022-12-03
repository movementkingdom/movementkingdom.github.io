import * as React from 'react';

type Props = {
  text: string;
};

const Heading: React.FC<Props> = ({ text }) => {
  return (
    <p className="text-center m-6 font-bold font-serif text-4xl">{text}</p>
  );
};

export default Heading;
