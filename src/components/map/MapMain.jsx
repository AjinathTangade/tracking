import { useState } from "react";
import VehicleTrackingMap from "./VehicleTrackingMap";
import { fetchGpsData } from "../../services/map.service";
import VehicleTable from "../AllVehicleGpsData/VehicleTable";

function MapMain() {
  const [formData, setFormData] = useState({
    serialNo: "",
    startTime: "",
    endTime: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [gpsData, setGpsData] = useState([]);

  // Function to convert YYYY-MM-DDTHH:MM to DD-MM-YYYY HH:MM
  const formatDateTime = (isoString) => {
    if (!isoString) return "";
    try {
      const [date, time] = isoString.split("T");
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year} ${time}`;
    } catch (error) {
      return "";
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert datetime to required format
    const formattedStartTime = formatDateTime(formData.startTime);
    const formattedEndTime = formatDateTime(formData.endTime);

    // Validate datetime format
    const datetimeRegex = /^\d{2}-\d{2}-\d{4} \d{2}:\d{2}$/;
    if (!datetimeRegex.test(formattedStartTime) || !datetimeRegex.test(formattedEndTime)) {
      setError("Invalid datetime format. Use 'DD-MM-YYYY HH:MM'.");
      return;
    }

    setError(""); // Clear any previous error
    setLoading(true); // Start loading

    try {
      const response = await fetchGpsData(formData.serialNo, formattedStartTime, formattedEndTime);
      setGpsData(response);
      console.log(response)
    } catch (err) {
      console.error("Error fetching GPS data:", err);
      setError("Failed to fetch GPS data. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="w-full flex flex-col px-5 mx-auto ">
      <div className="shadow-md w-full shadow-white bg-white p-5 h-full">
      <div className="w-full h-[400px]">
        <VehicleTrackingMap fetchData={gpsData} />
      </div>

      <form
        id="pathForm"
        className="mx-auto p-4  mt-4 rounded-lg w-full "
        onSubmit={handleSubmit}
      >
        <div className="flex gap-5">
          <div className="">
            <label htmlFor="serialNo" className="block text-md font-bold text-gray-800">
              Serial Number:
            </label>
            <input
              type="text"
              id="serialNo"
              value={formData.serialNo}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300 w-48"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="mb-4">
              <label htmlFor="startTime" className="block text-md font-bold text-gray-800">
                Start Time:
              </label>
              <input
                type="datetime-local"
                id="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                className="mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300 w-full md:w-48"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="endTime" className="block text-md font-bold text-gray-800">
                End Time:
              </label>
              <input
                type="datetime-local"
                id="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
                className="mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300 w-full md:w-48"
              />
            </div>

            <div className="mb-4 mt-6 w-full md:w-auto">
              <button
                type="submit"
                className={`bg-blue-600 text-white py-2 h-12 rounded-md hover:bg-blue-700 w-full md:w-48 px-4 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Loading..." : "Get Route"}
              </button>
            </div>
          </div>

          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
      </form>
      </div>
      <VehicleTable/>
    </div>
  );
}

export default MapMain;
