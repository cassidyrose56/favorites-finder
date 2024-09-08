import axios from "axios";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export type Place = {
  displayName: {
    text: string;
    languageCode: string;
  },
  location: {
    latitude: number;
    longitude: number;
  },
  rating: number,
  userRatingCount: number,
  primaryTypeDisplayName: {
    text: string;
    languageCode: string;
  },
  googleMapsUri: string;
};

const usePlacesAPI = () => {
  const getPlaces = async (place: string): Promise<Place[]> => {
    const fullQuery = `Restaurants in ${place}`;
    let allPlaces: Place[] = [];
    let nextPageToken: string | undefined;

    for (let i = 0; i < 3; i++) { /* gets 60 places */
      try {
        const response = await axios.post(
          "https://places.googleapis.com/v1/places:searchText",
          {
            textQuery: fullQuery,
            minRating: 4.5,
            //can be customized with any of these types: https://developers.google.com/maps/documentation/places/web-service/place-types
            includedType: "restaurant",
            //price levels docs: https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places#PriceLevel
            //priceLevels: ["PRICE_LEVEL_INEXPENSIVE"],
            strictTypeFiltering: true,
            pageSize: 20,
            ...(nextPageToken && { pageToken: nextPageToken }),
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": API_KEY,
              "X-Goog-FieldMask":
                "places.displayName,places.location,places.rating,places.userRatingCount,places.primaryTypeDisplayName,places.googleMapsUri,nextPageToken",
            },
          }
        );

        if (response.data.places) {
          allPlaces = allPlaces.concat(
            response.data.places.map((place: Place) => ({
              displayName: place.displayName,
              location: place.location,
              rating: place.rating,
              userRatingCount: place.userRatingCount,
              primaryTypeDisplayName: place.primaryTypeDisplayName,
              googleMapsUri: place.googleMapsUri,
            }))
          );
        }

        nextPageToken = response.data.nextPageToken;

        if (!nextPageToken) break;

        // Wait for 100 milliseconds before making the next request
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        console.error("Error fetching places:", error);
        throw error;
      }
    }
    return allPlaces;
  };

  return { getPlaces };
};

export default usePlacesAPI;
