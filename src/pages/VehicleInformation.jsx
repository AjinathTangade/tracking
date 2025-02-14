import React from 'react'

function VehicleInformation() {
    return (
        <div className='w-3/4 ml-auto bg-slate-50'>
            <div className='shadow-sm bg-white p-[22px] fixed w-full top-0 z-[9999999]'>
<p className='font-bold text-lg'> Explore the Live Vehicle Tracking System Map 🚗📍</p>
        </div>
<div className='mt-24  w-full justify-center align-middle'>
            <div className='w-3/4 mx-auto'>
                <form>
                    <div class="">
                        <div className='flex gap-5'>
                        <div className='w-2/4'>
                            <label for="serial_number" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Serial Number</label>
                            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Serial Number:" required />
                        </div>
                        <div className='w-2/4'>
                            <label for="datetime-local" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Date and Time</label>
                            <input type="datetime-local" id="vdatetime-local" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Vehicle Registration Number" required />
                        </div>
                        </div>
                        
                        <button
                            type="submit"
                            className=" bg-blue-600 text-white py-2 h-12 mt-4 rounded-md hover:bg-blue-700 w-full"
                        >
                            Get Vehicle Information
                        </button>
                    </div>
                </form>
            </div>



        </div>
        </div>
        
    )
}

export default VehicleInformation;