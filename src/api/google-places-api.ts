import axios from "axios";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export type Place = {
  displayName: {
    text: string;
    languageCode: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  rating: number;
};

const usePlacesAPI = () => {
  const getPlaces = async (place: string): Promise<Place[]> => {
    const fullQuery = `Restaurants in ${place}`;

    try {
      const response = await axios.post(
        "https://places.googleapis.com/v1/places:searchText",
        { textQuery: fullQuery },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": API_KEY,
            "X-Goog-FieldMask":
              "places.displayName,places.location,places.rating",
          },
        }
      );

      if (response.data.places) {
        return response.data.places.map((place: Place) => ({
          displayName: place.displayName,
          location: place.location,
          rating: place.rating,
        }));
      } else {
        throw new Error("No places found in the response");
      }
    } catch (error) {
      console.error("Error fetching places:", error);
      throw error;
    }
  };

  return { getPlaces };
};

export default usePlacesAPI;
