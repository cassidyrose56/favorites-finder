const usePlacesAPI = () => {
  const getPlaces = async (place: string) => {
    if (!google) {
      throw new Error("Google Maps API is not loaded");
    }
    const fullPlace = `Restaurants in ${place}`;
    console.log("fullPlace: ", fullPlace);
    const requestBody = {
      textQuery: fullPlace,
      fields: ['displayName', 'location', 'rating'],
      includedType: 'restaurant',
      language: 'en-US',
      minRating: 4.5,
      region: 'us',
    };

    const { places } = await google.maps.places.Place.searchByText(requestBody);
    return places;
  };

  return { getPlaces };
};

export default usePlacesAPI;
