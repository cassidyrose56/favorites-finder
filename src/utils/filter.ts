import { useMemo } from "react";

import usePlacesAPI from "../api/google-places-api";

const useFilter = () => {
  const { getPlaces } = usePlacesAPI();

  return useMemo(
    () => ({
      topTenPlaces: async (placeString: string) => {
        const places = await getPlaces(placeString);
        const sortedPlaces = places.sort((a, b) => {
          // First, compare by rating
          const ratingDiff = (b.rating || 0) - (a.rating || 0);
          if (ratingDiff !== 0) return ratingDiff;
          
          // If ratings are equal, compare by number of reviews
          return (b.userRatingCount || 0) - (a.userRatingCount || 0);
        });
        return sortedPlaces.slice(0, 10);
      },
    }),
    [getPlaces]
  );
};

export default useFilter;
