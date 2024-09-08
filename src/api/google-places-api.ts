const usePlacesAPI = () => {
  const getPlaces = async (place: string) => {
    if (!google) {
      throw new Error("Google Maps API is not loaded");
    }
    const fullPlace = `Best rated and reviewed restaurants in ${place}`;
    console.log("fullPlace: ", fullPlace);

    // First, geocode the place to get its coordinates
    const geocoder = new google.maps.Geocoder();
    const geocodeResult = await new Promise<google.maps.GeocoderResult | null>(
      (resolve, reject) => {
        geocoder.geocode({ address: place }, (results, status) => {
          if (
            status === google.maps.GeocoderStatus.OK &&
            results &&
            results[0]
          ) {
            resolve(results[0]);
          } else {
            reject(new Error("Geocoding failed"));
          }
        });
      }
    );

    if (!geocodeResult) {
      throw new Error("Unable to geocode the place");
    }

    const center = geocodeResult.geometry.location;

    const requestBody = {
      locationRestriction: {
        center: center,
        radius: 2000,
      },
      fields: ["displayName", "location", "rating"],
      includedPrimaryTypes: ["restaurant"],
      language: "en-US",
      rankPreference: google.maps.places.SearchNearbyRankPreference.POPULARITY,
      region: "us",
    };

    const { places } = await google.maps.places.Place.searchNearby(requestBody);
    console.log(places);
    return { places };
  };

  return { getPlaces };
};

export default usePlacesAPI;
