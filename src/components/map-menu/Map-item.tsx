import React from "react";
import Button from "../atoms/Button";
import { Place } from "../../api/google-places-api";

type MapItemProps = {
  index: number;
  item: Place;
};

const MapItem: React.FC<MapItemProps> = ({ item, index }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 max-w-sm flex items-center gap-5 w-80">
      <span className="text-secondary-900 text-base font-medium">{index}</span>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-secondary-900 leading-none">
            {item.displayName.text}
          </h2>
        </div>
        <div className="flex flex-col gap-0">
          <div className="flex items-center gap-1">
            <span className="text-grey-700 text-xs">
              {item.rating.toFixed(1)}
            </span>
            <div className="flex text-tertiary">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-3.5 h-3.5 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="text-grey-700 text-xs">
              ({item.userRatingCount.toLocaleString()})
            </span>
          </div>
          <p className="text-grey-700 text-sm">{item.primaryTypeDisplayName?.text || 'Restaurant'}</p>        </div>
        <Button buttonType="primary" link={item.googleMapsUri}>Directions</Button>
      </div>
    </div>
  );
};

export default MapItem;
