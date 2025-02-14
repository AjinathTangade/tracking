import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const AllVehicleMap = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Custom Car Marker Icon
  const carIcon = L.divIcon({
    className: "",
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0282fae0" width="30" height="30">
        <path d="M19 20H5V21C5 21.5523 4.55228 22 4 22H3C2.44772 22 2 21.5523 2 21V11L4.4805 5.21216C4.79566 4.47679 5.51874 4 6.31879 4H17.6812C18.4813 4 19.2043 4.47679 19.5195 5.21216L22 11V21C22 21.5523 21.5523 22 21 22H20C19.4477 22 19 21.5523 19 21V20ZM20 13H4V18H20V13ZM4.17594 11H19.8241L17.6812 6H6.31879L4.17594 11ZM6.5 17C5.67157 17 5 16.3284 5 15.5C5 14.6716 5.67157 14 6.5 14C7.32843 14 8 14.6716 8 15.5C8 16.3284 7.32843 17 6.5 17ZM17.5 17C16.6716 17 16 16.3284 16 15.5C16 14.6716 16.6716 14 17.5 14C18.3284 14 19 14.6716 19 15.5C19 16.3284 18.3284 17 17.5 17Z"></path>
      </svg>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  const fetchVehicles = async () => {
    try {
      const response = await fetch("http://139.5.188.128:8000/api/gps-data/", {
        headers: {
          Authorization: "Bearer b3c28d56-7ced-451a-a0d0-697d86235e46",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Get live location names for each vehicle
      const updatedVehicles = await Promise.all(
        data.map(async (vehicle) => {
          const locationName = await reverseGeocode(vehicle.latitude, vehicle.longitude);
          return { ...vehicle, locationName };
        })
      );

      setVehicles(updatedVehicles);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching vehicle data:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const reverseGeocode = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
  
      // Extracting full formatted address
      return data.display_name || "Unknown Location";
    } catch (error) {
      console.error("Error fetching location name:", error);
      return "Unknown Location";
    }
  };
  

  useEffect(() => {
    fetchVehicles();
    const interval = setInterval(fetchVehicles, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: "100vh", width: "75%", marginLeft: "auto" }}>
      <div className='shadow-sm bg-white p-[22px] fixed w-full top-0 z-[9999999]'>
<p className='font-bold text-lg'> Explore the Live Vehicle Tracking System Map 🚗📍</p>
        </div>
      {loading && <span class="relative flex justify-center items-center h-24 w-24">
  <span class="animate-ping absolute top-80 left-80 inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
  
</span>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <MapContainer center={[19.076, 72.8777]} zoom={7} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <Marker key={vehicle.id} position={[vehicle.latitude, vehicle.longitude]} icon={carIcon}>
                <Popup>
                  <b>🚗 Vehicle:</b> {vehicle.vehicle_reg_no || "N/A"} <br />
                  <b>📍 Location:</b> {vehicle.locationName} <br />
                  {/* <b>🔢 Serial No:</b> {vehicle.serial_no || "N/A"} <br />
                  <b>📍 Latitude:</b> {vehicle.latitude} <br />
                  <b>📍 Longitude:</b> {vehicle.longitude} <br />
                  <b>💨 Speed:</b> {vehicle.speed} km/h <br />
                  <b>🕒 Time:</b> {vehicle.timestamp} */}
                </Popup>
              </Marker>
            ))
          ) : (
            <p className="text-center">No vehicle data available.</p>
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default AllVehicleMap;
