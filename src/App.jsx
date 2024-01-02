import HomePage from "./Pages/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowPage from "./Pages/ShowPage/ShowPage";
import { useState } from 'react'
import cities from "./data";
import { v4 as uuidv4 } from "uuid";
import imageList from "./image";


function App() {
  let citiesData = cities.map((data, index) => {
    const cityId = uuidv4();
    return {
      properties: {
        id: '' + index,
        title: `${data.city}, ${data.state}`,
        image: `${imageList[Math.floor(Math.random() * imageList.length)]}.`,
      },
      geometry: {
        type: "Point",
        coordinates: [data.longitude, data.latitude, 0],
      },
    };
  });

  let vermont = citiesData.find((city)=> city.properties.title === 'Burlington, Vermont')
  console.log(vermont)

  const getRandomSubset = (array, size) => {
    const shuffledArray = array.slice(); // Create a shallow copy to avoid modifying the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray.slice(0, size);
  };

  getRandomSubset(citiesData, 300);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage citiesData={citiesData}/>} />
        <Route path="/city/:cityId" element={<ShowPage citiesData={citiesData}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
