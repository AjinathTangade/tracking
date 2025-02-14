import React from 'react';
import MapMain from '../map/MapMain';
import VehicleData from './VehicleData';

function SliderBar() {
  return (
    <div className='flex flex-col  gap-4'>
      
      
      <div>
      <VehicleData/>
      </div>
      <div className='flex'>
      <MapMain/>
      </div>
      
      
      
        
        
    </div>
  )
}

export default SliderBar;