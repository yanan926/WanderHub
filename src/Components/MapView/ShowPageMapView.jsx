import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = "pk.eyJ1IjoieWFuYW45MjYiLCJhIjoiY2xxY3gzMmduMDM0bDJpcjM2YnJybXo1OCJ9.hi5nCI8doVHjhL15uxgSug"

const ShowPageMapView= ({ city }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Initialize the map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v10', // Choose a map style
      center: city.geometry.coordinates, // Set the initial center of the map (longitude, latitude)
      zoom: 10, // Set the initial zoom level
    });

    // Add navigation control
    map.addControl(new mapboxgl.NavigationControl());

    // Add marker with popup
    new mapboxgl.Marker()
      .setLngLat(city.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3>${city.properties.title}</h3>`
        )
      )
      .addTo(map);

    // Clean up resources when the component is unmounted
    return () => map.remove();
  }, [city]); // Re-run effect when city changes

  return <div ref={mapContainerRef} style={{ width: '100%', minHeight: '200px', height:'40%' }} />;
};

export default ShowPageMapView;