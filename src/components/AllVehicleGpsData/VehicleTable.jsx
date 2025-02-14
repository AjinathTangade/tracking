import React, { useEffect, useState } from "react";

const VehicleTable = () => {
  const [gpsData, setGpsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getApiUrl = () => "http://139.5.188.128:8000/api/gps-data/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        //console.log("Fetching GPS data...");
        const response = await fetch(getApiUrl(), {
          method: "GET",
          headers: {
            "Authorization": "Bearer b3c28d56-7ced-451a-a0d0-697d86235e46",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        //console.log("Received Data:", data);

        if (Array.isArray(data)) {
          setGpsData(data);
        } else {
          throw new Error("Invalid data format received.");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching GPS data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-6 pb-6 shadow-md w-full shadow-white bg-white h-full">
      <h2 className="text-lg font-bold text-center py-4 bg-gray-200 text-gray-800">
        🚗 Live Vehicle GPS Data 📍
      </h2>

      {loading ? (
        <div className="text-center text-blue-500 p-4">Fetching GPS data...</div>
      ) : error ? (
        <div className="text-red-500 text-center p-4">
          ❌ Error: {error} <br />
          Please check your API connection.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="p-4">
                  <div className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded-sm" />
                  </div>
                </th>
                <th className="px-4 py-3">Serial Number</th>
                <th className="px-4 py-3">Vehicle Reg No</th>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Latitude</th>
                <th className="px-4 py-3">Longitude</th>
                <th className="px-4 py-3">Speed (km/h)</th>
              </tr>
            </thead>
            <tbody>
              {gpsData.length > 0 ? (
                gpsData.map((vehicle, index) => (
                  <tr key={index} className="border-b bg-white hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <td className="p-4">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded-sm" />
                    </td>
                    <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">
                      {vehicle.serial_no || "N/A"}
                    </td>
                    <td className="px-4 py-4">{vehicle.vehicle_reg_no || "N/A"}</td>
                    <td className="px-4 py-4">{vehicle.timestamp || "N/A"}</td>
                    <td className="px-4 py-4">{vehicle.latitude || "N/A"}</td>
                    <td className="px-4 py-4">{vehicle.longitude || "N/A"}</td>
                    <td className="px-4 py-4">{vehicle.speed || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-3 text-gray-500">
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VehicleTable;
