import React from 'react'
import {BusFront, RadioTower, Ban, Cog, TableColumnsSplit}  from 'lucide-react';    
import PieChart from '../map/PieChart'

function VehicleData() {
  return (
    <div className='w-full'>
        <div className='shadow-sm bg-white p-[22px] fixed w-full top-0 z-[9999999]'>
<p className='font-bold text-lg'> Explore the Live Vehicle Tracking System Map 🚗📍</p>
        </div>
            <div className='flex flex-row gap-4 pr-4 px-5 mt-24'>
            <div className="block w-full px-5 bg-white  rounded-md shadow-sm hover:bg-blue-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer">
                    <div className='flex justify-center items-center h-24'>
                        <div className="flex justify-between w-full items-center tracking-tight text-gray-900 dark:text-white">
                            <div className='block gap-4 items-center'>
                                <h6 className='text-sm font-semibold'>Active Vehicles</h6>
                                <h6 className='text-xl font-extrabold'>2021 +</h6>
                                <p className='text-xs font-medium text-gray-400'>Today Live</p>
                            </div>
                            <div className='flex justify-center text-xl font-bold items-center'>
                                <RadioTower  className='text-emerald-600'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block w-full px-5  bg-white  rounded-lg shadow-sm hover:bg-blue-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer">
                    <div className='flex justify-center items-center h-24'>
                        <div className="flex justify-between w-full items-center tracking-tight text-gray-900 dark:text-white">
                            <div className='block gap-4 items-center'>
                                <h6 className='text-sm font-semibold'>Stop Vehicles</h6>
                                <h6 className='text-xl font-extrabold'>2771 +</h6>
                                <p className='text-xs font-medium text-gray-400'>Today Live</p>
                            </div>
                            <div className='flex justify-center text-xl items-center'>
                          
                                <Ban className='text-red-500'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block w-full px-5  bg-white  rounded-lg shadow-sm hover:bg-blue-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer">
                    <div className='flex justify-center items-center h-24'>
                        <div className="flex justify-between w-full items-center tracking-tight text-gray-900 dark:text-white">
                            <div className='block gap-4 items-center'>
                                <h6 className='text-sm font-semibold'>Total Vehicles</h6>
                                <h6 className='text-xl font-extrabold'>2771 +</h6>
                                <p className='text-xs font-medium text-gray-400'>Today Live</p>
                            </div>
                            <div className='flex justify-center  items-center'>
                                <Cog className='text-emerald-600'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block w-full px-5  bg-white  rounded-lg shadow-sm hover:bg-blue-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer">
                    <div className='flex justify-center items-center h-24'>
                        <div className="flex justify-between w-full items-center tracking-tight text-gray-900 dark:text-white">
                            <div className='block gap-4 items-center'>
                                <h6 className='text-sm font-medium'>Breakdown Vehicles </h6>
                                <h6 className='text-xl font-extrabold'>2024 +</h6>
                                <p className='text-xs font-medium text-gray-400'>Today Live</p>
                            </div>
                            <div className='flex justify-center text-xl items-center'>
                    
                                <TableColumnsSplit className='text-red-500'/>
                            </div>
                        </div>
                    </div>
                </div>
                
              {/* <PieChart/>  */}
            </div>


        </div>
  )
}

export default VehicleData