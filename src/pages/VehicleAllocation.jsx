import React, { useState } from "react";
import DeviceAndVehicleDataTable from "../components/DeviceAndVehicleData/DeviceAndVehicleDataTable";

function VehicleAllocation() {
  const [formData, setFormData] = useState({
    id: null, // Store ID for PATCH requests
    serial_no: "",
    vehicle_reg_no: "",
    is_active: "true",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(0); // 🔥 Refresh trigger

  const API_URL = "http://139.5.188.128:8000/api/vehicle-serials/";

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission (Add/Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const url = formData.id ? `${API_URL}${formData.id}/` : API_URL;
    const method = formData.id ? "PATCH" : "POST";

    const requestBody = {
      vehicle_reg_no: formData.vehicle_reg_no,
      serial_no: formData.serial_no,
      is_active: formData.is_active === "true",
    };

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer b3c28d56-7ced-451a-a0d0-697d86235e46",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("API Request Failed");
      }

      setMessage(formData.id ? "✅ Vehicle successfully updated!" : "✅ Vehicle successfully allocated!");
      setFormData({ id: null, serial_no: "", vehicle_reg_no: "", is_active: "true" });

      setRefresh((prev) => prev + 1); // 🔥 Trigger table refresh
    } catch (err) {
      setMessage(`❌ Device allocated already to vehicle. Please use Edit to allocate a new vehicle!`);
    } finally {
      setLoading(false);
    }
  };

  // Handle Edit button click
  const handleEdit = (vehicle) => {
    setFormData({
      id: vehicle.id,
      serial_no: vehicle.serial_no,
      vehicle_reg_no: vehicle.vehicle_reg_no,
      is_active: vehicle.is_active.toString(),
    });
  };

  // Handle Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this vehicle?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer b3c28d56-7ced-451a-a0d0-697d86235e46",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the record");
      }

      setMessage("✅ Vehicle successfully deleted!");
      setRefresh((prev) => prev + 1); // 🔥 Trigger table refresh
    } catch (error) {
      setMessage("❌ Error deleting the vehicle. Please try again.");
    }
  };

  return (
    <div className="mt-5 w-3/4 ml-auto">
      <div className="bg-slate-50 h-full">
        <div className="shadow-sm bg-white p-5 fixed w-full top-0 z-50">
          <p className="font-bold text-lg">Explore the Live Vehicle Tracking System Map 🚗📍</p>
        </div>
        <div className="p-8 mt-14">
          <div className="shadow-xl rounded-md p-5 bg-white">
            <h2 className="font-bold text-xl mb-5">Vehicle Allocation To Device</h2>
            {message && <p className="text-center p-4 text-blue-600">{message}</p>}
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-5">
                <div className="flex gap-5">
                  <div className="w-2/4">
                    <label htmlFor="serial_no" className="block mb-2 text-sm font-semibold text-gray-600">
                      Serial Number
                    </label>
                    <input
                      type="text"
                      id="serial_no"
                      className="border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-3"
                      placeholder="Enter Serial Number"
                      required
                      value={formData.serial_no}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-2/4">
                    <label htmlFor="vehicle_reg_no" className="block mb-2 text-sm font-semibold text-gray-600">
                      Vehicle Registration Number
                    </label>
                    <input
                      type="text"
                      id="vehicle_reg_no"
                      className="border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-3"
                      placeholder="Enter Vehicle Number"
                      required
                      value={formData.vehicle_reg_no}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label htmlFor="is_active" className="block mb-2 text-sm font-semibold text-gray-600">
                    Vehicle Status
                  </label>
                  <select
                    id="is_active"
                    className="border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-3"
                    required
                    value={formData.is_active}
                    onChange={handleChange}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
                <button type="submit" className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 w-full">
                  {loading ? "Processing..." : formData.id ? "Update Vehicle" : "Allocate Vehicle"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <DeviceAndVehicleDataTable onEdit={handleEdit} onDelete={handleDelete} refresh={refresh} />
      </div>
    </div>
  );
}

export default VehicleAllocation;
