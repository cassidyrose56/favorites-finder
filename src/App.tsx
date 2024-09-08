/// <reference types="@types/google.maps" />
import React, { FC, useEffect, useRef, useState, useCallback } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { Libraries } from "@react-google-maps/api";
import useFilter from "./utils/filter";
import MarkerWithInfoWindow from "./components/Marker-with-info";
import PlaceAutocomplete from "./components/Autocomplete-input";
import "./index.css";
import { Place } from "./api/google-places-api";

const libraries: Libraries = ["places", "geocoding"];

const App: FC = () => {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [geocode, setGeocode] = useState<google.maps.GeocoderResult[] | null>(
    null
  );
  const [placeString, setPlaceString] = useState<string>("");
  const [places, setPlaces] = useState<Place[] | null>(null);
  const { topTenPlaces } = useFilter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: libraries,
  });

  if (isLoaded && !geocoder) {
    setGeocoder(new google.maps.Geocoder());
  }

  const DEFAULT_CENTER = { lat: 30.267153, lng: -97.743057 };

  const geocodeAddress = (geocoder: google.maps.Geocoder, address: string) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results) {
        setGeocode(results);
        setPlaceString(placeString); // Assuming placeString is derived from results
      } else {
        console.error(
          "Geocode was not successful for the following reason:",
          status
        );
        setGeocode(null);
      }
    });
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      if (placeString) {
        const placeResults = await topTenPlaces(placeString);
        setPlaces(placeResults);
      }
    };

    fetchPlaces();
  }, [placeString, topTenPlaces]);

  const onSubmit = async () => {
    if (!inputRef.current || !geocoder) {
      console.log("Input ref or geocoder not available:", {
        inputRef: !!inputRef.current,
        geocoder: !!geocoder,
      });
      return;
    }
    const address = inputRef.current.value;
    setPlaceString(address);
    geocodeAddress(geocoder, address);
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
        <PlaceAutocomplete
          onPlaceSelect={(place) => console.log(place)}
          onSubmit={onSubmit}
          inputRef={inputRef}
        />
      </form>
      <Map
        id="map"
        style={{ width: "80vw", height: "80vh" }}
        mapId="8c732c82e4ec29d9"
        center={mapCenter}
        defaultZoom={12}
        fullscreenControl={false}
        zoomControl={true}
        disableDefaultUI={true}
      >
        {places?.map((place) => {
          const myLatLng = new google.maps.LatLng(
            place.location.latitude,
            place.location.longitude
          );
          return (
            <MarkerWithInfoWindow
              key={`${place.location.latitude}-${place.location.longitude}`}
              position={myLatLng}
              name={place.displayName.text}
            />
          );
        })}
      </Map>
    </APIProvider>
  );
};

export default App;
