import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SingleVehicle from "./pages/SingleVehicle";
import Layout from "./pages/Layout";
import ObdData from "./pages/ObdData";
import VehicleAllocation from "./pages/VehicleAllocation";
import VehicleInformation from "./pages/VehicleInformation";
import MapMain from "./components/map/MapMain";
import AllVehicle from "./components/map/AllVehicle";

function App() {
  return (
    <div className="w-full">
<Routes>
        <Route path="/" element={ <Layout/>}>
        <Route path="" element={<AllVehicle/>}/>
         <Route path="/Home" element={<Home/>}/>
         <Route path="/SingleVehicle" element={<SingleVehicle />} />
         <Route path="/MapMain" element={<MapMain />} />
         <Route path="/ObdData" element={<ObdData />} />
         <Route path="/VehicleInformation" element={<VehicleInformation />} />
         <Route path="/VehicleAllocation" element={<VehicleAllocation />} />
        </Route>
        
      </Routes>
    </div>
      
    
  );
}

export default App;
