import axios from 'axios';

export const fetchGpsData = async (serialNo, startTimestamp, endTimestamp) => {
    
    try {
        const apiURL = "http://139.5.188.128:8000/api/gps-data/";
        const params = {
            serial: serialNo,
            start_datetime: startTimestamp,
            end_datetime: endTimestamp,
        };

        const response = await axios.get(apiURL, {
            params: params,
            headers: {
                Authorization: "Bearer b3c28d56-7ced-451a-a0d0-697d86235e46",
                "Content-Type": "application/json"
            },
        });

        return response.data;

    } catch (error) {
        console.error("Error fetching data:", error.response ? error.response.data : error);
        alert("Failed to fetch GPS data. Check API parameters.");
        return null;
    }
};

export const fetchLiveGpsData = async (serialNo) => {
    try {
        // Get current date and time
        const now = new Date();
        const day = now.getDate(); // Day without leading zero
        const month = String(now.getMonth() + 1).padStart(2, "0"); // Month with leading zero
        const year = now.getFullYear(); // Full year (e.g., 2025)
        const hours = String(now.getHours()).padStart(2, "0"); // Hours (00-23)
        const minutes = String(now.getMinutes()).padStart(2, "0"); // Minutes (00-59)

        const timestamp = `${day}-${month}-${year} ${hours}:${minutes}`;

        // API request
        const response = await axios.get("http://139.5.188.128:8000/api/gps-data/", {
            params: { serial: serialNo, timestamp },
            headers: {
                Authorization: "Bearer b3c28d56-7ced-451a-a0d0-697d86235e46",
            },
            timeout: 10000, // Set timeout to 10 seconds
        });

        console.log(response.data);
        return response.data; // Return data for further processing

    } catch (error) {
        console.error("Error fetching GPS data:", error.response ? error.response.data : error.message);
        alert("Failed to fetch GPS data. Please try again later.");
        return null;
    }
};


