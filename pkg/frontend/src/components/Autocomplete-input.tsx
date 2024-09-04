import { useMapsLibrary } from "@vis.gl/react-google-maps";
import React, { useState, useEffect } from "react";

type PlaceAutocompleteProps = {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  onSubmit: () => void;
  inputRef: React.RefObject<HTMLInputElement>; // Add inputRef as a prop
};

const PlaceAutocomplete = ({ onPlaceSelect, onSubmit, inputRef }: PlaceAutocompleteProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places, inputRef]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
      onSubmit(); // Call onSubmit when a place is selected
    });
  }, [onPlaceSelect, placeAutocomplete, onSubmit]);

  return (
    <div className="autocomplete-container">
      <input ref={inputRef} />
    </div>
  );
};

export default PlaceAutocomplete;