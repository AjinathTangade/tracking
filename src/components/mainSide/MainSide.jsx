import React from "react";
import { NavLink } from "react-router-dom";
import { Car, Users, LocateFixed, AlignLeft,Bell, ServerCog, Truck, LayoutDashboard, MapPin } from "lucide-react";

const MainSide = () => {
  return (
    <div className="h-auto w-1/4 border-r-1 border-zinc-100 fixed">
      <div className="flex justify-between items-center gap-4 w-full">
        <div className="flex gap-5 justify-start items-center shadow-sm p-3 w-full">
          <div className=" ">
            <img src="./src/assets/truck.png" alt="" className="w-10" />
          </div>
          <div className="">
            <h6 className="font-bold text-gray-800 text-lg m-0">Vehicle Tracking</h6>
            <p className="text-gray-600 text-sm">Admin Panel</p>
          </div>

        </div>
        {/* <div className="">
      <AlignLeft  className="text-gray-600 h-10 w-10"/>
      </div> */}
      </div>
      <div className="pl-3">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 pt-10 pl-4">Main Menu</h2>
        <nav>
          <ul className="flex flex-col gap-1">
            <li className="">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center px-2 py-3 w-64 rounded-sm transition-all font-semibold ${isActive ? "bg-blue-50 text-blue-700" : "hover:bg-blue-100"
                  }`
                }
              >
                <LayoutDashboard
                  className="w-8 h-5 mr-2 transition-all group-hover:text-blue-500"
                />
                Dashboard
              </NavLink>

            </li>
            <li className="">
              <NavLink
                to="/Home"
                className={({ isActive }) =>
                  `flex items-center px-2 py-3 w-64 rounded-sm transition-all font-semibold ${isActive ? "bg-blue-50 text-blue-700" : "hover:bg-blue-100"
                  }`
                }
              >
                <MapPin className="w-6 h-5 mr-2" /> Vehicles Tracking Map
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/SingleVehicle"
                className={({ isActive }) =>
                  `flex items-center px-2 py-3 w-64 rounded-sm transition-all font-semibold ${isActive ? "bg-blue-50 text-blue-700" : "hover:bg-blue-100"
                  }`
                }
              >

                <LocateFixed className="w-6 h-5 mr-2" /> Single Vehicle Location
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/VehicleAllocation"
                className={({ isActive }) =>
                  `flex items-center px-2 py-3 w-64 rounded-sm transition-all font-semibold ${isActive ? "bg-blue-50 text-blue-700" : "hover:bg-blue-100"
                  }`
                }
              >

                <ServerCog className="w-6 h-5 mr-2" /> Vehicle Allocation To Device
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/ObdData"
                className={({ isActive }) =>
                  `flex items-center px-2 py-3 w-64 rounded-sm transition-all font-semibold ${isActive ? "bg-blue-50 text-blue-700" : "hover:bg-blue-100"
                  }`
                }
              >

                <Truck className="w-6 h-5 mr-2" /> Shipment Data
              </NavLink>
            </li>


            <li>
              <NavLink
                to="/VehicleInformation"
                className={({ isActive }) =>
                  `flex items-center px-2 py-3 w-64 rounded-sm transition-all font-semibold ${isActive ? "bg-blue-50 text-blue-700" : "hover:bg-blue-100"
                  }`
                }
              >
            
                <Bell className="w-6 h-5 mr-2" /> Notification

              </NavLink>
            </li>

            {/* <NavLink
              to="/DeviceAllocation"
              className={({ isActive }) =>
                `flex items-center px-2 py-3 w-64 rounded-sm transition-all font-semibold ${
      isActive ? "bg-blue-50 text-blue-700" : "hover:bg-blue-100"
    }`
              }
            >
              <Users className="w-10 h-5 mr-2" /> DeviceAllocation
            </NavLink> */}

          </ul>
        </nav>
      </div>

    </div>
  );
};

export default MainSide;
