import React, { FC } from "react";
import "./App.css";
import { Map, useApiIsLoaded } from "@vis.gl/react-google-maps";

const App: FC = () => {
  const isLoaded = useApiIsLoaded();
  if (!isLoaded) return <div>Loading...</div>;
  
  return (
    <>
      <Map
        style={{ width: "80vw", height: "80vh" }}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        defaultZoom={3}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      />
    </>
  );
};

export default App;
