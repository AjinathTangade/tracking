import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

const VehicleTrackingMap = ({ fetchData }) => {
  const [locationNames, setLocationNames] = useState({});

  // Function to fetch location name using reverse geocoding
  const getLocationName = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      return data.display_name || "Unknown Location";
    } catch (error) {
      console.error("Error fetching location name:", error);
      return "Unknown Location";
    }
  };

  useEffect(() => {
    // Default map view (India) when fetchData is empty
    const defaultLocation = { latitude: 20.5937, longitude: 78.9629 };

    // Use provided data or an empty array
    const waypoints =
      fetchData && fetchData.length >= 2
        ? fetchData
            .map((point) =>
              L.latLng(parseFloat(point.latitude), parseFloat(point.longitude))
            )
            .filter((point) => !isNaN(point.lat) && !isNaN(point.lng))
        : [];

    // Initialize map centered on India
    const map = L.map("map").setView(
      [defaultLocation.latitude, defaultLocation.longitude],
      5
    );

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // If we have at least two waypoints, add routing
    if (waypoints.length >= 2) {
      L.Routing.control({
        waypoints,
        routeWhileDragging: true,
        createMarker: () => null,
        lineOptions: {
          styles: [{ color: "red", weight: 3 }], // Blue color, weight 6
        },
      }).addTo(map);

      // Custom start and end icons using SVG
      const startIcon = L.divIcon({
        className: "custom-start-icon",
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" width="30px" height="30px"><path d="M3 3H12.382C12.7607 3 13.107 3.214 13.2764 3.55279L14 5H20C20.5523 5 21 5.44772 21 6V17C21 17.5523 20.5523 18 20 18H13.618C13.2393 18 12.893 17.786 12.7236 17.4472L12 16H5V22H3V3Z"></path></svg>`,
        iconSize: [30, 30],
        iconAnchor: [12, 24],
      });

      const endIcon = L.divIcon({
        className: "custom-end-icon",
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="30px" height="30px"><path d="M3 3H12.382C12.7607 3 13.107 3.214 13.2764 3.55279L14 5H20C20.5523 5 21 5.44772 21 6V17C21 17.5523 20.5523 18 20 18H13.618C13.2393 18 12.893 17.786 12.7236 17.4472L12 16H5V22H3V3Z"></path></svg>`,
        iconSize: [30, 30],
        iconAnchor: [12, 24],
      });

      // Fetch Start and End location names
      getLocationName(waypoints[0].lat, waypoints[0].lng).then((name) => {
        setLocationNames((prev) => ({ ...prev, start: name }));
        L.marker(waypoints[0], { icon: startIcon })
          .addTo(map)
          .bindPopup(`Start: ${name}`)
          .openPopup();
      });

      getLocationName(
        waypoints[waypoints.length - 1].lat,
        waypoints[waypoints.length - 1].lng
      ).then((name) => {
        setLocationNames((prev) => ({ ...prev, end: name }));
        L.marker(waypoints[waypoints.length - 1], { icon: endIcon })
          .addTo(map)
          .bindPopup(`End: ${name}`);
      });

      // Checkpoint markers at every 4th point
      waypoints.forEach(async (point, index) => {
        if (index % 8 === 0 && index !== 0 && index !== waypoints.length - 1) {
          const locationName = await getLocationName(point.lat, point.lng);
          setLocationNames((prev) => ({
            ...prev,
            [`${point.lat},${point.lng}`]: locationName,
          }));

          const checkpointIcon = L.divIcon({
            className: "checkpoint-icon",
            html: '<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="blue"><path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"></path></svg>',
            iconSize: [16, 16],
            iconAnchor: [6, 6],
          });

          L.marker(point, { icon: checkpointIcon })
            .addTo(map)
            .bindPopup(`Checkpoint: ${locationName}`);
        }
      });

      // Fit map to route
      map.fitBounds(L.latLngBounds(waypoints));
    }

    return () => {
      map.remove();
    };
  }, [fetchData]);

  return <div id="map" style={{ height: "100%", width: "100%" }} className=""></div>;
};

export default VehicleTrackingMap;
