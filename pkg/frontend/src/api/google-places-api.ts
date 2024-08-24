

const usePlacesAPI = () => {
  const getPlaces = async () => {
    if (!google) {
      throw new Error("Google Maps API is not loaded");
    }

    const center = new google.maps.LatLng(52.369358, 4.889258);
    const requestBody = {
      center: center,
      radius: 500,
      fields: ["restaurant"]
    };

    const { places } = await google.maps.places.Place.searchNearby(requestBody);
    console.log(places);
    return places;
  };

  return { getPlaces };
};

export default usePlacesAPI;
