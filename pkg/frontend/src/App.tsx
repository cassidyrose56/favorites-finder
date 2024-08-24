import React, { FC, useRef, useState, useEffect } from "react";
import "./App.css";
import { useLoadScript } from "@react-google-maps/api";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { Libraries } from "@react-google-maps/api";
import useFilter from "./utils/filter";

const libraries: Libraries = ["places", "geocoding"];

const App: FC = () => {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY!;
  const [geocode, setGeocode] = useState<google.maps.GeocoderResult[] | null>(
    null
  );
  const [places, setPlaces] = useState<google.maps.places.Place[] | null>();
  const { topTenPlaces } = useFilter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: libraries,
  });

  useEffect(() => {
    if (isLoaded && !geocoder) {
      setGeocoder(new google.maps.Geocoder());
    }
  }, [isLoaded, geocoder]);

  const DEFAULT_CENTER = { lat: 30.267153, lng: -97.743057 };
  const DEFAULT_ZOOM = 3;
  const DEFAULT_ZOOM_WITH_LOCATION = 12;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current || !geocoder) {
      console.log("Input ref or geocoder not available:", {
        inputRef: !!inputRef.current,
        geocoder: !!geocoder,
      });
      return;
    }
    const address = inputRef.current.value;
    geocoder.geocode({ address }, async (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results) {
        setGeocode(results);
        const placeResults = await topTenPlaces(results[0].geometry.location);
        setPlaces(placeResults);
      } else {
        console.error(
          "Geocode was not successful for the following reason:",
          status
        );
        setGeocode(null);
      }
    });
  };

  const mapCenter =
    geocode && geocode[0]?.geometry?.location
      ? {
          lat: geocode[0].geometry.location.lat(),
          lng: geocode[0].geometry.location.lng(),
        }
      : DEFAULT_CENTER;

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <APIProvider apiKey={API_KEY} version="beta" libraries={["geocoding"]}>
      <form onSubmit={onSubmit}>
        <label>Enter a city or zip code:</label>
        <input type="text" placeholder="Enter a city" ref={inputRef} />
        <input type="submit" value="Submit" />
      </form>
      <Map
        style={{ width: "80vw", height: "80vh" }}
        mapId="8c732c82e4ec29d9"
        center={mapCenter}
        zoom={geocode ? DEFAULT_ZOOM_WITH_LOCATION : DEFAULT_ZOOM}
        fullscreenControl={false}
        zoomControl={true}
        disableDefaultUI={true}
      >
        {places?.map((place, index) => {
          return (
            <AdvancedMarker key={index} position={place?.location}>
              <Pin
                background={"#FBBC04"}
                glyphColor={"#000"}
                borderColor={"#000"}
              />
            </AdvancedMarker>
          );
        })}
      </Map>
    </APIProvider>
  );
};

export default App;
