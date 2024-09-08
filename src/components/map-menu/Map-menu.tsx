import React from 'react';
import MapItem from './Map-item';
import { Place } from '../../api/google-places-api';

type MapMenuProps = {
  items: Place[] | null;
};

export const MapMenu: React.FC<MapMenuProps> = ({ items }) => {
  return (
    <div className={`bg-primary-100 rounded-r-md shadow-lg ${items === null ? `p-0` : `p-4`}  max-w-md h-[65vh] overflow-scroll`}>
      <div className="space-y-4">
        {items && items.map((item, index) => (
          <MapItem
            key={index}
            index={index + 1}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};
