import "./App.css";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

const API_KEY = import.meta.env["GOOGLE_MAPS_API_KEY"] as string;

const App = () => {

  return (
    <>
      <APIProvider apiKey={API_KEY}>
        <Map
          style={{ width: "40vw", height: "40vh" }}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={3}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        />
      </APIProvider>
      </>
  );
}

export default App;
