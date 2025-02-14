import React, { useState } from "react";

function ObdData() {
  const [formData, setFormData] = useState({
    serial: "",
    start_datetime: "",
    end_datetime: "",
  });

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to convert "YYYY-MM-DDTHH:MM" to "DD-MM-YYYY HH:MM"
  const formatDateTime = (isoString) => {
    if (!isoString) return "";
    try {
      const dateObj = new Date(isoString);

      if (isNaN(dateObj.getTime())) return "";

      const day = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const year = dateObj.getFullYear();
      const hours = String(dateObj.getHours()).padStart(2, "0");
      const minutes = String(dateObj.getMinutes()).padStart(2, "0");

      return `${day}-${month}-${year} ${hours}:${minutes}`;
    } catch (error) {
      console.error("Date formatting error:", error);
      return "";
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setData(null);

    // Format datetime values
    const formattedStart = formatDateTime(formData.start_datetime);
    const formattedEnd = formatDateTime(formData.end_datetime);

    // Validate datetime format
    const datetimeRegex = /^\d{2}-\d{2}-\d{4} \d{2}:\d{2}$/;
    if (!datetimeRegex.test(formattedStart) || !datetimeRegex.test(formattedEnd)) {
      setError("Invalid datetime format. Use 'DD-MM-YYYY HH:MM'.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://139.5.188.128:8000/obd/obd-data?serial=${formData.serial}&start_datetime=${formattedStart}&end_datetime=${formattedEnd}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer b3c28d56-7ced-451a-a0d0-697d86235e46",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 w-3/4 ml-auto">
      <div className="bg-slate-50 h-full">
        <div className="shadow-sm bg-white p-[22px] fixed w-full top-0 z-[9999999]">
          <p className="font-bold text-lg">Explore the Live Vehicle Tracking System Map 🚗📍</p>
        </div>

        <div className="p-8 mt-14">
          <div className="shadow-xl rounded-md shadow-slate-200 p-5">
            <h2 className="font-bold text-xl mb-5">Vehicle Shipment Data</h2>

            {error && <p className="text-center p-4 text-red-600">{error}</p>}

            <form className="w-full" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-5">
                <div className="flex gap-5 w-full">
                  <div className="w-2/4">
                    <label htmlFor="serial" className="block mb-2 text-sm font-semibold text-gray-600">
                      Serial Number
                    </label>
                    <input
                      type="text"
                      id="serial"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-3"
                      placeholder="Enter Serial Number"
                      required
                      value={formData.serial}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-2/4">
                    <label htmlFor="start_datetime" className="block mb-2 text-sm font-semibold text-gray-600">
                      Start Datetime
                    </label>
                    <input
                      type="datetime-local"
                      id="start_datetime"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-3"
                      required
                      value={formData.start_datetime}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-2/4">
                    <label htmlFor="end_datetime" className="block mb-2 text-sm font-semibold text-gray-600">
                      End Datetime
                    </label>
                    <input
                      type="datetime-local"
                      id="end_datetime"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-3"
                      required
                      value={formData.end_datetime}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 h-12 rounded-md hover:bg-blue-700 w-full mt-1"
                  disabled={loading}
                >
                  {loading ? "Fetching Data..." : "Get Vehicle Shipment Data"}
                </button>
              </div>
            </form>

            {data && (
              <div className="mt-6">
                <h3 className="text-lg font-bold">Fetched OBD Data</h3>
                <table className="w-full border-collapse border border-gray-300 mt-2">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 p-2">Trip Count</th>
                      <th className="border border-gray-300 p-2">Total Run Time (s)</th>
                      <th className="border border-gray-300 p-2">Fuel Tank</th>
                      <th className="border border-gray-300 p-2">Vehicle Speed</th>
                      <th className="border border-gray-300 p-2">RPM</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td className="border border-gray-300 p-2">{data.trip_count}</td>
                      <td className="border border-gray-300 p-2">{data.total_run_time_seconds}</td>
                      <td className="border border-gray-300 p-2">{data.fuel_tank}</td>
                      <td className="border border-gray-300 p-2">{data.obd_vehicle_speed}</td>
                      <td className="border border-gray-300 p-2">{data.obd_rpm}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ObdData;
