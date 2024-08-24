import React, { FC, useRef, useState, useEffect } from "react";
import "./App.css";
import { useLoadScript } from "@react-google-maps/api";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { Libraries } from "@react-google-maps/api";

const libraries: Libraries = ["places", "geocoding"];

const App: FC = () => {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY!;
  const [geocode, setGeocode] = useState<google.maps.GeocoderResult[] | null>(null);
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current || !geocoder) {
      console.log('Input ref or geocoder not available:', { inputRef: !!inputRef.current, geocoder: !!geocoder });
      return;
    }
    const address = inputRef.current.value;
    geocoder.geocode({ address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results) {
        setGeocode(results);
        console.log("Geocode results:", results);
      } else {
        console.error("Geocode was not successful for the following reason:", status);
        setGeocode(null);
      }
    });
  }

  const mapCenter = geocode && geocode[0]?.geometry?.location 
    ? { lat: geocode[0].geometry.location.lat(), lng: geocode[0].geometry.location.lng() }
    : DEFAULT_CENTER;

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <APIProvider apiKey={API_KEY} version="beta" libraries={['geocoding']}>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Enter a city" ref={inputRef} /> 
        <input type="submit" value="Submit" />
      </form>
      <Map
        style={{ width: "80vw", height: "80vh" }}
        center={mapCenter}
        zoom={geocode ? 12 : DEFAULT_ZOOM}
        fullscreenControl={false}
        zoomControl={true}
        disableDefaultUI={true}
      >
      </Map>
      </APIProvider>
    </div>
  );
};

export default App;