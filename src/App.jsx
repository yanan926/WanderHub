import {
  AppBar,
  Button,
  Typography,
  Toolbar,
  Container,
  Box,
} from "@mui/material";
import ClusterMap from "./ClusterMap/ClusterMap";
import cities from "./data";
import { v4 as uuidv4 } from "uuid";

function App() {
  let citiesData = cities.map((data) => {
    return {
      properties: {
        id: uuidv4(),
        title: `${data.city}, ${data.state}`,
      },
      geometry: {
        type: "Point",
        coordinates: [data.longitude, data.latitude, 0],
      },
    };
  });

  const getRandomSubset = (array, size) => {
    const shuffledArray = array.slice(); // Create a shallow copy to avoid modifying the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray.slice(0, size);
  };

  getRandomSubset(citiesData, 300)

  return (
    <div className="container">
      <ClusterMap cities={citiesData} />
    </div>
  );
}

export default App;
