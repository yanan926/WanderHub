import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./CludsterMap.scss";
import "mapbox-gl/dist/mapbox-gl.css";

const ClusterMap = ({ cities }) => {
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoieWFuYW45MjYiLCJhIjoiY2xxY3gzMmduMDM0bDJpcjM2YnJybXo1OCJ9.hi5nCI8doVHjhL15uxgSug";

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v10",
      center: [-103.5917, 40.6699],
      zoom: 3,
    });

    map.on("load", () => {
      map.addSource("earthquakes", {
        type: "geojson",
        data: { features: cities },
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "earthquakes",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#51bbd6",
            100,
            "#f1f075",
            750,
            "#f28cb1",
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            20,
            100,
            30,
            750,
            40,
          ],
        },
      });

      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "earthquakes",
        filter: ["has", "point_count"],
        layout: {
          "text-field": ["get", "point_count_abbreviated"],
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      });

      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "earthquakes",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#11b4da",
          "circle-radius": 4,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
      });

      map.on("click", "clusters", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
        const clusterId = features[0].properties.cluster_id;
        map
          .getSource("earthquakes")
          .getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;

            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom,
            });
          });
      });

      map.on("click", "unclustered-point", (e) => {
        console.log(e.features[0])
        const coordinates = e.features[0].geometry.coordinates.slice();
        const cityTitle = e.features[0].properties.title;
        const cityId = e.features[0].properties.id;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`<strong><a href="/city/${cityId}">${cityTitle}</a></strong>`)
          .addTo(map);
      });

      map.on("mouseenter", "clusters", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "clusters", () => {
        map.getCanvas().style.cursor = "";
      });
    });

    // Clean up on component unmount
    return () => {
      map.remove();
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "500px",
      }}
    />
  );
};

export default ClusterMap;
