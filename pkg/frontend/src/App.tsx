import React, { FC } from "react";
import "./App.css";
import { Map, Marker, useApiIsLoaded } from "@vis.gl/react-google-maps";

const App: FC = () => {
  const isLoaded = useApiIsLoaded();
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Map
        style={{ width: "80vw", height: "80vh" }}
        defaultCenter={{ lat: 30.267153, lng: -97.743057 }}
        defaultZoom={10}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        <Marker position={{ lat: 30.267153, lng: -97.743057 }} />
      </Map>
    </>
  );
};

export default App;
