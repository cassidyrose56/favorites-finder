import { useMemo } from 'react';
import usePlacesAPI from "../api/google-places-api";

const useFilter = () => {
  const { getPlaces } = usePlacesAPI();
  
  return useMemo(() => ({
    topTenPlaces: async (placeString: string) => {
      console.log('placeString: ', placeString);
      const places = await getPlaces(placeString);
      places.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      console.log('top ten: ', places.slice(0, 10));
      return places.slice(0, 10);
    }
  }), [getPlaces]);
};

export default useFilter;