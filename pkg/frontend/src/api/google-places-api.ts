

const usePlacesAPI = () => {
  const getPlaces = async (latLng) => {
    if (!google) {
      throw new Error("Google Maps API is not loaded");
    }

    const requestBody = {
      fields: ['displayName', 'location', 'rating'],
      locationRestriction: {
        center: latLng,
        radius: 8046.72,
      },
      includedPrimaryTypes: ['restaurant'],
    };

    const { places } = await google.maps.places.Place.searchNearby(requestBody);
    return places;
  };

  return { getPlaces };
};

export default usePlacesAPI;
