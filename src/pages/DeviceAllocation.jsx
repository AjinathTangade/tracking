import React from 'react';

function DeviceAllocation() {
    return (
        <div className='m-5 flex gap-5 w-full justify-center align-middle'>
            <div className='w-2/5'>
                <form>
                    <div class="">
                        <div className=''>
                            <label for="serial_number" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Serial Number</label>
                            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Serial Number:" required />
                        </div>
                        <button
                            type="submit"
                            className=" bg-blue-600 text-white py-2 h-12 rounded-md hover:bg-blue-700 w-full mt-1"
                        >
                            Get Vehicle Registration Number
                        </button>
                    </div>
                </form>
            </div>
            <div className='w-2/5'>
                <form>
                    <div>
                        <label for="vehicle_registration_number" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Vehicle Registration Number</label>
                        <input type="text" id="vehicle_registration_number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Vehicle Registration Number" required />
                    </div>
                    <button
                        type="submit"
                        className=" bg-blue-600 w-full text-white py-2 h-12 rounded-md hover:bg-blue-700  mt-1"
                    >
                        Get Serial Number
                    </button>
                </form>
            </div>


        </div>


    )
}

export default DeviceAllocation;