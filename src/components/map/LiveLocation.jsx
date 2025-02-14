import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LiveLocation = ({ latitude, longitude }) => {
  const hasCoordinates = latitude !== undefined && longitude !== undefined;
  const defaultPosition = [20.5937, 78.9629]; // Center of India
  const [position, setPosition] = useState(defaultPosition);
  const [placeName, setPlaceName] = useState("");

  useEffect(() => {
    if (hasCoordinates) {
      setPosition([latitude, longitude]);

      // Reverse Geocoding API (Nominatim)
      const fetchPlaceName = async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          setPlaceName(data?.display_name || "Unknown Location");
        } catch (error) {
          console.error("Error fetching location:", error);
          setPlaceName("Unknown Location");
        }
      };

      fetchPlaceName();
    }
  }, [latitude, longitude, hasCoordinates]);

  // Custom Car Marker Icon
  const carIcon = L.divIcon({
    className: "",
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="30" height="30">
        <path d="M19 20H5V21C5 21.5523 4.55228 22 4 22H3C2.44772 22 2 21.5523 2 21V11L4.4805 5.21216C4.79566 4.47679 5.51874 4 6.31879 4H17.6812C18.4813 4 19.2043 4.47679 19.5195 5.21216L22 11V21C22 21.5523 21.5523 22 21 22H20C19.4477 22 19 21.5523 19 21V20ZM20 13H4V18H20V13ZM4.17594 11H19.8241L17.6812 6H6.31879L4.17594 11ZM6.5 17C5.67157 17 5 16.3284 5 15.5C5 14.6716 5.67157 14 6.5 14C7.32843 14 8 14.6716 8 15.5C8 16.3284 7.32843 17 6.5 17ZM17.5 17C16.6716 17 16 16.3284 16 15.5C16 14.6716 16.6716 14 17.5 14C18.3284 14 19 14.6716 19 15.5C19 16.3284 18.3284 17 17.5 17Z"></path>
      </svg>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  return (
    <MapContainer center={defaultPosition} zoom={5} style={{ height: "390px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {hasCoordinates && <MapBounds position={position} />}

      {hasCoordinates && (
        <Marker position={position} icon={carIcon}>
          <Popup autoOpen autoClose={false} closeOnClick={false} closeButton={false}>
            <b>{placeName}</b>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

// Component to adjust map bounds when a car's location is available
const MapBounds = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 13, { animate: true });
  }, [map, position]);
  return null;
};

export default LiveLocation;
