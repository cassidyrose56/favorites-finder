import { useMemo } from "react";

import usePlacesAPI from "../api/google-places-api";

const useFilter = () => {
  const { getPlaces } = usePlacesAPI();

  return useMemo(
    () => ({
      topTenPlaces: async (placeString: string) => {
        const places = await getPlaces(placeString);
        const sortedPlaces = places.sort(
          (a, b) => (b.rating || 0) - (a.rating || 0)
        );
        return sortedPlaces.slice(0, 10);
      },
    }),
    [getPlaces]
  );
};

export default useFilter;
