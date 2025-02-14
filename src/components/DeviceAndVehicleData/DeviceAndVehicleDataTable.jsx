import React, { useEffect, useState } from "react";

function DeviceAndVehicleDataTable({ onEdit, onDelete, refresh }) {
  const [vehicleSerials, setVehicleSerials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVehicleSerials = async () => {
    try {
      const response = await fetch("http://139.5.188.128:8000/api/vehicle-serials", {
        headers: {
          Authorization: "Bearer b3c28d56-7ced-451a-a0d0-697d86235e46",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      setVehicleSerials(data.results || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching vehicle data:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicleSerials();
    const interval = setInterval(fetchVehicleSerials, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, [refresh]);

  return (
    <div className="px-6 pb-6 shadow-md w-full shadow-white bg-slate-50">
      <h2 className="text-lg font-bold text-center py-4 bg-gray-200 text-gray-800">
        Vehicle Serial and Devices Data
      </h2>

      {loading ? (
        <div className="text-center text-blue-500 p-4">Fetching vehicle serial data...</div>
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
                <th className="px-3 py-4">Serial Number</th>
                <th className="px-3 py-4">Vehicle Reg No</th>
                <th className="px-3 py-4">Previous Vehicle Reg No</th>
                <th className="px-3 py-4">Associated On</th>
                <th className="px-3 py-4">Last Updated</th>
                <th className="px-3 py-4">Status</th>
                <th className="px-3 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicleSerials.length > 0 ? (
                vehicleSerials.map((vehicle, index) => (
                  <tr key={index} className="border-b bg-white hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">
                      {vehicle.serial_no || "N/A"}
                    </td>
                    <td className="px-4 py-4 font-base text-sm">{vehicle.vehicle_reg_no || "N/A"}</td>
                    <td className="px-4 py-4 font-base text-sm">{vehicle.previous_vehicle_reg_no || "N/A"}</td>
                    <td className="px-4 py-4 font-base text-sm">{vehicle.associated_on || "N/A"}</td>
                    <td className="px-4 py-4 font-base text-sm">{vehicle.updated_on || "N/A"}</td>
                    <td className="px-4 py-4 font-base text-sm">
                      {vehicle.is_active ? (
                        <span className="text-green-500 font-semibold">Active</span>
                      ) : (
                        <span className="text-red-500 font-semibold">Inactive</span>
                      )}
                    </td>
                    <td className="px-4 py-4 flex flex-col gap-2">
                      <button
                        onClick={() => onEdit(vehicle)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => onDelete(vehicle.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
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
}

export default DeviceAndVehicleDataTable;
