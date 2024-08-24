import usePlacesAPI from "../api/google-places-api";

const useFilter = () => {
  const { getPlaces } = usePlacesAPI();
  const topTenPlaces = async (latLng) => {
    const places = await getPlaces(latLng);
    places.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    console.log('top ten: ', places.slice(0, 10));
    return places.slice(0, 10);
  };

  return { topTenPlaces };
};

export default useFilter;
