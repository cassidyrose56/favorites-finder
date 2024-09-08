import React, { FC, useState, useCallback } from "react";
import { useAdvancedMarkerRef, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";

type MarkerWithInfoWindowProps = {
    position: google.maps.LatLng | null | undefined;
    name: string | null | undefined;
    index: number;
};

const MarkerWithInfoWindow: FC<MarkerWithInfoWindowProps> = ({position, name, index}) => {
    const [markerRef, marker] = useAdvancedMarkerRef();
  
    const [infoWindowShown, setInfoWindowShown] = useState(false);
  
    const handleMarkerClick = useCallback(
      () => setInfoWindowShown(isShown => !isShown),
      []
    );
  
    const handleClose = useCallback(() => setInfoWindowShown(false), []);
  
    return (
      <>
        <AdvancedMarker
          ref={markerRef}
          position={position}
          onClick={handleMarkerClick}
        >
            <Pin background={'#48c76a'} glyph={index.toString()} glyphColor={'#1D5E2E'} borderColor={'#1D5E2E'} />
        </AdvancedMarker>
  
        {infoWindowShown && (
          <InfoWindow anchor={marker} onClose={handleClose}>
            <h2>{name}</h2>
          </InfoWindow>
        )}
      </>
    );
  };

  export default MarkerWithInfoWindow;