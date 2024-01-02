import ShowPageMapView from "../../Components/MapView/ShowPageMapView";
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

function ShowPage({ citiesData }) {
  const { cityId } = useParams();
  console.log(cityId)

  const cityData = citiesData.find((city) => city.properties.id=== cityId);

  if (!cityData) {
    return <div>City not found!</div>;
  }
  return <ShowPageMapView city={cityData} />;
}


export default ShowPage;
