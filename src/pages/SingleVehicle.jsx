import React, { useState } from 'react';
import LiveLocation from '../components/map/LiveLocation';
import { fetchLiveGpsData } from '../services/map.service';

function SingleVehicle() {
    const [serialNo, setSerialNo] = useState('');
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await fetchLiveGpsData(serialNo);
        setLatitude(res.latitude);
        setLongitude(res.longitude);
    };

    return (
        <div className="w-3/4 ml-auto bg-slate-50">
            <div className='shadow-sm bg-white p-[22px] fixed w-full top-0 z-[9999999]'>
                <p className='font-bold text-lg'> Explore the Live Vehicle Tracking System Map 🚗📍</p>
            </div>
            <div>
                <div className='shadow-md rounded-sm p-3 mt-24'>
                    {
                        latitude && longitude ? (
                            <LiveLocation latitude={latitude} longitude={longitude} />
                        ) : (
                            <LiveLocation />
                        )
                    }

                    <form
                        id="pathForm"
                        className="mx-auto pt-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col">
                            <div className="flex gap-6 w-full">
                                <div className="mb-4 w-3/4">
                                    
                                    <input
                                        type="text"
                                        id="serialNo"
                                        value={serialNo}
                                        onChange={(e) => setSerialNo(e.target.value)}
                                        required
                                        className=" p-3 w-full border h-12 rounded-md"
                                        aria-label="Enter vehicle serial number"
                                        placeholder='Enter vehicle serial number'
                                    />
                                </div>
                                <div className="w-3/12">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white py-3 px-2 h-12 rounded-md hover:bg-blue-700 transition"
                                    >
                                        Get Live Vehicle Location
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div>

                </div>
            </div>


        </div>
    );
}

export default SingleVehicle;
