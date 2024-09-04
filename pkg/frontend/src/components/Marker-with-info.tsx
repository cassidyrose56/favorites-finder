import React, { FC, useState, useCallback } from "react";
import { useAdvancedMarkerRef, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";

type MarkerWithInfoWindowProps = {
    position: google.maps.LatLng | null | undefined;
    name: string | null | undefined;
};

const MarkerWithInfoWindow: FC<MarkerWithInfoWindowProps> = ({position, name}) => {
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
            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
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