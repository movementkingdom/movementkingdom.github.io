import { Link } from 'gatsby';
import * as React from 'react';

interface Props {
  link: string;
}

const PrimaryButton: React.FC<Props> = ({ link }: Props) => {
  return (
    <div className="flex justify-center">
      <Link to={link}>
        <div className="inline-flex justify-center rounded-md border border-transparent bg-amber-100 px-4 py-2 text-sm font-medium text-amber-900 hover:bg-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2">
          Zurück
        </div>
      </Link>
    </div>
  );
};

export default PrimaryButton;
